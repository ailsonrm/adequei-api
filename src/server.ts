import app from './app'
import dotenv from 'dotenv'
import '@shared/mongoose/connection'

dotenv.config()

const appHost = process.env.HOST
const port = process.env.PORT

app.listen(port, () => {
  console.log(`⚡️ Server listening on ${appHost}:${port}`)
})
