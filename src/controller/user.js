const bcrypt = require("bcrypt");
const userModel = require("../models/user");
const wrapper = require("../utils/wrapper");
const cloudinary = require("../config/cloudinary");

module.exports = {
  showAllUser: async (request, response) => {
    try {
      const result = await userModel.showAllUser();
      return wrapper.response(
        response,
        result.status,
        "Success get Data !",
        result.data
      );
    } catch (error) {
      const { status, statusText, error: errorData } = error;
      return wrapper.response(response, status, statusText, errorData);
    }
  },
  getUserById: async (request, response) => {
    try {
      // console.log(request.params)
      const { id } = request.params;

      const result = await userModel.getUserById(id);

      if (result.data.length < 1) {
        return wrapper.response(
          response,
          404,
          `Data By Id ${id} Not Found`,
          []
        );
      }
      return wrapper.response(
        response,
        result.status,
        "Success Get User By Id",
        result.data
      );
    } catch (error) {
      const {
        status = 500,
        statusText = "Internal Server Error",
        error: errorData = null,
      } = error;
      return wrapper.response(response, status, statusText, errorData);
    }
  },
  createUser: async (request, response) => {
    try {
      const {
        name,
        username,
        gender,
        profession,
        nationality,
        dateOfBirth,
        email,
        password,
      } = request.body;
      const setData = {
        name,
        username,
        gender,
        profession,
        nationality,
        dateOfBirth,
        email,
        password,
      };

      const result = await userModel.createUser(setData);

      return wrapper.response(
        response,
        result.status,
        "Success Create Data",
        result.data
      );
    } catch (error) {
      const {
        status = 500,
        statusText = "Internal Server Error",
        error: errorData = null,
      } = error;
      return wrapper.response(response, status, statusText, errorData);
    }
  },
  updateUser: async (request, response) => {
    try {
      const { id } = request.params;
      const { name, username, gender, profession, nationality, dateOfBirth } =
        request.body;

      const checkId = await userModel.getUserById(id);

      if (checkId.data.length < 1) {
        return wrapper.response(
          response,
          404,
          `Data By Id ${id} Not Found`,
          []
        );
      }

      const setData = {
        name,
        username,
        gender,
        profession,
        nationality,
        dateOfBirth,
        updatedAt: new Date(Date.now()),
      };

      // eslint-disable-next-line no-restricted-syntax
      for (const data in setData) {
        if (!setData[data]) {
          delete setData[data];
        }
      }

      const result = await userModel.updateUser(id, setData);

      return wrapper.response(
        response,
        result.status,
        "Success Update Data",
        result.data
      );
    } catch (error) {
      const {
        status = 500,
        statusText = "Internal Server Error",
        error: errorData = null,
      } = error;
      return wrapper.response(response, status, statusText, errorData);
    }
  },
  updateImage: async (request, response) => {
    try {
      const { id } = request.params;

      const checkId = await userModel.getUserById(id);

      if (checkId.data.length < 1) {
        return wrapper.response(
          response,
          404,
          `Data By Id ${id} Not Found`,
          []
        );
      }

      if (id !== request.decodeToken.userId) {
        return wrapper.response(
          response,
          401,
          "Unable to update user image with different id",
          null
        );
      }
      const currentImage = await userModel.getImage(id);
      if (request.file && currentImage) {
        cloudinary.uploader.destroy(currentImage.data[0].image);
      }

      const { filename: image, path: imagePath } = request.file;
      const setData = { image, imagePath, updatedAt: new Date(Date.now()) };

      const result = await userModel.updateUser(id, setData);

      return wrapper.response(
        response,
        result.status,
        "Profile picture is successfully updated",
        result.data
      );
    } catch (error) {
      const {
        status = 500,
        statusText = "Internal Server Error",
        error: errorData = null,
      } = error;
      return wrapper.response(response, status, statusText, errorData);
    }
  },
  updatePassword: async (request, response) => {
    try {
      const { id } = request.params;

      const checkId = await userModel.getUserById(id);

      if (checkId.data.length < 1) {
        return wrapper.response(
          response,
          404,
          `Data By Id ${id} Not Found`,
          []
        );
      }

      const { newPassword, confirmPassword } = request.body;

      const validatePassword = (checkPassword) =>
        String(checkPassword).match(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-/<>]).{8,}$/
        );

      if (!validatePassword(newPassword)) {
        return wrapper.response(
          response,
          400,
          "Password should be at least 8 characters and contain at least 1 capital letter, 1 number, and 1 special character",
          null
        );
      }

      if (newPassword !== confirmPassword) {
        return wrapper.response(
          response,
          400,
          "Confirm password doesn't match",
          null
        );
      }

      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const encryptPassword = await bcrypt.hash(newPassword, salt);
      const setData = {
        password: encryptPassword,
        updatedAt: new Date(Date.now()),
      };

      const result = await userModel.updateUser(id, setData);

      return wrapper.response(
        response,
        result.status,
        "Success Update Password",
        result.data
      );
    } catch (error) {
      const {
        status = 500,
        statusText = "Internal Server Error",
        error: errorData = null,
      } = error;
      return wrapper.response(response, status, statusText, errorData);
    }
  },
  deleteUser: async (request, response) => {
    try {
      // console.log(request.params)
      const { id } = request.params;

      const result = await userModel.deleteUser(id);

      if (result.data.length < 1) {
        return wrapper.response(
          response,
          404,
          `Data By Id ${id} Not Found`,
          []
        );
      }
      return wrapper.response(
        response,
        result.status,
        "Success Delete Data",
        result.data
      );
    } catch (error) {
      const {
        status = 500,
        statusText = "Internal Server Error",
        error: errorData = null,
      } = error;
      return wrapper.response(response, status, statusText, errorData);
    }
  },
};
