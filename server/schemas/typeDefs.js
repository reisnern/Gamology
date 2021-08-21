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
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    orders: [Order]
  }
  type Auth {
    token: ID
    user: User
  }
  type Order {
    _id: ID
    purchaseDate: String
    games: [Game]
  }
  type Query {
    categories: [Genre]
    game(_id: ID!): Game
    games(genre: ID, name: String): [Game]
    user: User
    order(_id: ID!): Order
    checkout(games: [ID]!): Checkout
  }
  type Mutation {
    addUser(userName: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    updateUser(userName: String, email: String, password: String): User
    addOrder(games: [ID]!): Order
  }
`;

module.exports = typeDefs;