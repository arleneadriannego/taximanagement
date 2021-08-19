import 'reflect-metadata'
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import {
  TaxiDriverMap,
  TaxiDriverMapOrderByInput,
  TaxiDriverMapWhereUniqueInput,
  TaxiDriverMapWhereInput,
  UserRole,
} from '../generated/typegraphql-prisma'
import { Context } from '../context'
import { TaxiDriverMapCreateInput, TaxiDriverMapUpdateInput } from '../input'
import { isDriverScheduled, isTaxiScheduled } from '../utils'

// custom resolver for TaxiDriverMap
@Resolver((of) => TaxiDriverMap)
export class CustomTaxiDriverMapResolver {
  @Authorized([UserRole.SUPER_ADMIN, UserRole.ADMIN])
  @Query((returns) => TaxiDriverMap, { nullable: true })
  async taxiDriverMap(
    @Ctx() { prisma }: Context,
    @Arg('where') where: TaxiDriverMapWhereUniqueInput,
  ): Promise<TaxiDriverMap | null> {
    return await prisma.taxiDriverMap.findUnique({
      where,
    })
  }

  @Authorized([UserRole.SUPER_ADMIN, UserRole.ADMIN])
  @Query((returns) => [TaxiDriverMap])
  async taxiDriverMaps(
    @Ctx() { prisma }: Context,
    @Arg('where', { nullable: true }) where: TaxiDriverMapWhereInput,
    @Arg('orderBy', { nullable: true }) orderBy: TaxiDriverMapOrderByInput,
    @Arg('cursor', { nullable: true }) cursor: TaxiDriverMapWhereUniqueInput,
    @Arg('take', { nullable: true }) take: number,
    @Arg('skip', { nullable: true }) skip?: number,
  ): Promise<TaxiDriverMap[] | null> {
    return await prisma.taxiDriverMap.findMany({
      where,
      orderBy,
      cursor,
      take,
      skip,
    })
  }

  @Authorized([UserRole.SUPER_ADMIN, UserRole.ADMIN])
  @Mutation((returns) => TaxiDriverMap)
  async createTaxiDriverMap(
    @Ctx() context: Context,
    @Arg('data') data: TaxiDriverMapCreateInput,
  ): Promise<TaxiDriverMap> {
    const taxiIsScheduled = await isTaxiScheduled(context, data.taxiId)
    if (taxiIsScheduled) {
      throw Error('Taxi is already scheduled for the day!')
    }

    const driverIsScheduled = await isDriverScheduled(context, data.driverId)
    if (driverIsScheduled) {
      throw Error('Driver is already scheduled for the day!')
    }

    const input = {
      startAt: data.startAt ?? undefined,
      remarks: data.remarks ?? undefined,
      taxi: { connect: { id: data.taxiId } },
      driver: { connect: { id: data.driverId } },
      releaseOfficer: { connect: { id: data.releaseOfficer } },
    }

    try {
      return await context.prisma.taxiDriverMap.create({
        data: input,
      })
    } catch (error) {
      throw error
    }
  }

  @Authorized([UserRole.SUPER_ADMIN, UserRole.ADMIN])
  @Mutation((returns) => TaxiDriverMap)
  async updateTaxiDriverMap(
    @Ctx() { prisma }: Context,
    @Arg('where') where: TaxiDriverMapWhereUniqueInput,
    @Arg('data') data: TaxiDriverMapUpdateInput,
  ): Promise<TaxiDriverMap> {
    if (data.endAt && !data.validatingOfficer) {
      throw Error('Release officer required if driver returns taxi!')
    }

    // TODO: Must fix so that fields not needed to be updated
    // would not be required to update here e.g. set only
    const updateData = {
      startAt: data.startAt,
      remarks: data.remarks ?? undefined,
      driver: data.driverId ? { connect: { id: data.driverId } } : undefined,
      endAt: data.endAt ?? undefined,
      validatingOfficer: { connect: { id: data.validatingOfficer } },
    }

    try {
      return await prisma.taxiDriverMap.update({
        where: {
          id: where!.id,
        },
        data: updateData,
      })
    } catch (error) {
      throw error
    }
  }

  @Authorized([UserRole.SUPER_ADMIN, UserRole.ADMIN])
  @Mutation((returns) => TaxiDriverMap, { nullable: true })
  async deleteTaxiDriverMap(
    @Ctx() { prisma }: Context,
    @Arg('where') where: TaxiDriverMapWhereUniqueInput,
  ): Promise<TaxiDriverMap> {
    try {
      return await prisma.taxiDriverMap.delete({
        where: {
          id: where!.id,
        },
      })
    } catch (error) {
      throw error
    }
  }
}
