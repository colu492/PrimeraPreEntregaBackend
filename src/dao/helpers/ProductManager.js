const fs = require('fs');
const path = require('path');
const { readProducts } = require('./ListProducts.js');

// Ruta al archivo products.json
const productsFilePath = path.join(__dirname, '..', 'datastorage', 'products.json');

function addProduct(product) {
    const products = readProducts();

    // Generar un ID único para el producto
    const newId = generateId(products);

    // Agregar el ID al producto y agregarlo a la lista de productos
    product.id = newId;
    products.push(product);

    // Guardar la lista actualizada de productos en el archivo products.json
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
    }


    function updateProduct(productId, newData) {
    const products = readProducts();

    // Buscar el producto por su ID
    const productIndex = products.findIndex((product) => product.id === productId);

    if (productIndex !== -1) {
        // Actualizar los campos del producto
        const updatedProduct = {
        ...products[productIndex],
        ...newData,
        id: productId // Asegurar que el ID no se modifique
        };

        // Reemplazar el producto antiguo con el actualizado en la lista de productos
        products.splice(productIndex, 1, updatedProduct);

        // Guardar la lista actualizada de productos en el archivo products.json
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
    }
    }


    function deleteProduct(productId) {
    const products = readProducts();

    // Filtrar la lista de productos para eliminar el producto con el ID dado
    const updatedProducts = products.filter((product) => product.id !== productId);

    // Guardar la lista actualizada de productos en el archivo products.json
    fs.writeFileSync(productsFilePath, JSON.stringify(updatedProducts, null, 2));
    }


    function generateId(products) {
    // Si no hay productos, el ID será 1
    if (products.length === 0) {
        return 1;
    }

    // Encontrar el ID máximo de los productos existentes
    const maxId = products.reduce((acc, product) => {
        if (product.id > acc) {
        return product.id;
        } else {
        return acc;
        }
    }, 0);

    // Generar un nuevo ID sumando 1 al ID máximo
    return maxId + 1;
    }


function getAllProducts() {
    const products = readProducts();
    return products;
}

function getProductById(productId) {
    const products = readProducts();
    const product = products.find((product) => product.id === productId);
    return product;
}

    module.exports = {
    getAllProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById
};
