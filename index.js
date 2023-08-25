const express =  require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoute');
const cors = require('cors');
const userRoutes = require('./routes/userRoute');

const app = express();
const PORT = process.env.PORT || 3001;
const MONGO_URI = 'mongodb+srv://test:test1234@products.h99ubbs.mongodb.net/?retryWrites=true&w=majority';
app.use(cors());

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
