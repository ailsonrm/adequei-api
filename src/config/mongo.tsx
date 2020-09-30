import { config } from 'dotenv'

config()

interface MongoConfig {
    host: string;
    username?: string;
    password?: string;
    database: string
}

export default {
  host: process.env.MONGO_URL || 'localhost',
  username: process.env.MONGO_USER,
  password: process.env.MONGO_PASS,
  database: process.env.MONGO_DB
} as MongoConfig
