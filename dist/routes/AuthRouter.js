"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _AuthController = _interopRequireDefault(require("../controllers/AuthController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const authRouter = _express.default.Router();

const authController = new _AuthController.default();
authRouter.post('/', authController.auth);
authRouter.post('/forgot_password', authController.forgotPassword);
authRouter.post('/reset_password', authController.resetPassword);
var _default = authRouter;
exports.default = _default;