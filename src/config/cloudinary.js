const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "di6rwbzkv",
  api_key: "565458785498596",
  api_secret: "KtnWV2Oh7y3okaKz_QHmT7SNmh4",
  secure: true,
});

module.exports = cloudinary;
