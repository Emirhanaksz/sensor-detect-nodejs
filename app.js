const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

// Create express app
const app = express();

// Import dotenv
require("dotenv").config();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(express.json());

// Logging system
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "./logs/logs.log"),
  {
    flags: "a",
  }
);
app.use(morgan("dev", { stream: accessLogStream }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );
  next();
});

const corsOptions = {
  //To allow requests from client
  origin: ["http://localhost:3000", "http://127.0.0.1"],
  credentials: true,
  withCredentials: true,
};

// Cors options
app.use(cors(corsOptions));

// User Router
const SensorRouter = require("./src/routers/sensor.router");

// using as middleware

// User api
app.use("/api/sensor", SensorRouter);

app.listen(process.env.PORT, () => console.log("Server running in port 3000"));
