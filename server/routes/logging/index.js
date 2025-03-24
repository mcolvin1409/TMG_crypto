
const fs = require("fs"),
  express = require("express"),
  router = express.Router(),
  
  Validators = require("../../domain/Validators.js"),
  LoggingService = require("../../services/Logging.js"),
  logger = new LoggingService(),
  Level = logger.levels();

/**------------------------------------------------------------------
 * Routes
 * ------------------------------------------------------------------
 */

router.get("/logging/levels", async (req, res) => {
  res.status(200).json({ level: Level ?? {} });
});

router.post("/logging", async (req, res) => {
  let success = false;

  try {
    if (Validators.isValidTopic(req.body.topic)) {
      logger.log(req.body.topic, logger.createLogData(req.body));
      success = true;
    }
  } catch(e) {
    console.log("There's a problem with the Logging Service");
    console.error(e.message);
  } finally {
    res.status(success ? 200 : 400).json({ success });
  }
});

module.exports = router;
