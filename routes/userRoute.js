const express = require('express');
const router = express.Router();
const User = require('../Schemas/UserSchema.js');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

router.post('/register', async (req, res) => {
  try {
    // Get user input
    const { firstname, lastname, email, password, phone, address, usertype, boughtProducts } = req.body;

    // Validate user input
    if (!(email && password && firstname && phone && address && usertype)) {
      res.status(400).send("All input is required");
    } else {
      // check if user already exist
      // Validate if user exist in our database
      const oldUser = await User.findOne({ email });

      if (oldUser) {
        return res.status(409).send("Email Already Used. Please try different email.");
      } else {

        // console.log(firstname, lastname, email, password);
        // Encrypt user password
        let encryptedPassword = await bcrypt.hash(password, 10);
        // console.log(firstname, lastname, email, encryptedPassword);

        // Create user in our database
        const user = await User.create({
          firstname,
          lastname,
          email: email.toLowerCase(), // sanitize: convert email to lowercase
          password: encryptedPassword,
          phone,
          address,
          usertype,
          boughtProducts
        });

        // // Create token
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
        // save user token
        user.token = token;

        // // return new user
        res.status(201).json(user);
      }
    }
  } catch (err) {
    res.status(401).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;

      // user
      res.status(200).json(user);
    } else {
      res.status(400).send("Invalid Credentials");
    }
  } catch (err) {
    console.log(err);
    // res.status(401).json(err);
  }
});

router.get('/getUserId/:email', async (req, res) => {
  try {
    const userEmail = req.params.email;
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    } else {
      res.json(user._id);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/getAll', async (req, res) => {
  try {
    const users = await User.find({});
    if (!users) {
      return res.status(404).json({ error: 'No Users' });
    } else {
      res.json(users);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    } else {
      res.json(user);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:userId/products', async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).populate('boughtProducts', '-__v');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    } else {
      res.json(user.boughtProducts);
    }
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
