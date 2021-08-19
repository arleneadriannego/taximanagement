import 'reflect-metadata'
import { IsDate, MinDate } from 'class-validator'
import { Field, InputType } from 'type-graphql'
import { UserRole } from '../generated/typegraphql-prisma'

const minDate = new Date()
minDate.setMonth(minDate.getMonth() + 3)

// custom UserCreateUpdateInput
@InputType()
export class UserCreateUpdateInput {
  @Field(() => String)
  firstName!: string

  @Field(() => String, { nullable: true })
  middleName?: string

  @Field(() => String, { nullable: true })
  lastName?: string

  @Field(() => UserRole)
  role!: UserRole

  @IsDate()
  @Field(() => Date)
  birthdate: Date

  @Field(() => String)
  contactNumber!: string

  @Field(() => String, { nullable: true })
  licenseNumber?: string

  @IsDate()
  @MinDate(minDate)
  @Field(() => Date, { nullable: true })
  licenseExpiry?: string
}
