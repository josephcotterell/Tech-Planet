const Product = require("../../models/Product");
const { Reducer } = require("../../utils/graphqlUtls");

module.exports = {
  products: async (args, req) => {
    if (!req.user) {
      throw new Error("Unauthenticated!");
    }

    try {
      const product = await Product.find();
      return product.map((order) => {
        return {
          ...product._doc,
          _id: product.id,
        };
      });
    } catch (ex) {
      throw new Error(ex);
    }
  },

  createProduct: async (args, req) => {
    if (!req.user) {
      throw new Error("Unauthenticated!");
    }

    const CreateProduct = await new Product({
      name: args.productInput.name,
      description: args.productInput.description,
      price: args.productInput.price,
      category: args.productInput.category,
      imageUrl: args.productInput.imageUrl,
      inventory: args.productInput.inventory,
    });

    const result = await CreateProduct.save();

    try {
      return {
        ...result._doc,
        _id: result.id,
      };
    } catch (err) {
      throw err;
    }
  },
};
