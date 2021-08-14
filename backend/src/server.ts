import 'reflect-metadata'
import path from 'path'
import { buildSchema } from 'type-graphql'
import { ApolloServer } from 'apollo-server'
import { PrismaClient } from '@prisma/client'
import { PrismaContext } from './context'
import { resolvers } from './resolvers'

async function main() {
  const schema = await buildSchema({
    resolvers,
    emitSchemaFile: path.resolve(__dirname, './generated-schema.graphql'),
    validate: false,
  })

  const prisma = new PrismaClient()
  const server = new ApolloServer({
    schema,
    playground: true,
    context: PrismaContext,
  })
  const { port } = await server.listen(4000)
  console.log(`🚀 Server ready at: http://localhost:4000\n⭐️ `)
}

main().catch(console.error)
