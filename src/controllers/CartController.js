const CartManager = require('../dao/helpers/CartManager');

module.exports = {
    createCart: (req, res) => {
        const newCart = req.body;
        const cart = CartManager.createCart(newCart);
        res.status(201).json(cart);
    },
    getCartById: (req, res) => {
        const cartId = req.params.cid;
        const cart = CartManager.getCartById(cartId);
        res.status(200).json(cart);
    },
    addProductToCart: (req, res) => {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const product = CartManager.addProductToCart(cartId, productId);
        res.status(200).json(product);
    }
};