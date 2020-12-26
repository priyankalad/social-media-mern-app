// const express = require('express');
// const cors = require('cors');

// const app = express();

// app.get('/api/customers', cors(), (req, res) => {
//   const customers = [
//     {id: 1, firstName: 'John', lastName: 'Doe'},
//     {id: 2, firstName: 'Brad', lastName: 'Traversy'},
//     {id: 3, firstName: 'Mary', lastName: 'Swanson'},
//   ];

//   res.json(customers);
// });

// const port = 5000;

// app.listen(port, () => `Server running on port ${port}`);

var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var multer = require("multer");
var logger = require("morgan");
var cors = require("cors");
require("dotenv").config();
var { connect } = require("../server/db/db_connection");

//let fileUpload = require("express-fileupload");

var indexRouter = require("../server/routes/index");
var usersRouter = require("../server/routes/users");
var postRouter = require("../server/routes/posts");

var app = express();
connect().then((err) => {
  if (err) console.log("error occured while connecting to database");
  console.log("database connected");
});
//app.use(fileUpload());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "doc")));
app.use(
  "/profilepics",
  express.static(path.join(__dirname, "public/profilepics"))
);
app.use(
  "/postimage",
  express.static(path.join(__dirname, "public/postimages"))
);
app.use(cors());
``;

app.use("/api", indexRouter);
app.use("/api/user", usersRouter);
app.use("/api/user/post", postRouter);
app.use(errorHandler);

function errorHandler(err, req, res, next) {
  console.log(err);
  console.log("Error Detail: " + JSON.stringify(err));
  res.status(500).json({
    message: "Something went wrong. Please contact administrator",
  });
}
console.log("in app.js....." + process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "../client/build")));
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "..", "client", "build", "index.html")
    );
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => `Server running on port ${port}`);

module.exports = app;
