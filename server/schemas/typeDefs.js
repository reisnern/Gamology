const { gql } = require('apollo-server-express')

const typeDefs = gql`
  type Genre {
    id: ID
    name: String
  }
  type Game {
    id: ID
    name: String
    description: String
    image: String
    quantity: Int
    price: Float
    category: Genre
  }
  input saveGameInput {
    GameId: String
    name: String
    description: String
    genre: String
    image: String
  }
  type User {
    id: ID
    username: String
    email: String
    password: String
    gameCount: Int
    savedGames: [Game]
  }
  type Auth {
    token: ID!
    user: User
  }
  type Order {
    id: ID
    purchaseDate: String
    games: [Game]
  }
  type Checkout {
    foo: String
  }
  type Query {
    me: User
    genre: [Genre]
    categories: [Genre]
    game(id: ID!): Game
    games(genre: ID, name: String): [Game]
    user(username: String!): User
    order(id: ID!): Order
    checkout(games: [ID]!): Checkout
  }
  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    updateUser(username: String, email: String, password: String): User
    addOrder(games: [ID]!): Order
    saveGame(body: saveGameInput): User
    removeGame(gameId: String!): User
  }
`

module.exports = typeDefs
