const Order = require('../models/Order');
const Product = require('../models/Product');

const createOrder = async (req, res) => {
  const { products } = req.body;
  const userId = req.user._id;

  console.log(userId, req.user);

  try {
    const totalPrice = products.reduce((sum, item) => sum + item.price, 0);

    // Create the order
    const newOrder = new Order({
      user: userId,
      products: products.map((p) => p._id),
      totalPrice,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getOdrers = async (req, res) => {
  const userId = req.user._id;

  try {
    const orders = await Order.find({
      user: userId,
    }).populate('products', '_id title imageUrl brand price');

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  createOrder,
  getOdrers,
};
