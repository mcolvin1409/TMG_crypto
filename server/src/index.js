require("dotenv").config();

const HOST = process.env.APP_URL,
  PORT = process.env.APP_PORT;

const express = require("express"),
  cors = require("cors"),
  bodyParser = require("body-parser"),
  moment = require("moment"),
  winston = require("winston"),
  expressWinston = require("express-winston"),
  myConsoleFormat = winston.format.printf(function (info) {
    return `${
      info.level
    }: ${info.message} (${moment().format("YYYY-MM-DDTHH:mm:ss.SSSZZ")})`;
  }),
  app = express();

// app.js
const swaggerJSDoc = require("swagger-jsdoc"),
  swaggerUi = require("swagger-ui-express"),
  swaggerDefinition = {
    openapi: "3.0.0",
    info: {
      title: "Node RED Crypto Control",
      version: "1.0.0",
      description: "Crypto Control",
      license: {
        name: "Licensed Under MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Joe Moma",
        url: "https://jsonplaceholder.typicode.com",
      },
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Development server",
      },
    ],
  },
  options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ["./routes/slack/*.js"],
  },
  swaggerSpec = swaggerJSDoc(options);

/** ------------------------------------------------------------------
 * Plugins
 * -------------------------------------------------------------------
 */
app.disable("etag");
app.use(cors());
app.use(bodyParser.json());
// LOGGER
app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(winston.format.colorize(), myConsoleFormat),
    meta: false, // optional: control whether you want to log the meta data about the request (default to true)
    msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
    colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
    ignoreRoute: function (req, res) {
      return false;
    }, // optional: allows to skip some log messages based on request and/or response
  })
);

/** ------------------------------------------------------------------
 * Modules (NEEDS TO GO BELOW THE LOGGER ABOVE)
 * -------------------------------------------------------------------
 */
const api = require("../routes");

/** ------------------------------------------------------------------
 * Routes
 * -------------------------------------------------------------------
 */
app.use(api);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/** ------------------------------------------------------------------
 * HTTP Routes
 * -------------------------------------------------------------------
 */
app.get("/", async (req, res) => {
  res.status(200).send(
    `<h3>Welcome to Crypto Core</h3>
    ✨👋🌎🌍🌏✨
    <br>
    <a href="/about">About</a>
    <br>
    <a href="/contact">Contact</a><br>
    <a href="/docs">Docs</a>`
  );
});

// Run App
app.listen(PORT, () => {
  console.log(`>> App listening at ${HOST}:${PORT}`);
});
