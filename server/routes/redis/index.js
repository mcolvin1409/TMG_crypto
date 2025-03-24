const express = require("express"),
  router = express.Router(),
  CacheService = require("../../services/Cache.js"),
  cache = new CacheService();

router.get("/cache/set/:key", async (req, res) => {
  const result = await cache.set(req.params.key, "32g3f32tg322g");
  res.status(201).json({ msg: result });
});

router.get("/cache/get/:key", async (req, res) => {
  const myVal = await cache.get(req.params.key);
  res.status(201).json({ msg: myVal });
});

module.exports = router;
