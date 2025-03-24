const fs = require("fs"),
  bcrypt = require("bcryptjs"),
  express = require("express"),
  router = express.Router(),
  LoggingService = require("../../services/Logging.js"),
  logger = new LoggingService(),
  Level = logger.levels(),
  Priority = logger.priorities(),
  LogMessages = logger.messages(),
  FILENAME = "./config/cryptocore.json",
  PASSWORD_REGEX = /^[a-zA-Z0-9!@#$%^&*()\-=[\];',./_+{}|:"?`~ ]{4,254}$/iu;

function createPassword(password) {
  const salt = bcrypt.genSaltSync(10),
    hash = bcrypt.hashSync(password, salt),
    data = JSON.stringify({
      hash,
      salt,
    });

  return data;
}

/**------------------------------------------------------------------
 * Routes
 * ------------------------------------------------------------------
 */

router.post("/auth/initialize", async (req, res) => {
  let success = PASSWORD_REGEX.test(req.body.password),
    logData = {},
    message = LogMessages.MSG_1001;

  try {
    if (success) {
      const data = createPassword(req.body.password);
      fs.writeFileSync(FILENAME, data);
    }
    logData = logger.createLogData({
      level: success ? Level.INFO : Level.ERROR,
      priority: success ? Priority.NOMINAL : Priority.CRITICAL,
      application: "auth.initialize",
      message: success ? message : LogMessages.MSG_1007
    });
  } catch (e) {
    success = false;
    message = LogMessages.MSG_1002;
    logData = logger.createLogData({
      level: Level.ERROR,
      priority: Priority.CRITICAL,
      application: "auth.initialize",
      message: message
    });
  } finally {
    logger.security(logData.level, logData);
    res.status(success ? 200 : 400).json({ success, message });
  }
});

router.post("/auth/change", async (req, res) => {
  let result = false,
    logData = {},
    message = LogMessages.MSG_1006;

  if (!fs.existsSync(FILENAME)) {
    logData = logger.createLogData({
      level: Level.ERROR,
      priority: Priority.CRITICAL,
      application: "auth.change",
      message: message
    });
    logger.security(logData.level, logData);
    return res.status(400).json({ success: result, message: message });
  }

  try {
    const rawdata = fs.readFileSync(FILENAME),
      data = JSON.parse(rawdata),
      success =
        PASSWORD_REGEX.test(req.body.newPassword) &&
        bcrypt.compareSync(req.body.currentPassword, data.hash);

    if (success) {
      const newData = createPassword(req.body.newPassword);
      fs.writeFileSync(FILENAME, newData);
      logData = logger.createLogData({
        level: Level.INFO,
        priority: Priority.NOMINAL,
        application: "auth.change",
        message: LogMessages.MSG_1003
      });
      result = true;
    }
  } catch (e) {
    logData = logger.createLogData({
      level: Level.ERROR,
      priority: Priority.CRITICAL,
      application: "auth.change",
      message: `${e.name}: ${e.message}`
    });
  } finally {
    logger.security(logData.level, logData);
    res.status(result ? 200 : 400).json({ success: result });
  }
});

router.post("/auth", async (req, res) => {
  let success = false,
    logData = {},
    message = LogMessages.MSG_1006;

  if (!fs.existsSync(FILENAME)) {
    logData = logger.createLogData({
      level: Level.ERROR,
      priority: Priority.CRITICAL,
      application: "auth",
      message: message
    });
    logger.security(logData.level, logData);
    return res.status(400).json({ success, message: message });
  }

  try {
    const rawdata = fs.readFileSync(FILENAME),
      data = JSON.parse(rawdata);

    success = bcrypt.compareSync(req.body.password, data.hash);
    message = success ? LogMessages.MSG_1004 : LogMessages.MSG_1005;
    logData = logger.createLogData({
      level: success ? Level.INFO : Level.WARN,
      priority: Priority.HIGH,
      application: "auth",
      message: message
    });
  } catch (e) {
    logData = logger.createLogData({
      level: Level.ERROR,
      priority: Priority.CRITICAL,
      application: "auth",
      message: `${e.name}: ${e.message}`
    });
  } finally {
    logger.security(logData.level, logData);
    res.status(success ? 200 : 400).json({ success });
  }
});

module.exports = router;
