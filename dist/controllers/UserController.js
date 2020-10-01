"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _User = _interopRequireDefault(require("../database/schemas/User"));

var _mailer = _interopRequireDefault(require("../config/mailer"));

var _validator = _interopRequireDefault(require("validator"));

var _cpfCnpjValidator = require("cpf-cnpj-validator");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserController {
  async index(req, res) {
    const users = await _User.default.find().select('+password');
    res.json(users);
  }

  async create(req, res) {
    try {
      const newUser = req.body;
      const {
        email,
        document,
        password,
        confirmPassword
      } = newUser;

      if (!_validator.default.isEmail(email)) {
        return res.status(400).send({
          error: 'E-mail inválido'
        });
      }

      if (await _User.default.findOne({
        email
      })) {
        return res.status(400).send({
          error: 'E-mail já cadastrado'
        });
      }

      const {
        type,
        number
      } = document;

      if (type === 'cpf') {
        newUser.companyName = undefined;

        if (!_cpfCnpjValidator.cpf.isValid(number)) {
          return res.status(400).send({
            error: 'CPF inválido'
          });
        }
      } else {
        newUser.firstName = undefined;
        newUser.lastName = undefined;

        if (!_cpfCnpjValidator.cnpj.isValid(number)) {
          return res.status(400).send({
            error: 'CNPJ inválido'
          });
        }
      }

      if (password.length < 8) {
        return res.status(400).send({
          error: 'Senha inválida'
        });
      }

      if (password !== confirmPassword) {
        return res.status(400).send({
          error: 'Senhas não coincidem'
        });
      }

      const userCreated = await _User.default.create(newUser);
      userCreated.password = undefined;
      const userName = userCreated.document.type === 'cpf' ? userCreated.firstName : userCreated.companyName;
      const registeredSuccessfullyMailInfo = {
        from: 'Adequei <suporte@adequei.com.br>',
        to: email,
        subject: 'Obrigado por cadastrar-se na Adequei',
        template: 'registeredSuccessfully',
        context: {
          userName
        }
      };

      _mailer.default.sendMail(registeredSuccessfullyMailInfo, error => {
        if (error) {
          return res.status(400).json({
            error: 'Não foi possível enviar e-mail de cadastro.'
          });
        }
      });

      return res.json({
        user: userCreated
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        error: 'Erro durante a efetivação do cadastro cadastro'
      });
    }

    ;
  }

}

exports.default = UserController;