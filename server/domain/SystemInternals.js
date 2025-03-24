/**
 * Products:
 *
 * CryptoCorePROTO: 8,
 * CryptoCore140:   9,
 * CryptoCore200:   10,
 * ComputeCore:     11
 */

const SystemInternals = { 
  "8":  {"water": "Max EWT 33°C / Min Flow Rate 70 GPM", "electric": "415 VAC 3P N + G 225A"},
  "9":  {"water": "Max EWT 33°C / Min Flow Rate 70 GPM", "electric": "415 VAC 3P N + G 250A"},
  "10": {"water": "Max EWT 33°C / Min Flow Rate 70 GPM", "electric": "415 VAC 3P N + G 350A"},
  "11": {"water": "Max EWT 33°C / Min Flow Rate 70 GPM", "electric": "415 VAC 3P N + G 225A"},
};

Object.freeze(SystemInternals);

module.exports = SystemInternals;
