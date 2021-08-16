import { PrismaClient } from '@prisma/client'
import { User } from './generated/typegraphql-prisma'
import { getRequestUser } from './services/firebase'

const prisma = new PrismaClient()

export interface Context {
  prisma: PrismaClient
  req: any
  authId: string
  authEmail: string
  user: User | null
}

export async function createContext(req: any): Promise<Context> {
  const authUser = await getRequestUser(req)

  let user = null
  if (authUser?.authId) {
    user = await prisma.user.findFirst({
      where: {
        authId: authUser?.authId,
      },
    })
  }

  return {
    ...req,
    prisma,
    authId: authUser?.authId ?? null,
    authEmail: authUser?.authEmail ?? null,
    user,
  }
}
