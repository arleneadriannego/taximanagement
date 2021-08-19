import 'reflect-metadata'
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import {
  Taxi,
  TaxiCreateInput,
  TaxiOrderByInput,
  TaxiUpdateInput,
  TaxiWhereUniqueInput,
  TaxiWhereInput,
  UserRole,
} from '../generated/typegraphql-prisma'
import { Context } from '../context'
import { isTaxiUnique } from '../utils'

// custom resolver for Taxi
@Resolver((of) => Taxi)
export class CustomTaxiResolver {
  @Authorized()
  @Query((returns) => Taxi, { nullable: true })
  async taxi(
    @Ctx() { prisma }: Context,
    @Arg('where') where: TaxiWhereUniqueInput,
  ): Promise<Taxi | null> {
    return await prisma.taxi.findUnique({
      where,
    })
  }

  @Authorized()
  @Query((returns) => [Taxi])
  async taxis(
    @Ctx() { prisma }: Context,
    @Arg('where', { nullable: true }) where: TaxiWhereInput,
    @Arg('orderBy', { nullable: true }) orderBy: TaxiOrderByInput,
    @Arg('cursor', { nullable: true }) cursor: TaxiWhereUniqueInput,
    @Arg('take', { nullable: true }) take: number,
    @Arg('skip', { nullable: true }) skip?: number,
  ): Promise<Taxi[] | null> {
    return await prisma.taxi.findMany({
      where,
      orderBy,
      cursor,
      take,
      skip,
    })
  }

  @Authorized([UserRole.SUPER_ADMIN, UserRole.ADMIN])
  @Mutation((returns) => Taxi)
  async createTaxi(
    @Ctx() context: Context,
    @Arg('data') data: TaxiCreateInput,
  ): Promise<Taxi> {
    const isUnique = await isTaxiUnique(context, data.bodyNumber)
    if (!isUnique) {
      throw Error('Taxi already exists!')
    }

    try {
      return await context.prisma.taxi.create({
        data,
      })
    } catch (error) {
      throw error
    }
  }

  @Authorized([UserRole.SUPER_ADMIN, UserRole.ADMIN])
  @Mutation((returns) => Taxi)
  async updateTaxi(
    @Ctx() { prisma }: Context,
    @Arg('where') where: TaxiWhereUniqueInput,
    @Arg('data') data: TaxiUpdateInput,
  ): Promise<Taxi> {
    // body number cannot be changed
    delete data.bodyNumber

    try {
      return await prisma.taxi.update({
        where: {
          id: where!.id,
        },
        data,
      })
    } catch (error) {
      throw error
    }
  }

  @Authorized([UserRole.SUPER_ADMIN, UserRole.ADMIN])
  @Mutation((returns) => Taxi, { nullable: true })
  async deleteTaxi(
    @Ctx() { prisma }: Context,
    @Arg('where') where: TaxiWhereUniqueInput,
  ): Promise<Taxi> {
    try {
      return await prisma.taxi.update({
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
