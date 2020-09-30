import express from 'express'
import routes from '@routes/Routes'
import '@shared/mongoose/connection'
import cors from 'cors';
import nodemailer from 'nodemailer'

const actuator = require('express-actuator')

const app = express()

app.use(cors());
app.use(actuator())
app.use(express.json())
app.use(routes)
app.use(express.static('views/images')); 

export default app
