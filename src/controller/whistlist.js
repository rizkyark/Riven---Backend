const wishtlistModel = require("../models/whistlist");
const wrapper = require("../utils/wrapper");

module.exports = {
  getAllWhistlist: async (request, response) => {
    // let {  page, limit } = request.query;
    let { userId, page, limit } = request.query;
    userId = `${userId || ""}`;
    page = +page;
    limit = +limit;

    const totalData = await wishtlistModel.getCountWishlist();
    const totalPage = Math.ceil(totalData / limit);
    const pagination = {
      page,
      totalPage,
      limit,
      totalData,
    };

    const offset = page * limit - limit;

    try {
      const result = await wishtlistModel.getAllWhistlist(
        userId,
        offset,
        limit
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
  createProduct: async (request, response) => {
    try {
      const { eventId, userId } = request.body;
      const setData = {
        eventId,
        userId,
      };

      const result = await wishtlistModel.createWhistlist(setData);

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
  deleteWhishlist: async (request, response) => {
    try {
      // console.log(request.params)
      const { id } = request.params;

      const result = await wishtlistModel.deleteWishlist(id);

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
