import express from 'express'
import AuthController from '@controllers/AuthController'

const authRouter = express.Router()
const authController = new AuthController()

authRouter.post('/', authController.auth)
authRouter.post('/forgot_password', authController.forgotPassword)
authRouter.post('/reset_password', authController.resetPassword)

export default authRouter
