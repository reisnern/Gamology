const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const path = require('path')
const cors = require('cors')

// const db = require('./config/connection')
// const { authMiddleware } = require('./utils/auth')
const { resolvers, typeDefs } = require('./schemas')

async function startApolloServer () {
  const app = express()
  app.use(cors())
  const PORT = process.env.PORT || 3001

  const server = new ApolloServer({
    resolvers,
    typeDefs
    // context: authMiddleware
  })

  await server.start()

  server.applyMiddleware({ app })

  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')))
  }

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
  })

  // db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Connected on localhost:${PORT}`)
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`)
  })
  // })
}

startApolloServer()
