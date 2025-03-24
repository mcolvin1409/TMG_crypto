const Tag = {
  ALARM_THRESHOLDS:         "sensors:alarms:thresholds",
  OIL_LEVEL_LOW:            "sensor:oilLevelLow",
  PDU_POWER_STATE:          "pdu:power:state",
  RSVR_OIL_TEMP:            "sensor:rsvrOilTemp",
  TANK_OIL_TEMP:            "sensor:tankOilTemp",
  SYSTEM_NTP_SERVERS:       "system:ntp",
  NETWORK_SETTINGS:         "network:settings",
  HEALTH_IA_HAT_VERSION:    "system:health:iaHatVersion",
  HEALTH_RTD_HAT_VERSION:   "system:health:rtdHatVersion",
  HEALTH_CPU_BOARD_VOLTAGE: "system:health:controlIoCpuBoardVoltage",
  HEALTH_BOARD_VOLTAGE:     "system:health:controlIoBoardVoltage",
  HEALTH_CPU_TEMPERATURE:   "system:health:controlIoCpuTemperature",
  HEALTH_TOTAL_MEMORY:      "system:health:totalSystemMemory",
  HEALTH_FREE_MEMORY:       "system:health:freeSystemMemory",
  HEALTH_TOTAL_STORAGE:     "system:health:totalSystemStorage",
  HEALTH_FREE_STORAGE:      "system:health:freeSystemStorage"
},
  values = Object.values(Tag);

Object.defineProperty(Tag, "includes", {
  configurable: false,
  enumerable: false,
  writable: false,
  value: (tag) => values.includes(tag)
});

Object.freeze(Tag);

module.exports = Tag;
