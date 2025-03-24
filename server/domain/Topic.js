const Topic = { 
  ALARM_THRESHOLDS:   "sensors/alarms/thresholds",
  OIL_LEVEL_LOW:      "sensors/oilLevelLow",
  PDU_POWER_STATE:    "pdu/power/state",
  RSVR_OIL_TEMP:      "sensors/rsvrOilTemp",
  TANK_OIL_TEMP:      "sensors/tankOilTemp",
  SYSTEM_NTP_SERVERS: "system/ntp",
  NETWORK_SETTINGS:   "network/settings",
  ALARM_LOG:          "logging/alarm",
  AUDIT_LOG:          "logging/audit",
  ERROR_LOG:          "logging/error",
  SECURITY_LOG:       "logging/security"
},
  values = Object.values(Topic);

Object.defineProperty(Topic, "includes", {
  configurable: false,
  enumerable: false,
  writable: false,
  value: (topic) => values.includes(topic)
});

Object.freeze(Topic);

module.exports = Topic;
