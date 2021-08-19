import 'reflect-metadata'
import _ from 'lodash'
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import {
  Insurance,
  InsuranceOrderByInput,
  InsuranceWhereUniqueInput,
  InsuranceWhereInput,
  UserRole,
} from '../generated/typegraphql-prisma'
import { CustomInsurance } from '../schema'
import { Context } from '../context'
import { InsuranceCreateUpdateInput } from '../input'

// custom resolver for Insurance
@Resolver((of) => CustomInsurance)
export class CustomInsuranceResolver {
  @Authorized([UserRole.SUPER_ADMIN, UserRole.ADMIN])
  @Query((returns) => CustomInsurance, { nullable: true })
  async insurance(
    @Ctx() { prisma }: Context,
    @Arg('where') where: InsuranceWhereUniqueInput,
  ): Promise<CustomInsurance | null> {
    const insurance = await prisma.insurance.findUnique({
      where,
      include: {
        taxis: true,
      },
    })

    console.log(insurance)

    return insurance
  }

  @Authorized([UserRole.SUPER_ADMIN, UserRole.ADMIN])
  @Query((returns) => [CustomInsurance])
  async insurances(
    @Ctx() { prisma }: Context,
    @Arg('where', { nullable: true }) where: InsuranceWhereInput,
    @Arg('orderBy', { nullable: true }) orderBy: InsuranceOrderByInput,
    @Arg('cursor', { nullable: true }) cursor: InsuranceWhereUniqueInput,
    @Arg('take', { nullable: true }) take: number,
    @Arg('skip', { nullable: true }) skip?: number,
  ): Promise<CustomInsurance[] | null> {
    return await prisma.insurance.findMany({
      where,
      orderBy,
      cursor,
      take,
      skip,
      include: {
        taxis: true,
      },
    })
  }

  @Authorized([UserRole.SUPER_ADMIN, UserRole.ADMIN])
  @Mutation((returns) => CustomInsurance)
  async createInsurance(
    @Ctx() { prisma }: Context,
    @Arg('data') data: InsuranceCreateUpdateInput,
  ): Promise<CustomInsurance> {
    // TODO: Prevent taxi to be assigned to another
    // insurance unless insurance is expired /
    // 1 insurance per taxi only
    const input: any = Object.assign({}, data)
    if (input.taxis && input.taxis.length) {
      input.taxis = {
        connect: _.map(data.taxis, function (item) {
          return {
            id: item,
          }
        }),
      }
    }

    try {
      return await prisma.insurance.create({
        data: input,
        include: {
          taxis: true,
        },
      })
    } catch (error) {
      throw error
    }
  }

  @Authorized([UserRole.SUPER_ADMIN, UserRole.ADMIN])
  @Mutation((returns) => CustomInsurance)
  async updateInsurance(
    @Ctx() { prisma }: Context,
    @Arg('where') where: InsuranceWhereUniqueInput,
    @Arg('data') data: InsuranceCreateUpdateInput,
  ): Promise<CustomInsurance> {
    const input: any = Object.assign({}, data)
    input.taxis = {
      connect: _.map(data.taxis, function (item) {
        return {
          id: item,
        }
      }),
    }

    try {
      return await prisma.insurance.update({
        where: {
          id: where!.id,
        },
        data: input,
        include: {
          taxis: true,
        },
      })
    } catch (error) {
      throw error
    }
  }

  @Authorized([UserRole.SUPER_ADMIN, UserRole.ADMIN])
  @Mutation((returns) => CustomInsurance, { nullable: true })
  async deleteInsurance(
    @Ctx() { prisma }: Context,
    @Arg('where') where: InsuranceWhereUniqueInput,
  ): Promise<CustomInsurance> {
    try {
      return await prisma.insurance.update({
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
