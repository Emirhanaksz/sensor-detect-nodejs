const dbConn = require("../../config/db.config");

module.exports = {
  // Set Sensor
  setSensor: (konum, frekans, callback) => {
    for (var i = 0; i < frekans.length; i++) {
      dbConn.query(
        "UPDATE sensorler set sensor_frekans=? WHERE sensor_ad = ?",
        [frekans[i + 1], frekans[i]]
      );
      if (i == frekans.length - 2) {
        dbConn.query(
          "UPDATE sensorler set sensor_konum=? WHERE sensor_ad = ?",
          [konum[i + 1], konum[i]],
          (error, results, _fields) => {
            if (error) {
              return callback(error);
            } else {
              return callback(null, results);
            }
          }
        );
      }
      dbConn.query("UPDATE sensorler set sensor_konum=? WHERE sensor_ad = ?", [
        konum[i + 1],
        konum[i],
      ]);
      i++;
    }
  },

  // General Sensor Page
  getGeneral: (callback) => {
    dbConn.query(
      "SELECT sensor_ad, sensor_konum, sensor_frekans FROM sensorler WHERE sensor_frekans != 0",
      (error, results, _fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, results);
        }
      }
    );
  },

  // Reset Action Of Sensor
  deleteAction: (name, callback) => {
    dbConn.query(
      "UPDATE sensorler set sensor_konum=?, sensor_frekans=? WHERE sensor_ad = ?",
      ["0,0", 0, name],
      (error, results, _fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, results);
        }
      }
    );
  },

  // Sensor Detail Page
  getDetail: (name, callback) => {
    dbConn.query(
      "SELECT sensorler.sensor_ad, sensorler.sensor_konum, sensorler.sensor_ozellik, sensorler.sensor_frekans, sensor_degerler.sensor_ozellik, sensor_degerler.sensor_deger From sensorler, sensor_degerler WHERE sensorler.sensor_ad=? AND sensor_degerler.sensor_ad=?",
      [name, name],
      (error, results, _fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, results);
        }
      }
    );
  },

  // Frekans Based Value Validation
  updateValue: (ad, ozellik, callback) => {
    for (var i = 0; i < ozellik.length; i++) {
      var random = Math.floor(Math.random() * 100);
      if (i == ozellik.length - 1) {
        dbConn.query(
          "UPDATE sensor_degerler set sensor_deger=? WHERE sensor_ad=? AND sensor_ozellik=?",
          [random, ad, ozellik[i]],
          (error, results, _fields) => {
            if (error) {
              return callback(error);
            } else {
              return callback(null, results);
            }
          }
        );
      }
      dbConn.query(
        "UPDATE sensor_degerler set sensor_deger=? WHERE sensor_ad=? AND sensor_ozellik=?",
        [random, ad, ozellik[i]]
      );
    }
  },
};
