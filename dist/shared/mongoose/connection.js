"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _mongo = _interopRequireDefault(require("../../config/mongo"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const mongoUserPass = _mongo.default.username ? `${_mongo.default.username}:${_mongo.default.password}` : '';
const mongoURL = `mongodb+srv://${mongoUserPass}${_mongo.default.host}/${_mongo.default.database}?retryWrites=true&w=majority`;

_mongoose.default.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(() => {
  return console.log(`Successfully connected to ${mongoURL}`);
}).catch(error => {
  console.log('Error connecting to database: ', error);
  return process.exit(1);
});