const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("morgan");
const xss = require("xss-clean");
const compression = require("compression");
const bodyParser = require("body-parser");

const app = express();
const port = 3001;

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

app.use("/*", (req, res) => {
  res.status(404).send("Path not found");
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is Running on port ${port}`);
});
