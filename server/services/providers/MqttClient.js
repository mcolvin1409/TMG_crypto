const MQTT = require("mqtt");

class MqttClient {
  constructor() {
    this.clientId = `mqtt_${Math.random().toString(16).slice(3)}`;
    this.instance = MQTT.connect({
      host: process.env.MQTT_HOST,
      port: process.env.MQTT_PORT,
      username: process.env.MQTT_USERNAME,
      password: process.env.MQTT_PASSWORD,
      rejectUnauthorized: false,
    });
  }
}

module.exports = (new MqttClient()).instance;
