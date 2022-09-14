const jwt = require("jsonwebtoken");
const redis = require("../config/redis");
const wrapper = require("../utils/wrapper");

module.exports = {
  authentication: async (req, res, next) => {
    let token = req.headers.authorization;
    if (!token) {
      return wrapper.response(res, 403, "Please login first", null);
    }

    // eslint-disable-next-line prefer-destructuring
    token = token.split(" ")[1];

    const checkTokenRedis = await redis.get(`accessToken:${token}`);
    if (checkTokenRedis) {
      return wrapper.response(
        res,
        403,
        "Your token is already destroyed, please login again",
        null
      );
    }

    // eslint-disable-next-line consistent-return
    jwt.verify(token, "RAHASIA", (error, result) => {
      if (error) {
        return wrapper.response(res, 403, error.message, null);
      }
      req.decodeToken = result;
    });
    return next();
  },
  isAdmin: (req, res, next) => {
    const { role } = req.decodeToken;
    if (role !== "admin") {
      return wrapper.response(
        res,
        401,
        "This action requires administrator privileges",
        null
      );
    }
    return next();
  },
};
