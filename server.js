const express = require("express");
const Product = require("./models/Product");
const User = require("./models/User");
const Order = require("./models/Order");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { graphqlHTTP } = require("express-graphql");
const graphqlSchema = require("./graphql/schema/index");
const graphqlResolver = require("./graphql/resolver/index");

const app = express();

app.use(bodyParser.json());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true,
  })
);

mongoose
  .connect("mongodb://localhost/ecommerce")
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
  });

app.listen(3003, () => {
  console.log("Server started on port 3003");
});
