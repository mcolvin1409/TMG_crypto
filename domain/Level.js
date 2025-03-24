const Level = {
  TRACE:  0,
  DEBUG:  1,
  INFO:   2,
  WARN:   3,
  ERROR:  4,
  FATAL:  5
},
Levels = {};

for (const [key, value] of Object.entries(Level)) {
  Levels[value] = key;
}

Object.freeze(Level);
Object.freeze(Levels);

module.exports = { Level, Levels };
