const express = require("express"),
  router = express.Router(),
  CacheService = require("../../services/Cache.js"),
  cache = new CacheService(),
  LoggingService = require("../../services/Logging.js"),
  logger = new LoggingService(),
  Level = logger.levels(),
  Priority = logger.priorities(),
  LogMessages = logger.messages();

/**------------------------------------------------------------------
 * Routes
 * ------------------------------------------------------------------
 */

router.get("/cooling", async (req, res) => {
  let success = false; 
    logData = {}, 
    cooling = {};

  try {
    cooling = {
      flowMeterSensorOil: parseFloat(await cache.get("4to20mAchannel1")).toFixed(2),
      flowMeterSensorWater: parseFloat(await cache.get("4to20mAchannel2")).toFixed(2),

      fluidPressureSensorOilIn: parseFloat(await cache.get("0to10Vchannel1")).toFixed(2),
      fluidPressureSensorOilOut: parseFloat(await cache.get("0to10Vchannel2")).toFixed(2),

      fluidPressureSensorWaterIn: parseFloat(await cache.get("0to10Vchannel3")).toFixed(2),
      fluidPressureSensorWaterOut: parseFloat(await cache.get("0to10Vchannel4")).toFixed(2),

      fluidTempRtdOilIn: parseFloat(await cache.get("rtd0read1")).toFixed(2),
      fluidTempRtdOilOut: parseFloat(await cache.get("rtd0read2")).toFixed(2),

      fluidTempRtdWaterIn: parseFloat(await cache.get("rtd0read3")).toFixed(2),
      fluidTempRtdWaterOut: parseFloat(await cache.get("rtd0read4")).toFixed(2),

      fluidTempRtdOilReservoir: parseFloat(await cache.get("rtd0read5")).toFixed(2),
      fluidTempRtdOilTank: parseFloat(await cache.get("rtd0read6")).toFixed(2),
    };

    logData = logger.createLogData({
      level: Level.DEBUG,
      priority: Priority.NOMINAL,
      application: "cooling",
      message: LogMessages.MSG_1000
    });

    success = true;

  } catch (e) {
    logData = logger.createLogData({
      level: Level.ERROR,
      priority: Priority.CRITICAL,
      application: "cooling",
      message: `${e.name}: ${e.message}`
    });
    logger.error(logData.level, logData);
  } finally {
    logger.audit(logData.level, logData);
    res.status(success ? 200 : 400).json({ success, cooling: cooling });
  }
});

module.exports = router;
