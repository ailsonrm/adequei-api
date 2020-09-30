import dotenv from 'dotenv'
import express from 'express'
import routes from './routes/Routes'
import './shared/mongoose/connection'
import cors from 'cors'

const actuator = require('express-actuator')

const app = express()

app.use(cors())
app.use(actuator())
app.use(express.json())
app.use(routes)
app.use(express.static('views/images'))

dotenv.config()

const appHost = process.env.HOST
const port = process.env.PORT || 3333

app.listen(port, () => {
  console.log(`⚡️ Server listening on ${appHost}:${port}`)
})
