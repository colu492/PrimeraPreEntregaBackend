const express = require('express');
const app = express();

// Importar los routers de productos y carritos
const productsRouter = require('./src/router/products.router.js');
const cartsRouter = require('./src/router/carts.router.js');

// Configurar el middleware para parsear el body de las peticiones
app.use(express.json());

// Configurar los endpoints de productos y carritos
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Iniciar el servidor
app.listen(8080, () => {
    console.log(`Server up`);
});