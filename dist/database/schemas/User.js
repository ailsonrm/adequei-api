"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const UserSchema = new _mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    required: [function () {
      return this.document.type === 'cpf';
    }]
  },
  lastName: {
    type: String,
    trim: true,
    required: [function () {
      return this.document.type === 'cpf';
    }]
  },
  companyName: {
    type: String,
    trim: true,
    required: [function () {
      return this.document.type !== 'cpf';
    }]
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    unique: true,
    required: true
  },
  document: {
    type: {
      type: String,
      lowercase: true,
      trim: true,
      required: true
    },
    number: {
      type: String,
      trim: true,
      required: true
    }
  },
  phone: {
    ddd: {
      type: Number,
      min: [11, 'DDD Inválido'],
      max: [99, 'DDD Inválido'],
      required: true
    },
    number: {
      type: Number,
      min: [99999999, 'Telefone Inválido'],
      max: [999999999, 'Telefone Inválido'],
      required: true
    }
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  passwordResetToken: {
    type: String,
    select: false
  },
  passwordResetExpires: {
    type: Date,
    select: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});
UserSchema.pre('save', async function (next) {
  if (this.password) {
    this.password = await _bcryptjs.default.hash(this.password, 5);
  }

  if (this.document.number) {
    this.document.number = this.document.number.replace(/[^a-zA-Z 0-9]/g, '');
  }

  next();
});

var _default = _mongoose.default.model('User', UserSchema);

exports.default = _default;