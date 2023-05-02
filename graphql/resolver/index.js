const orderResolver = require("./order");
const productResolver = require("./product");

const rootResolver = {
  ...orderResolver,
  ...productResolver,
};

module.exports = rootResolver;
