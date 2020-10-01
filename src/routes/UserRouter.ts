import express from 'express'
import UserController from '@controllers/UserController'

const userRouter = express.Router()
const userController = new UserController()

userRouter.get('/', userController.index)
userRouter.post('/register', userController.create)

export default userRouter
