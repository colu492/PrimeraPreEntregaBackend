const ProductManager = require('../dao/helpers/ProductManager.js');

module.exports = {
    getAllProducts: async (req, res) => {
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;
    
        try {
            const products = await ProductModel.find()
                .skip((page - 1) * limit)
                .limit(limit)
                .lean()
                .exec();
        
            const totalCount = await ProductModel.countDocuments().exec();
            const totalPages = Math.ceil(totalCount / limit);
        
            const nextPage = page < totalPages ? page + 1 : null;
            const prevPage = page > 1 ? page - 1 : null;
        
            res.render('products', {
                products,
                totalPages,
                nextPage,
                prevPage,
                page,
                hasNextPage: nextPage !== null,
                hasPrevPage: prevPage !== null,
                prevLink: prevPage ? `/products?page=${prevPage}` : null,
                nextLink: nextPage ? `/products?page=${nextPage}` : null,
            });
            } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to retrieve products' });
            }
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