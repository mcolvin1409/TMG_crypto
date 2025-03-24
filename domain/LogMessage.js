const LogMessage = {
  MSG_1000: "Cooling system data received",
  MSG_1001: "New Password Created",
  MSG_1002: "Ensure that the System has been generated before initializing the Password",
  MSG_1003: "Password Changed successfully",
  MSG_1004: "Password Confirmed",
  MSG_1005: "Password attempt Failed",
  MSG_1006: "No password found: Factory password initialize required",
  MSG_1007: "Password Creation Failed"
  // ...
};

Object.freeze(LogMessage);

module.exports = { LogMessage };
