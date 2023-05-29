const express = require('express');
const io = require ('../app.js')
const socket = require('../public/js/realTimeProducts.js')
const router = express.Router();
const productsModel = require('../dao/models/products.model.js')

const ProductController = require('../controllers/ProductController.js');


router.get('/', async (req, res) => {
    const { limit = 10, page = 1, sort, query } = req.query;

    const filters = {};
    if (query && query.category) {
        filters.category = query.category;
    }
    try {
        const totalCount = await productsModel.countDocuments(filters);
        const totalPages = Math.ceil(totalCount / limit);
        const skip = (page - 1) * limit;

        let productsQuery = productsModel.find(filters).skip(skip).limit(limit);
        if ( sort === 'asc') {
            productsQuery = productsQuery.sort({ price: 1 })
        }
        else if ( sort === 'desc' ) {
            productsQuery = productsQuery.sort({ price: -1 });
        }
        const products = await productsQuery.lean().exec();
        const prevPage = page > 1 ? page - 1 : null;
        const nextPage = page < totalPages ? page + 1 : null;
        const hasPrevPage = prevPage !== null;
        const hasNextPage = nextPage !== null;

        const response = {
            status: 'success',
            payload: products,
            totalPages,
            prevPage,
            nextPage,
            page,
            hasPrevPage,
            hasNextPage,
            prevLink: hasPrevPage ? createPageLink(prevPage, limit, sort, query) : null,
            nextLink: hasNextPage ? createPageLink(nextPage, limit, sort, query) : null,

        }
        res.render('list', {products: response });
    } catch (err){
        console.error(err);
        res.render('error', { message: 'Error al obtener los productos.'});
    }
})
router.get('/create', (req, res) => {
    res.render('create', {})
})
router.get('/:title', async (req, res)=> {
    const title = req.params.title
    const products = await productsModel.findOne({title}).lean().exec()
    res.render('one', {
        products
    })
})
router.post('/', async (req,res) => {
    const productNew = req.body
    const productGenerated = new productsModel(productNew)
    await productGenerated.save()
    res.redirect(`/products/${productGenerated.title}`)
})

router.put('/:title', async (req, res) => {
    const title = req.params.title
    console.log(title)
    const productNewData = req.body
    console.log(productNewData)
    try {
        await productsModel.updateOne({ title }, { ...productNewData })
    } catch(err) {
        console.log('error.....')
        res.send({err})
    }
})

router.delete('/:title', async (req, res) => {
    const title = req.params.title
    try {
        await productsModel.deleteOne({ title })
        res.send(`Producto ${title} borrado exitosamente!`)
    } catch (err) {
        res.send({err})
    }
})
/*
router.get('/',(req, res)=>{

    const limit = req.query.limit
    let list= manager.getProducts()
    if(limit) {
        list = list.slice(0, limit)
    } 
    res.send(list)
} );

router.get('/:pid', (req, res)=>{
    const pid= req.params.pid
    const identified= manager.getProductsById(+pid)
    res.send(identified)
});

router.get('/', (req, res) => {
    const productHtml = products.map((product) => realTimeProductsView(product)).join('/n');
    res.send(productHtml);
});

router.get('realtimeproducts', (req, res) => {
    res.render('realTimeProducts');
})

router.post('/websocket/product', (req, res) => {
    const newProductWs = new ProductManager({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
    });
    productList.addProduct( newProduct );
    socket.emit('productCreated', newProductWs);
    res.send('Producto creado satisfactoriamente');
});

router.post('/', (req, res)=>{
    const { title, description, price, category, thumbnail, stock} = req.body;
    const newProduct = ProductManager.addProducts({title, description, price, category, thumbnail, stock});
    io.emit('newProduct', newProduct);
    res.status(201).send(`Producto ${newProduct.id} agregado.`);
});
router.post('/', (req, res) => {
    const newProduct = {
        id: Date.now(),
        name: req.body.name,
        price: req.body.price,
    };
    const products = getProductList();
    products.push(newProduct);
    fs.writeFileSync('./src/datastorage/products.json', JSON.stringify(products));
    io.emit('newProduct', newProduct);
    res.status(201).send(newProduct);
});

router.put('/:pid', (req, res)=>{
    const pid = req.params.pid
    const data= req.body
    manager.updateProduct(pid, data)
    res.status(202).send("Producto actualizado")
});

router.delete('/:pid', (req, res)=>{
    const pid= req.params.pid;
    manager.deleteProduct(pid);
    io.emit('productDeleted', id);
    res.send("Producto eliminado");
});
router.delete('/:pid', async (req, res) => {
    const productId = req.params.pid;
    
        req.app.get('io').emit('deleteProduct', productId);
    
        res.status(200).json({ message: 'Deleting product...' });
    });
    */
module.exports = router