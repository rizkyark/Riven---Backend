const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
const wrapper = require("../utils/wrapper");

module.exports = {
  eventImage: (req, res, next) => {
    const storage = new CloudinaryStorage({
      cloudinary,
      params: {
        folder: "Riven/Event",
      },
    });

    const upload = multer({
      storage,
      limits: { fileSize: 500000 },
      fileFilter: (req, file, cb) => {
        if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
          cb(new Error("File should be a .jpg or .png image"), false);
        }
        cb(null, true);
      },
    }).single("image");

    upload(req, res, (error) => {
      if (error instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        return wrapper.response(res, 401, error.message, null);
      }
      if (error) {
        // An unknown error occurred when uploading.
        return wrapper.response(res, 401, error.message, null);
      }
      return next();
    });
  },
  userImage: (req, res, next) => {
    const storage = new CloudinaryStorage({
      cloudinary,
      params: {
        folder: "Riven/User",
      },
    });

    const upload = multer({
      storage,
      limits: { fileSize: 500000 },
      fileFilter: (req, file, cb) => {
        if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
          cb(new Error("File should be a .jpg or .png image"), false);
        }
        cb(null, true);
      },
    }).single("image");

    upload(req, res, (error) => {
      if (error instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        return wrapper.response(res, 401, error.message, null);
      }
      if (error) {
        // An unknown error occurred when uploading.
        return wrapper.response(res, 401, error.message, null);
      }
      return next();
    });
  },
};