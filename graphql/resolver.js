const Product = require('../models/Product');
const User = require('../models/User');
const Order = require('../models/Order');

const resolvers = {
  Query: {
    // retrieve all products
    products: async () => {
      const products = await ProductModel.find();
      return products;
    },
    // retrieve a specific product by ID
    product: async (parent, { id }) => {
      const product = await ProductModel.findById(id);
      return product;
    },
    // retrieve all users
    users: async () => {
      const users = await UserModel.find();
      return users;
    },
    // retrieve a specific user by ID
    user: async (parent, { id }) => {
      const user = await UserModel.findById(id);
      return user;
    },
    // retrieve all orders
    orders: async () => {
      const orders = await OrderModel.find();
      return orders;
    },
    // retrieve a specific order by ID
    order: async (parent, { id }) => {
      const order = await OrderModel.findById(id);
      return order;
    },
  },

  Mutation: {
    // create a new product
    createProduct: async (parent, { input }) => {
      const product = new ProductModel(input);
      await product.save();
      return product;
    },
    // update an existing product
    updateProduct: async (parent, { id, input }) => {
      const product = await ProductModel.findByIdAndUpdate(id, input, { new: true });
      return product;
    },
    // delete a product by ID
    deleteProduct: async (parent, { id }) => {
      const product = await ProductModel.findByIdAndDelete(id);
      return product;
    },
    // create a new user
    createUser: async (parent, { input }) => {
      const user = new UserModel(input);
      await user.save();
      return user;
    },
    // update an existing user
    updateUser: async (parent, { id, input }) => {
      const user = await UserModel.findByIdAndUpdate(id, input, { new: true });
      return user;
    },
    // delete a user by ID
    deleteUser: async (parent, { id }) => {
      const user = await UserModel.findByIdAndDelete(id);
      return user;
    },
    // create a new order
    createOrder: async (parent, { input }) => {
      const order = new OrderModel(input);
      await order.save();
      return order;
    },
    // update an existing order
    updateOrder: async (parent, { id, input }) => {
      const order = await OrderModel.findByIdAndUpdate(id, input, { new: true });
      return order;
    },
    // delete an order by ID
    deleteOrder: async (parent, { id }) => {
      const order = await OrderModel.findByIdAndDelete(id);
      return order;
    },
  },
};

module.exports = resolvers;
