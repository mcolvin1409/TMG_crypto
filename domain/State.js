const State = {
  ALARM_OFF:      0,
  ALARM_INFO:     1,
  ALARM_TRIPPED:  2,
  ALARM_MINOR:    3,
  ALARM_MAJOR:    4,
  ALARM_CRITICAL: 5,
  ALARM_ON:       6,
  POWER_OFF:      10,
  POWER_ON:       11
};

Object.freeze(State);

module.exports = State;
