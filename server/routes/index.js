const redisApi = require("./redis/index.js"),
  coolingApi = require("./cooling/index.js"),
  timeseriesApi = require("./timeseries/index.js"),
  networkApi = require("./network/index.js"),
  logApi = require("./logging/index.js"),
  systemApi = require("./system/index.js"),
  sensorsApi = require("./sensors/index.js"),
  authApi = require("./auth/index.js"),
  express = require("express"),
  router = express.Router();

router.use(redisApi);
router.use(timeseriesApi);
router.use(networkApi);
router.use(logApi);
router.use(systemApi);
router.use(coolingApi);
router.use(sensorsApi);
router.use(authApi);

module.exports = router;
