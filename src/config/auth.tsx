import { config } from 'dotenv'

config()

export default {
  secret: process.env.APP_SECRET || '',
  expiresIn: '1d'
}
