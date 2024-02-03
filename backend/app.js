const mongoose = require("mongoose");
const express = require("express");
const app = express();
const dotenv = require("dotenv").config();

const cors = require("cors");
const bodyParser = require("body-parser");
const DatabaseConnection = require("./database/config");
// import routes...
const router = require("./routes/userRoute");
DatabaseConnection();
// middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "5mb" }));

app.use("", router);
const Port = 4000;
app.listen(Port, () => {
  console.log(`Server is running at the ${Port}`);
});
