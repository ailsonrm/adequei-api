import jwt from 'jsonwebtoken'
import authConfig from '@config/auth'

export function generateUserToken (params = {}) {
  return jwt.sign(params, authConfig.secret, { expiresIn: 86400 })
}
