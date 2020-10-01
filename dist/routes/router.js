"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _UserRouter = _interopRequireDefault(require("./UserRouter"));

var _AuthRouter = _interopRequireDefault(require("./AuthRouter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.use('/user', _UserRouter.default);
router.use('/auth', _AuthRouter.default);
var _default = router;
exports.default = _default;