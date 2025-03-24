const express = require("express"),
  router = express.Router();

const Tag = require("../../domain/Tag.js"),
  Topic = require("../../domain/Topic.js"),
  Validators = require("../../domain/Validators.js"),
  
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

router.get("/network/settings", async (req, res) => {
  let network = await cache.get(Tag.NETWORK_SETTINGS),
    logData = {},
    settings = {};

  try {
    
    logData = logger.createLogData({
      level: Level.INFO,
      priority: Priority.NOMINAL,
      application: "network.settings",
      message: "Reading network settings"
    });
        
    settings = JSON.parse(network);

  } catch (e) {
    logData = logger.createLogData({
      level: Level.ERROR,
      priority: Priority.CRITICAL,
      application: "network.settings",
      message: `${e.name}: ${e.message}`
    });
    logger.error(logData.level, logData);
  } finally {
    logger.audit(logData.level, logData);
    res.status(200).json({ settings: settings });
  }
});

router.post("/network/settings", async (req, res) => {
  let success = false, 
    validated = true,
    logData = logger.createLogData({
      level: Level.WARN,
      priority: Priority.MEDIUM,
      application: "network.settings",
      message: "POST settings failed"
    });

  try {
    const data = req.body.settings;

    if (data.dhcp) {
      payload = { dhcp: data.dhcp };
    } else {
      validated = Validators.isValidNetwork(data);
      [ data.address, data.subnetMask ] = data.address.split("/", 2);
      payload = data;
    }
      
    if (validated || data.dhcp) {
      logData = logger.createLogData({
        level: Level.INFO,
        priority: Priority.NOMINAL,
        application: "network.settings",
        message: "POST network settings succeeded"
      });
      
      message.publish(Topic.NETWORK_SETTINGS, JSON.stringify(payload));
      success = true;
    }

  } catch(e) {
    logData = logger.createLogData({
      level: Level.ERROR,
      priority: Priority.CRITICAL,
      application: "network.settings",
      message: `${e.name}: ${e.message}`
    });
    logger.error(logData.level, logData);
    console.error(e.message);
  } finally {
    logger.audit(logData.level, logData);
    res.status(success ? 200 : 400).json({ success });
  }
});

module.exports = router;
