import { AuthChecker } from 'type-graphql'
import { AuthenticationError } from 'apollo-server-express'
import { Context } from '../context'
import { UserRole } from '../generated/typegraphql-prisma'

export const authChecker: AuthChecker<Context> = async ({ context }, roles) => {
  const user = context.user
  // check if valid user
  if (user == null) {
    throw new AuthenticationError(
      'Access denied! You need to be authorized to perform this action!',
    )
  }

  // let super admins pass any authentication checks
  if (user.role == UserRole.SUPER_ADMIN) {
    return true
  }

  // check if the user has one of the roles required (or if no roles are required)
  if (roles.indexOf(user.role) >= 0 || roles.length == 0) {
    return true
  }

  throw new AuthenticationError(
    'Access denied! You need to be authorized to perform this action!',
  )
}
