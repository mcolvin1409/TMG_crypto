const CacheService = require("../services/Cache.js"),
  cache = new CacheService();
  
/**
 * This is a PoC and is WIP.  Contact John Murphy for details.
 */
class LogThrottle {

  //  [JJM] -- still WIP
  static check(key, factor) {
    let result = false,
      inx = cache.get(key) ?? factor;

    result = (factor <= inx);

    cache.set(key, result ? inx + 1 : 0);
    return result;
  }

}

Object.freeze(LogThrottle);

module.exports = LogThrottle;
