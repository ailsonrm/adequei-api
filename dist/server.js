"use strict";

var _app = _interopRequireDefault(require("./app"));

var _dotenv = _interopRequireDefault(require("dotenv"));

require("./shared/mongoose/connection");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

const appHost = process.env.HOST;
const port = process.env.PORT || 3333;

_app.default.listen(port, () => {
  console.log(`⚡️ Server listening on ${appHost}:${port}`);
});