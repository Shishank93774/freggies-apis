const express = require('express');
const router = express.Router();
const User = require('../Schemas/UserSchema.js');


router.get('/:id', async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await User.findById(userId);
      
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }  
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.post('/', async (req, res) => {
    try {
      const newUser = new User(req.body);
      await newUser.save();
      res.status(201).json(newUser);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  router.get('/:userId/products', async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await User.findById(userId).populate('boughtProducts', '-__v');
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.json(user.boughtProducts);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  router.patch('/:id', async (req, res) => {
    try {
      const userId = req.params.id;
      const updatedData = req.body; 
      const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
        new: true,
        runValidators: true 
      });
  
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.json(updatedUser);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
module.exports = router;
