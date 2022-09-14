const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const authModel = require("../models/auth");
const wrapper = require("../utils/wrapper");
const redis = require("../config/redis");
const userModel = require("../models/user");

module.exports = {
  showGreetings: async (request, response) => {
    try {
      return wrapper.response(
        response,
        200,
        "Success Get Greetings",
        "Hello World !"
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
  register: async (request, response) => {
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

      const validateEmail = (checkEmail) =>
        String(checkEmail)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );

      if (!validateEmail(email)) {
        return wrapper.response(response, 400, "Email is invalid", null);
      }

      const validatePassword = (checkPassword) =>
        String(checkPassword).match(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-/<>]).{8,}$/
        );

      if (!validatePassword(password)) {
        return wrapper.response(
          response,
          400,
          "Password should be at least 8 characters and contain at least 1 capital letter, 1 number, and 1 special character",
          null
        );
      }

      const checkUser = await authModel.getUserByEmail(email);
      console.log(checkUser.data[0].password);

      if (!checkUser.length === 0) {
        return wrapper.response(
          response,
          404,
          "Email has been registered",
          null
        );
      }

      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hash = await bcrypt.hash(password, salt);

      const setData = {
        name,
        username,
        gender,
        profession,
        nationality,
        dateOfBirth,
        email,
        password: hash,
      };

      const result = await authModel.register(setData);
      delete result.data[0].password;

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
  login: async (request, response) => {
    try {
      const { email, password } = request.body;

      const checkUser = await authModel.getUserByEmail(email);

      if (checkUser.data[0].length < 1) {
        return wrapper.response(response, 404, "Email not registered", null);
      }

      const hash = checkUser.data[0].password;
      const isMatched = await bcrypt.compare(password, hash);
      if (!isMatched) {
        return wrapper.response(response, 400, "Wrong password", null);
      }

      const payload = checkUser.data[0];
      delete payload.password;
      // console.log(payload);

      const token = jwt.sign({ ...payload }, "RAHASIA", { expiresIn: "1h" });

      return wrapper.response(response, 200, {
        userId: payload.userId,
        token,
      });
    } catch (error) {
      const {
        status = 500,
        statusText = "Internal Server Error",
        error: errorData = null,
      } = error;
      return wrapper.response(response, status, statusText, errorData);
    }
  },
  logout: async (request, response) => {
    try {
      let token = request.headers.authorization;
      // eslint-disable-next-line prefer-destructuring
      token = token.split(" ")[1];

      redis.setEx(`accessToken:${token}`, 3600 * 24, token);
      return wrapper.response(response, 200, "Success logout", null);
    } catch (error) {
      return wrapper.response(response, 400, "Bad response", null);
    }
  },
};
