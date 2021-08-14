import {
  // User
  CreateUserResolver,
  UpdateUserResolver,
  FindFirstUserResolver,
  FindManyUserResolver,
  UserCrudResolver,

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
} from '@generated/type-graphql'

export const resolvers = [
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
] as const
