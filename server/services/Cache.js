//  requires the RedisClient Singleton Object
const CacheClient = require("./providers/RedisClient");

class CacheService {
  constructor() {
    this.cache = CacheClient;
  } 

  static get Url() {
    return Url;
  }

  async set(key, value) {
    await this.cache.set(key, value);

    const result = await this.cache.get(key);
    return result;
  }

  async get(key) {
    const result = await this.cache.get(key);
    return result;
  }

  async getAll() {
    this.cache.keys("*", function(err, replies) {
      if (err) {
        return callback(err);
      }

      client.mget(replies, function(err, replies) {
        if (err) {
          return callback(err);
        }

        return callback(null, replies);
      });
    });
  }
}

module.exports = CacheService;
