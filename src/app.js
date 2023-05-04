const express = require('express');
const app = express();
const expressHandlebars = require('express-handlebars')
const { Server } = require ('socket.io')
const fs = require ('fs')
const http = require('http')

const server = http.createServer(app)
const io = new Server(server)

// Importar los routers de productos y carritos
const productsRouter = require('./router/products.router.js');
const cartsRouter = require('./router/carts.router.js');

app.engine('handlebars', expressHandlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', 'src/views')

// Configurar el middleware para parsear el body de las peticiones
app.use(express.static('./src/public'))
app.use(express.json());
app.use((req, res, next) => {
    if (req.url.endsWith('.js')) {
    res.setHeader('Content-Type', 'application/javascript');
    }
    next();
});

// Configurar los endpoints de productos y carritos
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.get('/', (req, res) => {
    const products = getProductList();
    res.render('index', {products});
});
app.get('/realtimeproducts', (req, res) => {
    const products = getProductList();
    res.render('realtimeproducts', {products});
});

// Iniciar el servidor
io.on('connection', (socket) => {
    console.log('usuario conectado');

    socket.on('newProduct', (product) => {
        console.log(`Producto ${JSON.stringify(product)} agregado`);
        io.emit('newProduct', product);
    });

    socket.on('deleteProduct', (productId) => {
        console.log(`Producto ${productId} eliminado`);

        io.emit('deleteProduct', productId);
    });
    socket.on('disconnect', () => {
        console.log('usuario desconectado');
    });
});

server.listen(8080, ()=>console.log("server up"))

async function getProductList() {
    return new Promise((resolve, reject) => {
        fs.readFile('./src/datastorage/products.json', 'utf-8', (err, data) => {
            if (err) {
            reject(err);
            } else {
            resolve(JSON.parse(data));
            }
        });
        });
    }

module.exports =  { server, io };