const admin = require("firebase-admin");

const serviceAccount = require("../utils/riven-09-firebase-adminsdk-5jekp-aab7783bf1.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
