// Dependencies
import { ApolloServer, makeExecutableSchema } from 'apollo-server'

// Models
import models from './models'

// Types definition and resolvers
import resolvers from '../src/graphql/resolvers'
import typeDefs from '../src/graphql/types'


// Schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

// Apollo server
const apolloServer = new ApolloServer({
  schema,
  context: {
    models
  }
})

// Runnig apollo server
const alter = true
const force = false

models.sequelize.sync({ alter, force }).then(() => {
  apolloServer.listen(5000).then(({ url }) => console.log(`Running on ${url}`))
})
