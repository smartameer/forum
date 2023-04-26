import fs from 'fs'
import path from 'path'
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { PrismaClient } from '@prisma/client'

import { getUserId } from './src/utils.js'
import { resolvers } from './src/resolvers.js'

const prisma = new PrismaClient()
const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join('app/src', 'schema.gql'), 'utf8'),
  resolvers,
})

const { url } = await startStandaloneServer(server, {
  context: ({ req }) => {
    return {
      ...req,
      prisma,
      userId: req && req.headers.authorization ? getUserId(req) : null,
    }
  },
  listen: { port: 4000 },
})

console.log(`🚀  Server ready at: ${url}`)
