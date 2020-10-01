"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dotenv = require("dotenv");

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const hbs = require('nodemailer-express-handlebars');

(0, _dotenv.config)();
const smtpHost = process.env.SMTP_HOST;
const smtpPort = Number(process.env.SMTP_PORT);
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const options = {
  viewEngine: {
    partialsDir: _path.default.resolve('./views/partials'),
    layoutsDir: _path.default.resolve('./views/layouts'),
    extname: '.hbs'
  },
  extName: '.hbs',
  viewPath: 'views'
};

const transporter = _nodemailer.default.createTransport({
  host: smtpHost,
  port: smtpPort,
  auth: {
    user: smtpUser,
    pass: smtpPass
  }
});

transporter.use('compile', hbs(options));
var _default = transporter;
exports.default = _default;