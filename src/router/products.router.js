const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController.js');

// GET /api/products/
router.get('/', ProductController.getAllProducts);

// GET /api/products/:pid
router.get('/:pid', ProductController.getProductById);

// POST /api/products/
router.post('/', ProductController.addProduct);

// PUT /api/products/:pid
router.put('/:pid', ProductController.updateProduct);

// DELETE /api/products/:pid
router.delete('/:pid', ProductController.deleteProduct);

module.exports = router;