// creating data base connection..
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
// creating database connection .
const DatabaseConnection = async () => {
  try {
    const DataBaseUri = `mongodb+srv://muhammederamala15:${process.env.mongoDbPassword}@cluster0.y3diodk.mongodb.net/?retryWrites=true&w=majority`;
    const connect = await mongoose.connect(DataBaseUri, {
      UseNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected Sucessfully");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = DatabaseConnection;
