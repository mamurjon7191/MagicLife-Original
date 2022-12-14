const express = require("express");
const app = express();
const userRoute = require("./../routes/userRoute");
const errorController = require("./../controller/errorController");
const cookies = require("cookie-parser");
const AppError = require("../utilities/AppError");

app.use(express.json());
app.use(cookies());

app.set("views engine", "pug");
app.set("views", `${__dirname}/../views`);

app.use("/api/v1/users", userRoute);

app.all("*", function (req, res, next) {
  next(new AppError(`this url has not found: ${req.originalUrl}`, 404));
});
app.use(errorController);
module.exports = app;
