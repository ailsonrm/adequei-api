"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _User = _interopRequireDefault(require("../database/schemas/User"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _userUtils = require("../utils/userUtils");

var _crypto = _interopRequireDefault(require("crypto"));

var _mailer = _interopRequireDefault(require("../config/mailer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AuthController {
  async auth(req, res) {
    const {
      email,
      password
    } = req.body;
    const user = await _User.default.findOne({
      email
    }).select('+password');

    if (!user) {
      return res.status(400).send({
        error: 'E-mail ou senha incorretos'
      });
    }

    if (!(await _bcryptjs.default.compare(password, user.password))) {
      return res.status(400).send({
        error: 'E-mail ou senha incorretos'
      });
    }

    if (!user.active) {
      return res.status(400).send({
        error: 'Conta inativa'
      });
    }

    user.password = undefined;
    res.json({
      user,
      token: (0, _userUtils.generateUserToken)({
        id: user.id
      })
    });
  }

  async forgotPassword(req, res) {
    const {
      email
    } = req.body;

    try {
      const user = await _User.default.findOne({
        email
      }).select('+password');

      if (!user) {
        return res.status(400).send({
          error: 'Usuário não encontrado'
        });
      }

      const token = _crypto.default.randomBytes(20).toString('hex');

      const expireTime = new Date();
      expireTime.setHours(expireTime.getHours() + 1);
      await _User.default.findByIdAndUpdate(user.id, {
        $set: {
          passwordResetToken: token,
          passwordResetExpires: expireTime
        }
      });
      const forgotMailInfo = {
        from: 'Adequei <suporte@adequei.com.br>',
        to: email,
        subject: 'Solicitação de recuperação de senha Adequei',
        template: 'forgotPassword',
        context: {
          token,
          email
        }
      };

      _mailer.default.sendMail(forgotMailInfo, error => {
        if (error) {
          console.log('Não foi possível enviar o email de recuperação de senha.');
        }
      });

      return res.send();
    } catch (error) {
      console.log(error);
      res.status(400).json({
        error: 'Erro durante a o processo de recuperação de senha, tente novamente.'
      });
    }
  }

  async resetPassword(req, res) {
    const {
      email,
      token,
      newPassword
    } = req.body;

    try {
      const user = await _User.default.findOne({
        email
      }).select('+passwordResetToken passwordResetExpires');

      if (!user) {
        return res.status(400).send({
          error: 'Usuário não encontrado'
        });
      }

      if (token !== user.passwordResetToken) {
        return res.status(400).send({
          error: 'Token inválido'
        });
      }

      const now = new Date();

      if (now > user.passwordResetExpires) {
        return res.status(400).send({
          error: 'Token expirado, solicite novamente'
        });
      }

      user.password = newPassword;
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save();
      return res.send();
    } catch (error) {
      console.log(error);
      res.status(400).json({
        error: 'Erro durante a o processo de recuperação de senha, tente novamente.'
      });
    }
  }

}

exports.default = AuthController;