const redis = require("../config/redis");
const wrapper = require("../utils/wrapper");

module.exports = {
  getEventByIdRedis: async (req, res, next) => {
    try {
      const { id } = req.params;
      let result = await redis.get(`getEvent:${id}`);
      if (result !== null) {
        // console.log("data ada di dalam redis");
        result = JSON.parse(result);
        return wrapper.response(res, 200, "Success get data redis!", result);
      }
      //   console.log("data tidak ada di dalam redis");
      return next();
    } catch (error) {
      return wrapper.response(res, 400, error.message, null);
    }
  },
  getAllEventRedis: async (req, res, next) => {
    try {
      const data = await redis.get(`getEvent:${JSON.stringify(req.query)}`);
      if (data !== null) {
        const { result, pageInfo } = JSON.parse(data);
        return wrapper.response(
          res,
          200,
          "Success get data!",
          result,
          pageInfo
        );
      }
      return next();
    } catch (error) {
      return wrapper.response(res, 400, error.message, null);
    }
  },
  clearEventRedis: async (req, res, next) => {
    try {
      const keys = await redis.keys("getEvent:*");
      if (keys.length > 0) {
        keys.forEach(async (el) => {
          await redis.del(el);
        });
      }
      return next();
    } catch (error) {
      return wrapper.response(res, 400, error.message, null);
    }
  },
};
