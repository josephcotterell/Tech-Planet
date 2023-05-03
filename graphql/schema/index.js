const { buildSchema } = require("graphql");

module.exports = buildSchema(`

type Order {
    _id:ID!
    user:User!
    products:[Product!]
    totalAmount:String!
    status:Status!
}

enum Status {
    Delivered
    Pending
    Shipped
}





input OrderInput {
    userId:String!
    products:[String!]
    totalAmount:String!
    status:String!

}


type Product {
    _id:ID!
   name:String!
   description:String!
   price:Int!
   category:String!
   imageUrl:String!
   inventory:String!
    
}


input ProductInput {
    name:String!
    description:String!
    price:Int!
    category:String!
    imageUrl:String!
    inventory:String!
}





type User {
    _id:ID!
    email:String!
    name:String!
    password: String
    role:Role!
}

enum Role {
    Customer
    Admin
}

input UserInput {
    id:String
    email:String!
    name:String!
    password: String
    
}

type RootQuery {
    orders: [Order!]!
    products: [Product!]!
    users:[User!]!
    user(id:String!): User!
}

type RootMutation {
    createOrder(orderInput: OrderInput): Order
    createProduct(productInput: ProductInput): Product
    createUser(userInput:UserInput): User
}
schema {
    query: RootQuery
    mutation: RootMutation 
}

`);
