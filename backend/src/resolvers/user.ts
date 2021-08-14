import 'reflect-metadata'
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { User, UserCreateInput, UserRole } from '@generated/type-graphql'
import { Context as PrismaContext } from '../context'

// custom resolver for User
@Resolver((of) => User)
export class CustomUserResolver {
  @Mutation((returns) => UserDb)
  async signUpUser(
    @Ctx() { prisma }: PrismaContext,
    @Arg('data') data: UserCreateInput,
  ): Promise<User> {
    const {
      firstName,
      middleName = undefined,
      lastName = undefined,
      role,
      birthdate = undefined,
      contactNumber,
      emailAddress = undefined,
      licenseNumber = undefined,
      licenseExpiry = undefined,
    } = data

    if (role === UserRole.DRIVER && !licenseNumber && !licenseExpiry) {
      throw Error("Driver's license is required for drivers.")
    }

    try {
      return await prisma.user.create({
        data: {
          firstName,
          middleName,
          lastName,
          role,
          birthdate,
          contactNumber,
          emailAddress,
          licenseNumber,
          licenseExpiry,
        },
      })
    } catch (error) {
      throw error
    }
  }
}
