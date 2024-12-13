const express = require('express');
const { getAllUsers, getUserById, updateUser } = require('../controllers/user');
const { verifyToken } = require('../middlewares/auth');
const router = express.Router();

router.get('/', verifyToken, getAllUsers);
router.get('/:id', verifyToken, getUserById);
router.put('/:id', verifyToken, updateUser);

module.exports = router;
