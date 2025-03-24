const Tag = require("./Tag"),
  Topic = require("./Topic");

class Validators {
  static isValidUrl(url) {
    let valid = true;

    try {
      new URL(`https://${url}`);
    } catch (e) {
      valid = false;
      console.error(`${e.name}: ${e.message}`);
    } finally {
      return valid;
    }
  }
  
  static isValidTopic(subject) {

    return Topic.includes(subject);

  }

  static isValidTag(subject) {

    return Tag.includes(subject);

  }

  static isValidNetwork(data) {

    return (this.validateIPAddress(data.address) &&
      this.validateIPAddress(data.gateway) &&
      this.validateIPAddress(data.dns1) &&
      (!data.dns2 || this.validateIPAddress(data.dns2))
    );

  }
  
  static validateIPAddress(ip) {

    const ipRegex =
      /^(?:(?:25[0-5]|(?:2[0-4]|1\d|[1-9]|)\d)(?:\.(?!$)|$)){4}$/iu,
      [addressWithPort, subnetMask] = ip.split("/", 2),
      [address, ] = addressWithPort.split(":", 2),
      num = parseInt(subnetMask, 10);

    let result = ipRegex.test(address);
    if (!subnetMask) {
      return result;
    } else {
      return result && Number.isFinite(num) && num >= 1 && num <= 32;
    }
    
  }

};

Object.freeze(Validators);

module.exports = Validators;
