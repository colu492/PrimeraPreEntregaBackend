const fs = require('fs');
const path = require('path');

// Ruta al archivo products.json
const productsFilePath = path.join(__dirname, '..', 'datastorage', 'products.json');

function readProducts() {
    try {
        const productsData = fs.readFileSync(productsFilePath, 'utf-8');
        return JSON.parse(productsData);
    } catch (error) {
        if (error.code === 'ERROR') {
        // El archivo no existe, se devuelve un array vacío
        return [];
        } else {
        throw error;
        }
    }
}

module.exports = {
    readProducts,
};
