import 'reflect-metadata'
import { IsDate } from 'class-validator'
import { Field, InputType } from 'type-graphql'

// custom TaxiDriverMap Inputs
@InputType()
export class TaxiDriverMapCreateInput {
  @Field(() => String)
  driverId!: string

  @Field(() => String)
  taxiId!: string

  @IsDate()
  @Field(() => Date)
  startAt: string

  @Field(() => String, { nullable: true })
  remarks: string

  @Field(() => String)
  releaseOfficer!: string
}

@InputType()
export class TaxiDriverMapUpdateInput {
  @Field(() => String, { nullable: true })
  driverId?: string

  @IsDate()
  @Field(() => Date)
  startAt: string

  @IsDate()
  @Field(() => Date)
  endAt: string

  @Field(() => String, { nullable: true })
  remarks: string

  @Field(() => String)
  releaseOfficer!: string

  @Field(() => String)
  validatingOfficer!: string
}
