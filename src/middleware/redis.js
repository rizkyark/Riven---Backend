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
};
