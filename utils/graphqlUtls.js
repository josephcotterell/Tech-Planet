const userHandler = async (newUser) => {
  return { ...newUser._doc, _id: newUser.id, password: null };
};

const user = async (userId) => {
  const isuser = await User.findById(userId);

  try {
    isuser.map((user) => {
      return {
        ...user._doc,
        _id: user.id,
      };
    });
  } catch (err) {
    throw err;
  }
};

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

const Reducer = async (resolver) => {
  return {
    ...product._doc,
    _id: product._id.toString(),
    userId: user.bind(this, product._doc.userId),
    products: products.bind(this, result._doc.products),
  };
};

exports.userHandler = userHandler;
exports.Reducer = Reducer;
