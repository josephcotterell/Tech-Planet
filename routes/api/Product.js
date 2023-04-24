const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// GET-all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.send(products);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error fetching products' });
  }
});

// GET-product by ID
router.get('/products/:id', async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (product) {
        res.send(product);
      } else {
        res.status(404).send({ message: 'Product not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error fetching product' });
    }
});

// POST-create new product
router.post('/products', async (req, res) => {
    try {
      const product = new Product(req.body);
      const newProduct = await product.save();
      res.status(201).send(newProduct);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error creating product' });
    }
});

// PUT-update product by ID
router.put('/products/:id', async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (product) {
        product.name = req.body.name || product.name;
        product.description = req.body.description || product.description;
        product.price = req.body.price || product.price;
        product.imageUrl = req.body.imageUrl || product.imageUrl;
        product.countInStock = req.body.countInStock || product.countInStock;
  
        const updatedProduct = await product.save();
        res.send(updatedProduct);
      } else {
        res.status(404).send({ message: 'Product not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error updating product' });
    }
});

// Delete a product
router.delete('/products/:id', async (req, res) => {
    try {
      const deletedProduct = await Product.findByIdAndDelete(req.params.id);
      if (deletedProduct) {
        res.send({ message: 'Product deleted' });
      } else {
        res.status(404).send({ message: 'Product not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ message:'Error deleting product' });
    }
});

module.exports = router;
