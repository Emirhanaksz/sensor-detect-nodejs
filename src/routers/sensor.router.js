const {
  setSensor,
  getDetail,
  getGeneral,
  deleteAction,
  updateValue,
} = require("../controllers/sensor.controller");
const router = require("express").Router();

// Value Validitation
router.patch("/val", updateValue);

// General Page
router.get("/gen", getGeneral);

// Detail Page
router.get("/det/:name", getDetail);

// Set Sensor
router.patch("/set", setSensor);

// Reset Action
router.patch("/del/:name", deleteAction);

module.exports = router;
