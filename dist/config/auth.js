"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dotenv = require("dotenv");

(0, _dotenv.config)();
var _default = {
  secret: process.env.APP_SECRET || '',
  expiresIn: '1d'
};
exports.default = _default;