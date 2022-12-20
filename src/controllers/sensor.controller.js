const {
  setSensor,
  getGeneral,
  getDetail,
  deleteAction,
  updateValue,
} = require("../models/sensor.model");

module.exports = {
  // Delete Action
  deleteAction: (req, res) => {
    deleteAction(req.params.name, (err, results) => {
      if (err) {
        return res.status(400).json({
          isAuth: false,
          error: err,
          massage: "Error Happened",
          data: null,
        });
      } else {
        return res.status(200).json({
          isAuth: true,
          error: null,
          massage: "Successful!",
          data: results,
        });
      }
    });
  },

  // Value Validitation
  updateValue: (req, res) => {
    const body = req.body;
    var ad = body.sensor_ad;
    var ozellik = body.sensor_ozellik.split(",");
    updateValue(ad, ozellik, (err, results) => {
      if (err) {
        return res.status(400).json({
          isAuth: false,
          error: err,
          massage: "Error Happenedr",
        });
      } else {
        return res.status(200).json({
          isAuth: true,
          massage: "Successful!",
          data: results,
        });
      }
    });
  },
  // Set Sensor
  setSensor: (req, res) => {
    const body = req.body;
    var frekans = body.frekans.split(",");
    var konum = body.konum.split(".");
    setSensor(konum, frekans, (err, results) => {
      if (err) {
        return res.status(400).json({
          isAuth: false,
          error: err,
          massage: "Error Happened",
        });
      } else {
        return res.status(200).json({
          isAuth: true,
          massage: "Successful!",
          data: results,
        });
      }
    });
  },

  // General Page
  getGeneral: (req, res) => {
    getGeneral((err, results) => {
      if (err) {
        return res.status(400).json({
          isAuth: false,
          error: err,
          massage: "Error Happened",
          data: null,
        });
      } else if (!results) {
        return res.status(400).json({
          isAuth: false,
          error: err,
          massage: "Error Happened",
          data: null,
        });
      } else {
        return res.status(200).json({
          isAuth: true,
          error: null,
          massage: "Successful!",
          data: results,
        });
      }
    });
  },

  // Detail Page
  getDetail: (req, res) => {
    getDetail(req.params.name, (err, results) => {
      if (err) {
        return res.status(400).json({
          isAuth: false,
          error: err,
          massage: "Error Happened",
          data: null,
        });
      } else if (!results) {
        return res.status(400).json({
          isAuth: false,
          error: err,
          massage: "Error Happened",
          data: null,
        });
      } else {
        return res.status(200).json({
          isAuth: true,
          error: null,
          massage: "Successful!",
          data: results,
        });
      }
    });
  },
};
