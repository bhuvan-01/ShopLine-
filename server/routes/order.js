const express = require('express');
const { createOrder, getOdrers } = require('../controllers/order');
const { verifyToken } = require('../middlewares/auth');
const router = express.Router();

router.post('/', verifyToken, createOrder);
router.get('/', verifyToken, getOdrers);

module.exports = router;
