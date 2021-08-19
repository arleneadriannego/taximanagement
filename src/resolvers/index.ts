import { CustomUserResolver } from './user'
import { CustomTaxiResolver } from './taxi'
import { CustomInsuranceResolver } from './insurance'
import { CustomTaxiDriverMapResolver } from './taxiDriverMap'

export const resolvers = [
  CustomUserResolver,
  CustomTaxiResolver,
  CustomInsuranceResolver,
  CustomTaxiDriverMapResolver,
] as const
