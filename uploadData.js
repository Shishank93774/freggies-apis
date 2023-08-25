const mongoose = require("mongoose");
const { products, users } = require('./data'); 
const Product = require('./Schemas/ProductSchema.js'); 
const User = require('./Schemas/UserSchema.js'); 

const MONGO_URI = 'mongodb+srv://test:test1234@products.h99ubbs.mongodb.net/?retryWrites=true&w=majority'; 

mongoose.connect('mongodb+srv://test:test1234@products.h99ubbs.mongodb.net/?retryWrites=true&w=majority').then(async () => {
  console.log('Connected to MongoDB');

  await Product.insertMany(products);
  console.log('Products data uploaded');

 await User.insertMany(users);
 console.log('Users data uploaded');
  


  mongoose.connection.close();
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

