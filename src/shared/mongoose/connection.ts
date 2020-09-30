import mongoose from 'mongoose'
import mongoConfig from '@config/mongo'

const mongoUserPass = mongoConfig.username
  ? `${mongoConfig.username}:${mongoConfig.password}`
  : ''

const mongoURL = `mongodb+srv://${mongoUserPass}${mongoConfig.host}/${mongoConfig.database}?retryWrites=true&w=majority`

// console.log(mongoURL)

mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    return console.log(`Successfully connected to ${mongoURL}`)
  })
  .catch(error => {
    console.log('Error connecting to database: ', error)
    return process.exit(1)
  })
