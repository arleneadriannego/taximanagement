import firebase from 'firebase-admin'
import config from '../config/config'
import { Context } from '../context'
import { User } from '../generated/typegraphql-prisma'

const FIREBASE_KEY = config.firebase.key as firebase.ServiceAccount

interface AuthUser {
  authId: string
  authEmail: string
  user?: User | null
}

export const initialize = (): firebase.app.App => {
  return firebase.initializeApp({
    credential: firebase.credential.cert(FIREBASE_KEY),
    databaseURL: `https://${FIREBASE_KEY.projectId}.firebaseio.com`,
  })
}

/**
 * Gets the user from an express request, this is done
 * via the authorization header, where it gets and verifies
 * the access token if set, otherwise null
 *
 * @param req - a express request object to get the access token from
 */
export const getRequestUser = async (req: any): Promise<AuthUser | null> => {
  const header = req.headers['authorization']
  if (!header || !header.startsWith('Bearer')) {
    return null
  }

  const split = header.split('Bearer ')
  if (split.length !== 2) {
    return null
  }

  const token = split[1]
  try {
    const jwt = await firebase.auth().verifyIdToken(token)
    if (!jwt) {
      return null
    }

    return {
      authId: jwt.uid,
      authEmail: jwt.email!,
    }
  } catch (err) {
    return null
  }
}
