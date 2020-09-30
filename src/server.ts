import app from './app'
import dotenv from 'dotenv'

dotenv.config()

const appHost = process.env.HOST
const port = process.env.PORT || 3333

app.listen(port, () => {
  console.log(`⚡️ Server listening on ${appHost}:${port}`)
})
