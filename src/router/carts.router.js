const express = require('express');
const router = express.Router();
const cartsController = require('../controllers/CartController.js');

// POST /api/carts/
router.post('/', cartsController.createCart);

// GET /api/carts/:cid
router.get('/:cid', cartsController.getCartById);

// POST /api/carts/:cid/products/:pid
router.post('/:cid/products/:pid', cartsController.addProductToCart);

module.exports = router;