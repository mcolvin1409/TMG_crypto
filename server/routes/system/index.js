const fs = require("fs"),
  { exec } = require("child_process"),
  { promisify } = require("util"),
  execP = promisify(exec),
  express = require("express"),
  router = express.Router(),
  
  { Product, ProductNames } = require("../../domain/Product"),
  Fluid = require("../../domain/Fluid.js"),
  Topic = require("../../domain/Topic.js"),
  Internals = require("../../domain/SystemInternals"),
  Thresholds = require("../../domain/Thresholds"),
  TMGcore = require("../../domain/TMGcore.js"),
  Validators = require("../../domain/Validators.js"),
  DISCLAIMER_BP = require("../../domain/Disclaimer"),
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

router.get("/system/health", async (req, res) => {
  let success = false, 
    logData = {},
    health = {};

  try {
    health = {
      iaHatVersion: parseFloat(await cache.get("iaHatVersion")),
      rtdHatVersion: parseFloat(await cache.get("rtdHatVersion")),
      controlIoCpuBoardVoltage: parseFloat(await cache.get("controlIoCpuBoardVoltage")),
      controlIoBoardVoltage: parseFloat(await cache.get("controlIoBoardVoltage")),
      controlIoCpuTemperature: parseFloat(await cache.get("controlIoCpuTemperature")),
      totalSystemMemory: parseFloat(await cache.get("totalSystemMemory")),
      freeSystemMemory: parseFloat(await cache.get("freeSystemMemory")),
      totalSystemStorage: parseFloat(await cache.get("totalSystemStorage")),
      freeSystemStorage: parseFloat(await cache.get("freeSystemStorage"))
    };

    logData = logger.createLogData({
      level: Level.INFO,
      priority: Priority.NOMINAL,
      application: "system.health",
      message: "GET the system health parameters"
    });

    success= true;
  
  } catch (e) {
    logData = logger.createLogData({
      level: Level.ERROR,
      priority: Priority.CRITICAL,
      application: "system.health",
      message: `${e.name}: ${e.message}`
    });
    logger.error(logData.level, logData);
  } finally {
    logger.audit(logData.level, logData);
    res.status(success ? 200 : 400).json({ success, health: health });
  }
});

router.get("/system/fluids", async (req, res) => {
  let logData = logger.createLogData({
    level: Level.INFO,
    priority: Priority.NOMINAL,
    application: "system.health",
    message: "GET the list of Fluids"
  });

  logger.audit(logData.level, logData);
  res.status(200).json({ fluids: Fluid });
});

router.post("/system/fluids", async (req, res) => {
  let success = false,
    logData = {},
    properties = {};

  try {
    if (Fluid.hasOwnProperty(req.body.fluid) 
      && !(req.body.fluid === "UNDEFINED" || req.body.fluid === Fluid.UNDEFINED)
    ) {
      const fileContents = fs.readFileSync(TMGcore.CRYPTO_INFO, "utf8");
      properties = JSON.parse(fileContents);
      properties.fluid = req.body.fluid;
      fs.writeFileSync(TMGcore.CRYPTO_INFO, JSON.stringify(properties));
      success = true;
    }

    logData = logger.createLogData({
      level: success ? Level.INFO : Level.ERROR,
      priority: success ? Priority.NOMINAL : Priority.MEDIUM,
      application: "system.fluids",
      message: "POST system fluid brand/type"
    });

  } catch (e) {
    logData = logger.createLogData({
      level: Level.ERROR,
      priority: Priority.CRITICAL,
      application: "system.fluids",
      message: `${e.name}: ${e.message}`
    });
    logger.error(logData.level, logData);
    console.error(`${e.name}: ${e.message}`);
  } finally {
    logger.audit(logData.level, logData);
    res.status(success ? 200 : 400).json({ success, properties });
  }
});

router.get("/system/props", async (req, res) => {
  let success = false,
    logData = {},
    properties = {};

  try {
    const fileContents = fs.readFileSync(TMGcore.CRYPTO_INFO, "utf8"),
      tdSettings = await cache.get("currentTimeDateSettings");

    properties = Object.assign(
      JSON.parse(fileContents),
      JSON.parse(tdSettings)
    );

    logData = logger.createLogData({
      level: Level.INFO,
      priority: Priority.NOMINAL,
      application: "system.props",
      message: "GET system properties"
    });

    success = true;

  } catch (e) {
    logData = logger.createLogData({
      level: Level.ERROR,
      priority: Priority.CRITICAL,
      application: "system.props",
      message: `${e.name}: ${e.message}`
    });
    logger.error(logData.level, logData);
    console.error(`${e.name}: ${e.message}`);
  } finally {
    logger.audit(logData.level, logData);
    res.status(success ? 200 : 400).json({ success, properties });
  }
});

