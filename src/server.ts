import app from './app'
import dotenv from 'dotenv'

dotenv.config()

const appHost = process.env.HOST
const port = process.env.PORT || 3333

app.listen(process.env.PORT || 3000, () => {
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  console.log(`⚡️ Server listening on ${appHost}:${port}`)
})
