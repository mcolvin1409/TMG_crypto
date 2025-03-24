const { Level, Levels } = require("../../domain/Level"),
  { Priority } = require("../../domain/Priority.js");

class LogData {

  constructor(request) {
    this.level = Levels.hasOwnProperty(request.level) ? request.level : Level.ERROR;
    this.priority = request.priority ?? Priority.CRITICAL;
    this.application = request.application ?? "vue";
    this.message = request.message ?? "No Message Supplied";
  }

}

Object.freeze(LogData);

module.exports = LogData;
