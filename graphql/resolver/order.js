const Order = require("../../models/Order");
const User = require("../../models/User");
const Production = require("../../models/Product");
const Product = require("../../models/Product");
const { UserPlus } = require("phosphor-react");

const products = async (productIds) => {
  try {
    const orders = await Product.find({ _id: { $in: productIds } });

    return orders.map((order) => {
      return {
        ...order._doc,
        _id: order.id,
      };
    });
  } catch (err) {
    throw err;
  }
};

const orders = async (ordersIds) => {
  try {
    const orders = await Order.find({ _id: { $in: orderIds } });

    return orders.map((order) => {
      return {
        ...order._doc,
        _id: order.id,
        userId: user.bind(this, order._doc.userId),
        products: products.bind(this, order._doc.products),
      };
    });
  } catch (err) {
    throw err;
  }
};

const user = async (userId) => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      _id: user.id,
    };
  } catch (err) {
    throw err;
  }
};

module.exports = {
  orders: async (args, req) => {
    if (!req.user) {
      throw new Error("Unauthenticated!");
    }

    try {
      const Orders = await Order.find();
      return Orders.map((order) => {
        return {
          ...order._doc,
          _id: order.id,
        };
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
      return (order = {
        ...order._doc,
        _id: order._id.toString(),
        userId: user.bind(this, result._doc.userId),
        products: products.bind(this, result._doc.products),
      });
    } catch (err) {
      throw err;
    }
  },
};
