const redis = require("redis");

class RedisClient {
  constructor() {
    this.instance = redis.createClient({
      url: "redis://0.0.0.0:6379",
    });
    this.instance.on("error", (err) => console.log("Redis Client Error", err));
    this.instance.connect();
  }
}

module.exports = (new RedisClient()).instance;
