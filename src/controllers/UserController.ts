import { Request, Response } from 'express'
import User from '@database/schemas/User'
import transporter from '@config/mailer'
import validator from 'validator'
import { cpf, cnpj } from 'cpf-cnpj-validator'

const appURL = process.env.APP_URL

export default class UserController {
  async index (req: Request, res: Response) {
    const users = await User.find().select('+password')
    res.json(users)
  };

  async create (req: Request, res: Response) {
    try {
      const newUser = req.body
      const { email, document, password, confirmPassword, acceptTerms } = newUser

      if (!validator.isEmail(email)) {
        return res.status(400).send({ error: 'E-mail inválido' })
      }

      if (await User.findOne({ email })) {
        return res.status(400).send({ error: 'E-mail já cadastrado' })
      }

      const { type, number } = document

      if (type === 'cpf') {
        newUser.companyName = undefined

        if (!cpf.isValid(number)) {
          return res.status(400).send({ error: 'CPF inválido' })
        }
      } else {
        newUser.firstName = undefined
        newUser.lastName = undefined

        if (!cnpj.isValid(number)) {
          return res.status(400).send({ error: 'CNPJ inválido' })
        }
      }

      if (password.length < 8) {
        return res.status(400).send({ error: 'Senha inválida' })
      }

      if (password !== confirmPassword) {
        return res.status(400).send({ error: 'Senhas não coincidem' })
      }

      if (!acceptTerms) {
        return res.status(400).send({ error: 'Termo de serviços deve ser aceito' })
      }

      const userCreated = await User.create(newUser)
      userCreated.password = ''

      const userName = userCreated.document.type === 'cpf' ? userCreated.firstName : userCreated.companyName

      const registeredSuccessfullyMailInfo = {
        from: 'Adequei <suporte@adequei.com.br>',
        to: email,
        subject: 'Obrigado por cadastrar-se na Adequei',
        template: 'registeredSuccessfully',
        context: { appURL, userName }
      }

      transporter.sendMail(registeredSuccessfullyMailInfo, (error) => {
        if (error) {
          return res.status(400).json({ error: 'Não foi possível enviar e-mail de cadastro.' })
        }
      })

      return res.json({
        user: userCreated
      })
    } catch (err) {
      console.log(err)
      return res.status(400).json({ error: 'Erro durante a efetivação do cadastro cadastro' })
    };
  }
}
