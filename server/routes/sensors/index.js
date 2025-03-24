
const fs = require("fs"),
  express = require("express"),
  router = express.Router(),

  State = require("../../../domain/State.js"),
  Topic = require("../../domain/Topic.js"),
  Tag = require("../../domain/Tag.js"),
  Key = require("../../domain/Key.js"),
  Thresholds = require("../../domain/Thresholds.js"),
  
  CacheService = require("../../services/Cache.js"),
  cache = new CacheService(),

  MessageService = require("../../services/Message.js"),
  message = new MessageService(),

  LoggingService = require("../../services/Logging.js"),
  logger = new LoggingService(),
  Level = logger.levels(),
  Priority = logger.priorities();

/**------------------------------------------------------------------
 * Routes
 * ------------------------------------------------------------------
 */

router.get("/sensors", async (req, res) => {
  let alarmThresholds = await cache.get(Tag.ALARM_THRESHOLDS),
    success = false;
    logData = {};

  if (!alarmThresholds) {
    alarmThresholds = fs.readFileSync(Thresholds.INFO_PATH);
  }

  if (!alarmThresholds) {
    logData = logger.createLogData({
      level: Level.ERROR,
      priority: Priority.CRITICAL,
      application: "sensors.thresholds",
      message: "Alarms thresholds are Missing"
    });
    alarmThresholds = {};
  } else {
    logData = logger.createLogData({
      level: Level.INFO,
      priority: Priority.NOMINAL,
      application: "sensors.thresholds",
      message: "Alarms thresholds changed"
    });
    success = true;
  }
  
  logger.alarm(logData.level,  logData);
  res.status(success ? 200 : 400).json({ success, alarmThresholds: JSON.parse(alarmThresholds) });
});

router.post("/sensors", async (req, res) => {
  let success = false,
    logData = {},
    msg = "A Threshold value Out of Range";

  try {
    if (Thresholds.inRange(req.body)) {
      success = true;
      msg = "New Thresholds saved";

      message.publish(Topic.ALARM_THRESHOLDS, JSON.stringify(req.body));
    }
    
    logData = logger.createLogData({
      level: success ? Level.INFO : Level.WARN,
      priority: success ? Priority.NOMINAL : Priority.LOW,
      application: "sensors.thresholds",
      message: msg
    });
      
  } catch (e) {
    logData = logger.createLogData({
      level: Level.ERROR,
      priority: Priority.CRITICAL,
      application: "sensors.thresholds",
      message: `${e.name}: ${e.message}`
    });
    logger.error(logData.level, logData);
    console.error(`${e.name}: ${e.message}`);
  } finally {
    logger.alarm(logData.level, logData);
    res.status(success ? 200 : 400).json({ success, message: msg });
  }
  
});

router.get("/sensors/alarms", async (req, res) => {
  let success = false,
    alarms = {},
    logData = {};
    
  try {
    const alarmStateAsInt = (val) => {
      const num = parseInt(val, 10);

      if (!Number.isFinite(num)) {
        logData = logger.createLogData({
          level: Level.ERROR,
          priority: "high",
          application: "sensors.alarms",
          message: "BAD Alarm data"
        });
        logger.alarm(logData.level, logData, 30)
        return undefined;
      }

      return num;
    },
    [oll, rot, tot, pps] = await Promise.all([
      cache.get(Tag.OIL_LEVEL_LOW).then(alarmStateAsInt, (err) => undefined),
      cache.get(Tag.RSVR_OIL_TEMP).then(alarmStateAsInt, (err) => undefined),
      cache.get(Tag.TANK_OIL_TEMP).then(alarmStateAsInt, (err) => undefined),
      cache.get(Tag.PDU_POWER_STATE).then(alarmStateAsInt, (err) => undefined),
    ]);

    alarms.oilLevelLowAlarm = oll ?? State.ALARM_ON;
    alarms.rsvrOilTempAlarm = rot ?? State.ALARM_ON;
    alarms.tankOilTempAlarm = tot ?? State.ALARM_ON;
    alarms.pduPowerState = pps ?? State.POWER_OFF;

    logData = logger.createLogData({
      level: Level.DEBUG,
      priority: Priority.LOW,
      application: "sensors.alarms",
      message: "Alarms are processing"
    });
  
    success = true;
  } catch (e) {
    let error = `${e.name}: ${e.message}`;
    console.error(error);

    logData = logger.createLogData({
      level: Level.ERROR,
      priority: Priority.CRITICAL,
      application: "sensors.alarms",
      message: error
    });
    logger.error(logData.level, logData);
  } finally {
    logger.alarm(logData.level, logData);
    res.status(success ? 200 : 400).json({ success, alarms });
  }

});

router.get("/sensors/restart", async (req, res) => {
  let success = false,
    logData = {};

  try {
    message.publish(Topic.OIL_LEVEL_LOW, State.ALARM_OFF.toString(10));
    message.publish(Topic.RSVR_OIL_TEMP, State.ALARM_OFF.toString(10));
    message.publish(Topic.TANK_OIL_TEMP, State.ALARM_OFF.toString(10));
    message.publish(Topic.PDU_POWER_STATE, State.POWER_OFF.toString(10));
    logData = logger.createLogData({
      level: Level.INFO,
      priority: Priority.NOMINAL,
      application: "sensors.restart",
      message: "Resetting Alarms status to OFF"
    });
    logger.alarm(logData.level, logData);

    success = true;
  } catch (e) {
    logData = logger.createLogData({
      level: Level.ERROR,
      priority: Priority.LOW,
      application: "sensors.restart",
      message: "Resetting Alarms status to OFF failed"
    });
    logger.alarm(logData.level, logData);

    console.error(`${e.name}: ${e.message}`);
  }

  res.status(success ? 200 : 400).json({ success });
});

router.post("/sensors/clear", async (req, res) => {
  let success = false,
    logData = {};

  try {
    const topic = Key.getTopic(req.body.clear);

    if (topic !== Key.INVALID_KEY) {
      message.publish(topic, State.ALARM_OFF.toString(10));
      logData = logger.createLogData({
        level: Level.INFO,
        priority: Priority.NOMINAL,
        application: "sensors.clear." + req.body.clear,
        message: data.message
      });

      logger.alarm(logData.level, logData);      
      success = true;
    }
  } catch (e) {
    logData = logger.createLogData({
      level: Level.ERROR,
      priority: Priority.CRITICAL,
      application: "sensors.clear",
      message: `${e.name}: ${e.message}`
    });
    logger.alarm(logData.level, logData);
    console.error(`${e.name}: ${e.message}`);
  }

  res.status(success ? 200 : 400).json({ success });
});

router.get("/sensors/power/off", async (req, res) => {
  let success = false,
    logData = {};

  try {
    message.publish(Topic.PDU_POWER_STATE, State.ALARM_TRIPPED.toString(10));
    
    logData = logger.createLogData({
      level: Level.INFO,
      priority: Priority.NOMINAL,
      application: "sensors.power.off",
      message: "PDU Breaker Tripped to turn power OFF"
    });
    logger.alarm(logData.level, logData);
    success = true;
  } catch (e) {
    logData = logger.createLogData({
      level: Level.ERROR,
      priority: Priority.CRITICAL,
      application: "sensors.power.off",
      message: `${e.name}: ${e.message}`
    });
    logger.alarm(logData.level, logData);
    console.error(`${e.name}: ${e.message}`);
  }

  res.status(success ? 200 : 400).json({ success });
});

module.exports = router;
