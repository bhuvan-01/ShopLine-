const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Connect to MongoDB
mongoose
  .connect('mongodb+srv://DATABASE:LEIuni272@products.nlvwxf1.mongodb.net/?retryWrites=true&w=majority')
  .then(() => {
    console.log('Mongodb connected!');
  })
  .catch((err) => {
    console.error(err);
  });

// Routes
app.get('/', (req, res) => res.status(200).send('API is working...'));
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
