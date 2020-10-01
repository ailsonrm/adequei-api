import { Request, Response } from 'express'
import User from '@database/schemas/User'
import bcrypt from 'bcryptjs'
import { generateUserToken } from '@utils/userUtils'
import crypto from 'crypto'
import transporter from '@config/mailer'

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || ''

export default class AuthController {
  async auth (req: Request, res: Response) {
    const { email, password } = req.body

    const user = await User.findOne({ email }).select('+password')

    if (!user) {
      return res.status(400).send({ error: 'E-mail ou senha incorretos' })
    }

    if (!await bcrypt.compare(password, user.password)) {
      return res.status(400).send({ error: 'E-mail ou senha incorretos' })
    };

    if (!user.active) {
      return res.status(400).send({ error: 'Conta inativa' })
    }

    user.password = undefined

    res.json({
      user,
      token: generateUserToken({ id: user.id })
    })
  }

  async forgotPassword (req: Request, res: Response) {
    const { email } = req.body

    try {
      const user = await User.findOne({ email }).select('+password')

      if (!user) {
        return res.status(400).send({ error: 'Usuário não encontrado' })
      }

      const token = crypto.randomBytes(20).toString('hex')
      const expireTime = new Date()
      expireTime.setHours(expireTime.getHours() + 1)

      await User.findByIdAndUpdate(user.id, {
        $set: {
          passwordResetToken: token,
          passwordResetExpires: expireTime
        }
      })

      const forgotMailInfo = {
        from: 'Adequei <suporte@adequei.com.br>',
        to: email,
        subject: 'Solicitação de recuperação de senha Adequei',
        template: 'forgotPassword',
        context: { apiBaseUrl, token, email }
      }

      transporter.sendMail(forgotMailInfo, (error) => {
        if (error) {
          console.log('Não foi possível enviar o email de recuperação de senha.')
        }
      })

      return res.send()
    } catch (error) {
      console.log(error)
      res.status(400).json({ error: 'Erro durante a o processo de recuperação de senha, tente novamente.' })
    }
  }

  async resetPassword (req: Request, res: Response) {
    const { email, token, newPassword } = req.body

    try {
      const user = await User.findOne({ email })
        .select('+passwordResetToken passwordResetExpires')

      if (!user) {
        return res.status(400).send({ error: 'Usuário não encontrado' })
      }

      if (token !== user.passwordResetToken) {
        return res.status(400).send({ error: 'Token inválido' })
      }

      const now = new Date()

      if (now > user.passwordResetExpires) {
        return res.status(400).send({ error: 'Token expirado, solicite novamente' })
      }

      user.password = newPassword
      user.passwordResetToken = undefined
      user.passwordResetExpires = undefined
      await user.save()

      return res.send()
    } catch (error) {
      console.log(error)
      res.status(400).json({ error: 'Erro durante a o processo de recuperação de senha, tente novamente.' })
    }
  }
}
