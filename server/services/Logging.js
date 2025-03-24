require("dotenv").config();

const LogData = require("../domain/LogData.js"),
  Throttle = require("../domain/LogThrottle.js"),
  Topic = require("../domain/Topic.js"),
  MessageService = require("./Message.js"),
  { Priority } = require("../../domain/Priority.js"),
  { LogMessage } = require("../../domain/LogMessage.js"),
  { Level, Levels } = require("../../domain/Level");

const SECURE_LOG = "/home/tmg/crypto-control/logs/security.log",
  ALARM_LOG = "/home/tmg/crypto-control/logs/alarm.log",
  AUDIT_LOG = "/home/tmg/crypto-control/logs/audit.log",
  ERROR_LOG = "/home/tmg/crypto-control/logs/error.log";

class LoggingService {

  static CURRENT_LEVEL;
  // static messages;

  constructor() {
    // this.messages = LogMessage;
    this.logger = new MessageService();
    this.CURRENT_LEVEL = process.env.LOG_LEVEL ?? Level.INFO;    
  } 

  levels() {
    return Level;
  }

  level(level) {
    return Levels[level];
  }

  priorities() {
    return Priority;
  }

  messages() {
    return LogMessage;
  }

  createLogData(data) {
    return new LogData(data);
  }

  log(topic, payload, throttle = 0) {

    delete payload.topic;

    switch (topic) {
      case Topic.ALARM_LOG:
        this.alarm(payload.level, payload, throttle);
        break;
      case Topic.AUDIT_LOG:
        this.audit(payload.level, payload, throttle);
        break;
      case Topic.SECURITY_LOG:
        this.security(payload.level, payload, throttle);
        break;
      case Topic.ERROR_LOG:
        this.error(payload.level, payload, throttle);
        break;
      default:
        this.error(payload.level, payload, throttle);
    }            
  }

  alarm(level, value, throttle = 0) {

    if (level < this.CURRENT_LEVEL) { return; }

    let logTopic = Topic.ALARM_LOG + "/" + this.level(level);
    value.level = this.level(level); 
    this.logger.log(logTopic, JSON.stringify(value));

  }

  audit(level, value, throttle = 0) {

    if (level < this.CURRENT_LEVEL) { return; }

    let logTopic = Topic.AUDIT_LOG + "/" + this.level(level);
    value.level = this.level(level); 
    this.logger.log(logTopic, JSON.stringify(value));

  }

  security(level, value, throttle = 0) {

    if (level < this.CURRENT_LEVEL) { return; }
    
    let logTopic = Topic.SECURITY_LOG + "/" + this.level(level);
    value.level = this.level(level); 
    this.logger.log(logTopic, JSON.stringify(value));

  }

  error(level, value, throttle = 0) {

    if (level < this.CURRENT_LEVEL) { return; }
    
    let logTopic = Topic.ERROR_LOG + "/" + this.level(level);
    value.level = this.level(level); 
    this.logger.log(logTopic, JSON.stringify(value));

  } 

}

module.exports = LoggingService;
