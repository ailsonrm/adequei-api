"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _router = _interopRequireDefault(require("./routes/router"));

var _cors = _interopRequireDefault(require("cors"));

var _expressActuator = _interopRequireDefault(require("express-actuator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
app.use((0, _cors.default)());
app.use((0, _expressActuator.default)());
app.use(_express.default.json());
app.use(_router.default);
app.use(_express.default.static('views/images'));
var _default = app;
exports.default = _default;