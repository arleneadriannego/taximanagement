/* eslint-disable @typescript-eslint/no-non-null-assertion */
import dotenv from 'dotenv'
import { resolve } from 'path'

dotenv.config({ path: resolve('.env') })

const { PORT, DATABASE_URL, FIREBASE_CREDENTIALS } = process.env

const config = {
  port: PORT!,
  firebase: {
    key: JSON.parse(
      Buffer.from(FIREBASE_CREDENTIALS!, 'base64').toString('ascii'),
    ),
  },
  databaseUrl: DATABASE_URL!,
}

export default config
