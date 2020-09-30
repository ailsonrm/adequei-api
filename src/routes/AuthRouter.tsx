import express from 'express'
import AuthController from '@controllers/AuthController'

const authRouter = express.Router()
const authController = new AuthController()

// authRouter.use(ensureAuthenticated);

// import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

authRouter.post('/', authController.auth)
authRouter.post('/forgot_password', authController.forgot_password)
authRouter.post('/reset_password', authController.reset_password)

export default authRouter
