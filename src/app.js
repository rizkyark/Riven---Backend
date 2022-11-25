const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("morgan");
const xss = require("xss-clean");
const compression = require("compression");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");

const serviceAccount = require("./utils/riven-09-firebase-adminsdk-5jekp-aab7783bf1.json");
require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(xss());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const routerNavigation = require("./routes");

// app.get("/greetings", (request, response) => {
//   response.status(200).send("Hello World!");
// });

app.use("/api", routerNavigation);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.post("/payment", (req, res) => {
  const dataUser = {
    fullName: "Rizky",
  };

  const dataTransaction = {
    amount: "Rp 5000",
  };

  const condition = "'stock-GOOG' in topics || 'industry-tech' in topics";

  const message = {
    notification: {
      title: `payment success, kamu udah ngirim ke ${dataUser.fullName}`,
      body: `kamu mengirim sebesar${dataTransaction.amount}.`,
    },
    condition,
  };

  // Send a message to devices subscribed to the combination of topics
  // specified by the provided condition.
  getMessaging()
    .send(message)
    .then((response) => {
      // Response is a message ID string.
      console.log("Successfully sent message:", response);
    })
    .catch((error) => {
      console.log("Error sending message:", error);
    });
});

app.use("/*", (req, res) => {
  res.status(404).send("Path not found");
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is Running on port ${port}`);
});
