import 'reflect-metadata'
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import {
  User,
  UserCreateInput,
  UserRole,
  UserUpdateInput,
  UserWhereUniqueInput,
} from '../generated/typegraphql-prisma'
import { Context } from '../context'

// custom resolver for User
@Resolver((of) => User)
export class CustomUserResolver {
  @Mutation((returns) => User)
  async signUpUser(
    @Ctx() { prisma }: Context,
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

    if (role === UserRole.DRIVER && (!licenseNumber || !licenseExpiry)) {
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

  @Mutation((returns) => User)
  async updateUser(
    @Ctx() { prisma }: Context,
    @Arg('where') where: UserWhereUniqueInput,
    @Arg('data') data: UserUpdateInput,
  ): Promise<User> {
    if (
      data.role?.set === UserRole.DRIVER &&
      (data.licenseNumber?.set === null || data.licenseExpiry?.set === null)
    ) {
      throw Error("Driver's license is required for drivers.")
    }

    try {
      return await prisma.user.update({
        where: {
          id: where!.id,
        },
        data,
      })
    } catch (error) {
      throw error
    }
  }
}
