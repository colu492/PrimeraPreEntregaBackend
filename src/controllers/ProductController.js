const ProductManager = require('../helpers/ProductManager.js');

module.exports = {
    getAllProducts: (req, res) => {
        const products = ProductManager.getAllProducts();
        res.status(200).json(products);
    },
    getProductById: (req, res) => {
        const productId = req.params.pid;
        const product = ProductManager.getProductById(productId);
        res.status(200).json(product);
    },
    addProduct: (req, res) => {
        const newProduct = req.body;
        const product = ProductManager.addProduct(newProduct);
        res.status(201).json(product);
    },
    updateProduct: (req, res) => {
        const productId = req.params.pid;
        const updatedProduct = req.body;
        const product = ProductManager.updateProduct(productId, updatedProduct);
        res.status(200).json(product);
    },
    deleteProduct: (req, res) => {
        const productId = req.params.pid;
        ProductManager.deleteProduct(productId);
        res.status(204).send();
    }
};