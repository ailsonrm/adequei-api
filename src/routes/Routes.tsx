import express from 'express'
import userRouter from '@routes/UserRouter'
import authRouter from '@routes/AuthRouter'

const router = express.Router()

router.use('/user', userRouter)
router.use('/auth', authRouter)

export default router
