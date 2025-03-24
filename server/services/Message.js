//  requires the MqttClient Singleton Object
const MessageClient = require("./providers/MqttClient");

class Message {
  constructor() {
    this.client = MessageClient;
  }

  publish(topic, message) {
    try {

      this.client.publish(topic, message, { qos: 0, retain: false }, (error) => {
        if (error) {
          console.error(error);
        }
      });

    } catch (e) {
      throw new Error(e);
    }
  }

  log(topic, message) {
    this.publish(topic, message);
  }

}

module.exports = Message;