router.post("/system/props", async (req, res) => {
  let success = false,
    logData = {},
    properties = {};

  const today = new Date(),
    manufactured = today.toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    }),
    { water, electric } = Internals[req.body.unitType];

  try {
    data = {
      unitId: req.body.unitId,
      unitType: req.body.unitType,
      product: ProductNames[req.body.unitType][1],
      version: ProductNames[req.body.unitType][0],
      revision: req.body.revision,
      factory: "Plano HQ, Texas 75024",
      manufactured: manufactured,
      water: water,
      electrical: electric,
      fluid: Fluid.UNDEFINED,
      swversion: req.body.swversion,
      disclaimer: DISCLAIMER_BP,
    };

    if (!fs.existsSync(TMGcore.CONFIG_DIR)) {
      fs.mkdirSync(TMGcore.CONFIG_DIR);
    }

    if (!fs.existsSync(Thresholds.INFO_PATH)) {
      fs.writeFileSync(Thresholds.INFO_PATH, JSON.stringify(Thresholds.default));
    }
    
    properties = Object.assign(data, TMGcore.data);
    fs.writeFileSync(TMGcore.CRYPTO_INFO, JSON.stringify(properties));
          
    message.publish(Topic.ALARM_THRESHOLDS, JSON.stringify(Thresholds.default));

    logData = logger.createLogData({
      level: Level.INFO,
      priority: Priority.NOMINAL,
      application: "system.props",
      message: "POST system properties"
    });

    success = true;
  } catch (e) {
    logData = logger.createLogData({
      level: Level.ERROR,
      priority: Priority.CRITICAL,
      application: "system.props",
      message: `${e.name}: ${e.message}`
    });
    logger.error(logData.level, logData);
    console.error(`${e.name}: ${e.message}`);
  } finally {
    logger.audit(logData.level, logData);
    res.status(success ? 200 : 400).json({ success, properties });
  }
});

router.post("/system/ntp", async (req, res) => {
  let success = false,
    logData = {};

  try {
    const ntp = (typeof req.body.ntp === 'boolean') ? req.body.ntp : JSON.parse(req.body.ntp),
      primary = req.body.primary ?? "",
      secondary = req.body.secondary ?? "",
      datetime = req.body.datetime ?? "",
      timezone = req.body.timezone ?? "";

    if (ntp) {
      if (!primary) {

        logData = logger.createLogData({
          level: Level.ERROR,
          priority: Priority.MEDIUM,
          application: "system.ntp",
          message: "POST Missing required primary server"
        });
        logger.audit(logData.level, logData);
        throw new Error("Missing required primary server");

      }
    } else {
      if (!datetime) {

        logData = logger.createLogData({
          level: Level.ERROR,
          priority: Priority.MEDIUM,
          application: "system.ntp",
          message: "POST Missing required date and time settings"
        });
        logger.audit(logData.level, logData);
        throw new Error("Missing required date and time settings");

      }
    }

    const isValid =
      Validators.isValidUrl(req.body.primary) && timezone &&
      (!secondary || Validators.isValidUrl(req.body.secondary));

    if (isValid) {
      message.publish(
        Topic.SYSTEM_NTP_SERVERS, 
        JSON.stringify({ ntp, primary, secondary, timezone, datetime })
      );
      success = true;
    }

    logData = logger.createLogData({
      level: success ? Level.INFO : Level.WARN,
      priority: success ? Priority.NOMINAL : Priority.MEDIUM,
      application: "system.ntp",
      message: "POST NTP settings " + success ? "succeeded" : "failed"
    });

  } catch (e) {
    logData = logger.createLogData({
      level: Level.ERROR,
      priority: Priority.CRITICAL,
      application: "system.ntp.current",
      message: `${e.name}: ${e.message}`
    });
    logger.error(logData.level, logData);
    console.error(`${e.name}: ${e.message}`);
  }
    
  logger.audit(logData.level, logData);
  res.status(success ? 200 : 400).json({ success });
});

module.exports = router;
