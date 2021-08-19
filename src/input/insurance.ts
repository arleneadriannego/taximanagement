import 'reflect-metadata'
import { IsDate, MinDate } from 'class-validator'
import { Field, InputType } from 'type-graphql'
import { CoverageType } from '../generated/typegraphql-prisma'

const minDate = new Date()
minDate.setFullYear(minDate.getFullYear() + 1)

// custom InsuranceCreateUpdateInput
@InputType()
export class InsuranceCreateUpdateInput {
  @Field(() => String)
  provider!: string

  @Field(() => String)
  policyNumber!: string

  @IsDate()
  @Field(() => Date)
  coverageStartDate!: string

  @IsDate()
  @MinDate(minDate)
  @Field(() => Date)
  coverageEndDate!: string

  @Field(() => CoverageType)
  coverageType!: CoverageType

  @Field(() => [String])
  taxis!: string[]
}
