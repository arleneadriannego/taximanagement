import 'reflect-metadata'
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import {
  User,
  UserOrderByInput,
  UserRole,
  UserWhereUniqueInput,
  UserWhereInput,
} from '../generated/typegraphql-prisma'
import { Context } from '../context'
import { UserCreateUpdateInput } from '../input'

// custom resolver for User
@Resolver((of) => User)
export class CustomUserResolver {
  @Authorized()
  @Query((returns) => User, { nullable: true })
  async user(
    @Ctx() { prisma, user }: Context,
    @Arg('where') where: UserWhereUniqueInput,
  ): Promise<User | null> {
    if (user!.role === UserRole.DRIVER && user!.id !== where!.id) {
      throw Error('Record not found!')
    }

    return await prisma.user.findUnique({
      where,
    })
  }

  @Authorized([UserRole.SUPER_ADMIN, UserRole.ADMIN])
  @Query((returns) => [User])
  async users(
    @Ctx() { prisma }: Context,
    @Arg('where', { nullable: true }) where: UserWhereInput,
    @Arg('orderBy', { nullable: true }) orderBy: UserOrderByInput,
    @Arg('cursor', { nullable: true }) cursor: UserWhereUniqueInput,
    @Arg('take', { nullable: true }) take: number,
    @Arg('skip', { nullable: true }) skip?: number,
  ): Promise<User[] | null> {
    return await prisma.user.findMany({
      where,
      orderBy,
      cursor,
      take,
      skip,
    })
  }

  @Mutation((returns) => User)
  async signUpUser(
    @Ctx() { prisma, authId, authEmail, user }: Context,
    @Arg('data') data: UserCreateUpdateInput,
  ): Promise<User> {
    const {
      firstName,
      middleName = undefined,
      lastName = undefined,
      role,
      birthdate = undefined,
      contactNumber,
      licenseNumber = undefined,
      licenseExpiry = undefined,
    } = data

    if (!authId || !authEmail) {
      throw Error('Please log in/sign up')
    }

    if (user && user.id) {
      throw Error('User already exists!')
    }

    if (role === UserRole.DRIVER && (!licenseNumber || !licenseExpiry)) {
      throw Error("Driver's license is required for drivers.")
    }

    const userData = {
      authId,
      firstName,
      middleName,
      lastName,
      role,
      birthdate,
      emailAddress: authEmail,
      contactNumber,
      licenseNumber,
      licenseExpiry,
    }

    try {
      return await prisma.user.create({
        data: userData,
      })
    } catch (error) {
      throw error
    }
  }

  @Authorized()
  @Mutation((returns) => User)
  async updateUser(
    @Ctx() { prisma, user }: Context,
    @Arg('where') where: UserWhereUniqueInput,
    @Arg('data') data: UserCreateUpdateInput,
  ): Promise<User> {
    if (
      data.role === UserRole.DRIVER &&
      (data.licenseNumber === null || data.licenseExpiry === null)
    ) {
      throw Error("Driver's license is required for drivers.")
    }

    if (!user) {
      throw Error('User does not exist!')
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

  @Authorized([UserRole.SUPER_ADMIN])
  @Mutation((returns) => User, { nullable: true })
  async setUserToInactive(
    @Ctx() { prisma }: Context,
    @Arg('where') where: UserWhereUniqueInput,
  ): Promise<User> {
    try {
      return await prisma.user.update({
        where: {
          id: where!.id,
        },
        data: {
          isActive: false,
        },
      })
    } catch (error) {
      throw error
    }
  }
}
