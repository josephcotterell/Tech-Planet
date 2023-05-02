const Product = require("../../models/Product");

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
      return (product = {
        ...product._doc,
        _id: product._id.toString(),
        userId: user.bind(this, product._doc.userId),
        products: products.bind(this, result._doc.products),
      });
    } catch (err) {
      throw err;
    }
  },
};
