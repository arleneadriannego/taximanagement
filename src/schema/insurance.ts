import 'reflect-metadata'
import { IsDate, MinDate } from 'class-validator'
import { Field, InputType, ObjectType } from 'type-graphql'
import { CoverageType, Insurance, Taxi } from '../generated/typegraphql-prisma'

const minDate = new Date()
minDate.setFullYear(minDate.getFullYear() + 1)

// custom InsuranceCreateUpdateInput
@ObjectType()
export class CustomInsurance extends Insurance {
  @Field(() => [Taxi], { nullable: true })
  taxis?: Taxi[]
}
