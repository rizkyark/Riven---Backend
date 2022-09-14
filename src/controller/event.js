const eventModel = require("../models/event");
const wrapper = require("../utils/wrapper");
const redis = require("../config/redis");
const cloudinary = require("../config/cloudinary");

module.exports = {
  showAllEvent: async (request, response) => {
    try {
      let { page, limit, searchName, sort } = request.query;
      page = +page || "1";
      limit = +limit || 5;
      searchName = `%${searchName || ""}%`;
      sort = sort || "dateTimeShow";

      const totalData = await eventModel.getCountEvent();
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        page,
        totalPage,
        limit,
        totalData,
      };

      const offset = page * limit - limit;

      const result = await eventModel.showAllEvent(
        offset,
        limit,
        searchName,
        sort
      );

      redis.setEx(
        `getEvent:${JSON.stringify(request.query)}`,
        3600,
        JSON.stringify(result)
      );

      return wrapper.response(
        response,
        result.status,
        "Success get Data !",
        result.data,
        pagination
      );
    } catch (error) {
      const { status, statusText, error: errorData } = error;
      return wrapper.response(response, status, statusText, errorData);
    }
  },
  getEventById: async (request, response) => {
    try {
      const { id } = request.params;

      const result = await eventModel.getEventById(id);

      if (result.data.length < 1) {
        return wrapper.response(
          response,
          404,
          `Data By Id ${id} Not Found`,
          []
        );
      }

      redis.setEx(`getEvent:${id}`, 3600, JSON.stringify(result));

      return wrapper.response(
        response,
        result.status,
        "Success Get Greetings",
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
  createEvent: async (request, response) => {
    try {
      const { name, category, location, detail, dateTimeShow, price } =
        request.body;
      const setData = {
        name,
        category,
        location,
        detail,
        dateTimeShow,
        price,
        // image: `${request.file.filename}.${
        //   request.file.mimetype.split("/")[1]
        // }`,
        // imagePath: request.file.path,
      };
      if (request.file) {
        const { filename: image, path: imagePath } = request.file;
        Object.assign(setData, { image, imagePath });
      }

      const result = await eventModel.createEvent(setData);

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
  updateEvent: async (request, response) => {
    try {
      const { id } = request.params;
      const { name, category, location, detail, dateTimeShow, price } =
        request.body;

      const checkId = await eventModel.getEventById(id);

      if (checkId.data.length < 1) {
        return wrapper.response(
          response,
          404,
          `Data By Id ${id} Not Found`,
          []
        );
      }
      const currentImage = await eventModel.getImage(id);
      if (currentImage) {
        cloudinary.uploader.destroy(currentImage.data[0].image);
      }
      const setData = {
        name,
        category,
        location,
        detail,
        dateTimeShow,
        price,
        updatedAt: new Date(Date.now()),
      };
      if (request.file) {
        const { filename: image, path: imagePath } = request.file;
        Object.assign(setData, { image, imagePath });
      }

      // eslint-disable-next-line no-restricted-syntax
      for (const data in setData) {
        if (!setData[data]) {
          delete setData[data];
        }
      }

      const result = await eventModel.updateEvent(id, setData);

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
  deleteEvent: async (request, response) => {
    try {
      // console.log(request.params)
      const { id } = request.params;

      const currentImage = await eventModel.getImage(id);
      if (currentImage) {
        cloudinary.uploader.destroy(currentImage.data[0].image);
      }

      const result = await eventModel.deleteEvent(id);

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
