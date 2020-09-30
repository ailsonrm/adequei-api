import { config } from 'dotenv'
import nodemailer from 'nodemailer'
import path from 'path'
const hbs = require('nodemailer-express-handlebars')

config()

const smtpHost = process.env.SMTP_HOST
const smtpPort = Number(process.env.SMTP_PORT)
const smtpUser = process.env.SMTP_USER
const smtpPass = process.env.SMTP_PASS

const options = {
  viewEngine: {
    partialsDir: path.resolve('./views/partials'),
    layoutsDir: path.resolve('./views/layouts'),
    extname: '.hbs'
  },
  extName: '.hbs',
  viewPath: 'views'
}

const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  auth: {
    user: smtpUser,
    pass: smtpPass
  }
})

transporter.use('compile', hbs(options))

export default transporter
