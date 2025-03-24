const Topic = require("./Topic.js");

class Key {
  static get INVALID_KEY() {
    return "INVALID";
  }

  static get OIL_LEVEL_LOW() {
    return "oilLevelLow";
  }

  static get RSVR_OIL_TEMP() {
    return "rsvrOilTemp";
  }

  static get TANK_OIL_TEMP() {
    return "tankOilTemp";
  }

  static get PDU_POWER_STATE() {
    return "pduPowerState";
  }

  static getTopic(value) {
    let topic = Key.INVALID_KEY;

    switch (value) {
      case Key.OIL_LEVEL_LOW:
        topic = Topic.OIL_LEVEL_LOW;
        break;
      case Key.RSVR_OIL_TEMP:
        topic = Topic.RSVR_OIL_TEMP;
        break;
      case Key.TANK_OIL_TEMP:
        topic = Topic.TANK_OIL_TEMP;
        break;
      case Key.PDU_POWER_STATE:
        topic = Topic.PDU_POWER_STATE;
        break;
      default:
        topic = Key.INVALID_KEY;
    }

    return topic;
  }
}
  
Object.freeze(Key);

module.exports = Key;
