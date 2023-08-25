const express = require('express');
const router = express.Router();
const Product = require('../Schemas/ProductSchema');

router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/vegetables', async (req, res) => {
  try {
    const products = await Product.find({"category": "Vegetables"});
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/fruits', async (req, res) => {
  try {
    const products = await Product.find({"category": "Fruits"});
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const products = await Product.findById(req.params.id);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedData = req.body; 
    const updatedProduct = await Product.findByIdAndUpdate(productId, updatedData, {
      new: true,
      runValidators: true 
    });

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


module.exports = router;


