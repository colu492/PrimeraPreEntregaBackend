const CartManager = require('../dao/helpers/CartManager');
const mongoose = require('mongoose');


module.exports = {
    createCart: async (req, res) => {
        const cartId = new mongoose.Types.ObjectId(); // Generar un nuevo _id
        const cart = await CartManager.createCart(cartId);
        res.status(201).json(cart);
    },

    getCartById: async (req, res) => {
        const cartId = req.params.cid;
        try {
            const cart = await CartManager.getCartById(cartId).populate('Products').exec();
            res.status(200).json(cart);
            } catch (error) {
            res.status(500).json({ error: 'Fallo la carga del carrito' });
            }
        },
    addProductToCart: (req, res) => {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const product = CartManager.addProductToCart(cartId, productId);
        res.status(200).json(product);
    },
    removeProductFromCart: (req, res) => {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        CartManager.removeProductFromCart(cartId, productId);
        res.status(204).end();
    },
    updateCart: (req, res) => {
        const cartId = req.params.cid;
        const updatedCart = req.body;
        CartManager.updateCart(cartId, updatedCart);
        res.status(200).json(updatedCart);
    },
    updateProductQuantity: (req, res) => {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const quantity = req.body.quantity;
        const updatedProduct = CartManager.updateProductQuantity(cartId, productId, quantity);
        res.status(200).json(updatedProduct);
    },
    clearCart: (req, res) => {
        const cartId = req.params.cid;
        CartManager.clearCart(cartId);
        res.status(204).end();
    }
};
