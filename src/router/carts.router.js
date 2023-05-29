const express = require('express');
const router = express.Router();
const cartsController = require('../controllers/CartController.js');

// POST /api/carts/
router.post('/', cartsController.createCart);

// GET /api/carts/:cid
router.get('/:cid', cartsController.getCartById);

// POST /api/carts/:cid/products/:pid
router.post('/:cid/products/:pid', cartsController.addProductToCart);

// DELETE /api/carts/:cid/products/:pid
router.delete('/:cid/products/:pid', cartsController.removeProductFromCart);

// PUT /api/carts/:cid
router.put('/:cid', cartsController.updateCart);

// PUT /api/carts/:cid/products/:pid
router.put('/:cid/products/:pid', cartsController.updateProductQuantity);

// DELETE /api/carts/:cid
router.delete('/:cid', cartsController.clearCart);

module.exports = router;
