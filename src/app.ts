import express from 'express'
import routes from './routes'
const actuator = require('express-actuator')

const app = express()

app.use(actuator())
app.use(express.json())
app.use(routes)

export default app
