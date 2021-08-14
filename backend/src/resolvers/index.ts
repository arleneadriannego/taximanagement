import {
  // User
  CreateUserResolver,
  UpdateUserResolver,
  FindFirstUserResolver,
  FindManyUserResolver,

  // Taxi
  CreateTaxiResolver,
  UpdateTaxiResolver,
  DeleteTaxiResolver,
  FindFirstTaxiResolver,
  FindManyTaxiResolver,

  // Insurance
  CreateInsuranceResolver,
  UpdateInsuranceResolver,
  DeleteInsuranceResolver,
  FindFirstInsuranceResolver,
  FindManyInsuranceResolver,

  // TaxiDriverMap
  CreateTaxiDriverMapResolver,
  UpdateTaxiDriverMapResolver,
  DeleteTaxiDriverMapResolver,
  FindFirstTaxiDriverMapResolver,
  FindManyTaxiDriverMapResolver,
} from '../generated/typegraphql-prisma'
import { CustomUserResolver } from './user'

export const resolvers = [
  // User
  CustomUserResolver,
  UpdateUserResolver,
  FindFirstUserResolver,
  FindManyUserResolver,

  // Taxi
  CreateTaxiResolver,
  UpdateTaxiResolver,
  DeleteTaxiResolver,
  FindFirstTaxiResolver,
  FindManyTaxiResolver,

  // Insurance
  CreateInsuranceResolver,
  UpdateInsuranceResolver,
  DeleteInsuranceResolver,
  FindFirstInsuranceResolver,
  FindManyInsuranceResolver,

  // TaxiDriverMap
  CreateTaxiDriverMapResolver,
  UpdateTaxiDriverMapResolver,
  DeleteTaxiDriverMapResolver,
  FindFirstTaxiDriverMapResolver,
  FindManyTaxiDriverMapResolver,
] as const
