const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const employeeRoutes = require("./routes/employeeRoutes");
const fs = require("fs");
const app = express();

//Middleware

app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

//Connection to MongoDB

mongoose
  .connect(
    "mongodb+srv://naikyash535:yash5499@cluster0.pe2dn.mongodb.net/?retryWrites=true&w=majority&appName=newtest"
  )
  .then(() => {
    console.log("Database Connection Successfull");
  })
  .catch((error) => {
    console.error("Database Connection Failed", error);
  });

//Routes

app.use("/api", employeeRoutes);

//Existing Directory

if (!fs.existsSync("./uploads")) {
  fs.mkdirSync("./uploads");
}

//Server

app.listen(4000, () => {
  console.log("Server listning at http://127.0.0.1:4000");
});
