import { CustomUserResolver } from './user'

export const resolvers = [
  // User
  CustomUserResolver,
] as const
