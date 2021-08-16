/* eslint-disable @typescript-eslint/no-non-null-assertion */
import dotenv from 'dotenv'
import { resolve } from 'path'

dotenv.config({ path: resolve('.env') })

const {
  PORT,
  DATABASE_URL,
  FIREBASE_CREDENTIALS_PATH,
} = process.env

const config = {
  port: PORT!,
  firebase: {
    key: FIREBASE_CREDENTIALS_PATH!,
  },
  databaseUrl: DATABASE_URL!,
}

export default config
