import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import { ApolloServer } from 'apollo-server'
import { createContext } from './context'
import { authChecker } from './middleware/authChecker'
import { initialize } from './services/firebase'
import { resolvers } from './resolvers'

const main = async () => {
  // initialize firebase application (only used for authenticating users)
  initialize()

  const schema = await buildSchema({
    resolvers,
    authChecker,
  })

  const server = new ApolloServer({
    schema,
    playground: true,
    context: ({ req }) => createContext(req),
  })
  const { port } = await server.listen(4000)
  console.log(`🚀 Server ready at: http://localhost:4000\n⭐️ `)
}

main().catch(console.error)
