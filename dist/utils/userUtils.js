"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateUserToken = generateUserToken;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _auth = _interopRequireDefault(require("../config/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function generateUserToken(params = {}) {
  return _jsonwebtoken.default.sign(params, _auth.default.secret, {
    expiresIn: 86400
  });
}