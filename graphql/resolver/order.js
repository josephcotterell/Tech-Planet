const Order = require("../../models/Order");
const User = require("../../models/User");
const Production = require("../../models/Product");
const Product = require("../../models/Product");
const { UserPlus } = require("phosphor-react");
const { Reducer } = require("../../utils/graphqlUtls");

module.exports = {
  orders: async (args, req) => {
    if (!req.user) {
      throw new Error("Unauthenticated!");
    }

    try {
      const Orders = await Order.find();
      return Orders.map((order) => {
        return Reducer(Orders);
      });
    } catch (ex) {
      throw new Error(ex);
    }
  },

  createOrder: async (args, req) => {
    if (!req.user) {
      throw new Error("Unauthenticated!");
    }

    const Createorder = await new Order({
      user: req.userId,
      products: args.orderInput.products,
      totalAmount: args.orderInput.totalAmount,
    });

    const result = await Createorder.save();

    try {
      return Reducer(result);
    } catch (err) {
      throw err;
    }
  },
};
