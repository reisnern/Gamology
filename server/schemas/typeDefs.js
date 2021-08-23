const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Genre {
    _id: ID
    name: String
  }
  type Game {
    _id: ID
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
    _id: ID
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
    _id: ID
    purchaseDate: String
    games: [Game]
  }
  type Query {
    me: User
    categories: [Genre]
    game(_id: ID!): Game
    games(genre: ID, name: String): [Game]
    user(username: String!): User
    order(_id: ID!): Order
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
`;

module.exports = typeDefs;