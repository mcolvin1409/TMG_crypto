const ranges = Object.freeze({
    RSVR_OIL_TEMP_MIN: 0,
    RSVR_OIL_TEMP_MAX: 90,
    TANK_OIL_TEMP_MIN: 0,
    TANK_OIL_TEMP_MAX: 90,
  }),
  defaults = Object.freeze({
    rsvrOilTempMajorThreshold: 60,
    rsvrOilTempCriticalThreshold: 75,
    tankOilTempMajorThreshold: 45,
    tankOilTempCriticalThreshold: 55,
  });

class Thresholds {
  static get range() {
    return ranges;
  }

  static get default() {
    return defaults;
  }

  static get INFO_PATH() {
    return "./config/thresholds.json";
  }

  static inRange(data) {
    return (
      this.isInOrder(data.tankOilTempMajorThreshold, data.tankOilTempCriticalThreshold) &&
      this.tankTempInRange(data.tankOilTempMajorThreshold) &&
      this.tankTempInRange(data.tankOilTempCriticalThreshold) &&
      this.isInOrder(data.rsvrOilTempMajorThreshold, data.rsvrOilTempCriticalThreshold) &&
      this.rsvrTempInRange(data.rsvrOilTempMajorThreshold) &&
      this.rsvrTempInRange(data.rsvrOilTempCriticalThreshold)
    );
  }

  static isInOrder(major, critical) {
    return (parseFloat(major) <= parseFloat(critical));
  }

  static tankTempInRange(value) {
    return this.rangeTest(
      value,
      this.range.TANK_OIL_TEMP_MIN,
      this.range.TANK_OIL_TEMP_MAX
    );
  }

  static rsvrTempInRange(value) {
    return this.rangeTest(
      value,
      this.range.RSVR_OIL_TEMP_MIN,
      this.range.RSVR_OIL_TEMP_MAX
    );
  }

  static rangeTest(value, min, max) {
    const num = typeof value === "number" ? value : parseFloat(value);

    if (num === 0 && 1 / num === Number.NEGATIVE_INFINITY) {
      return false;
    }

    return min <= num && num <= max;
  }
}

Object.freeze(Thresholds);

module.exports = Thresholds;
