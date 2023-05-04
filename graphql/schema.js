const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Product {
    id: ID!
    name: String!
    description: String!
    price: Float!
    image: String
  }

  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
  }

  type Order {
    id: ID!
    user: User!
    products: [Product!]!
    total: Float!
    status: String!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    products: [Product!]!
    product(id: ID!): Product!
    users: [User!]!
    user(id: ID!): User!
    orders: [Order!]!
    order(id: ID!): Order!
  }

  type Mutation {
    createProduct(name: String!, description: String!, price: Float!, image: String): Product!
    updateProduct(id: ID!, name: String, description: String, price: Float, image: String): Product!
    deleteProduct(id: ID!): Product!
    createUser(name: String!, email: String!, password: String!): User!
    updateUser(id: ID!, name: String, email: String, password: String): User!
    deleteUser(id: ID!): User!
    createOrder(userId: ID!, products: [ID!]!, total: Float!): Order!
    updateOrder(id: ID!, status: String!): Order!
    deleteOrder(id: ID!): Order!
  }
`;

module.exports = typeDefs;
