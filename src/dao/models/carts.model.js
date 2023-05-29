const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const cartsCollection = 'carrito';

const productSchema = mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    }
});

const cartsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    products: [productSchema]
});

cartsSchema.plugin(mongoosePaginate);
cartsSchema.set('timestamps', true);

const cartsModel = mongoose.model(cartsCollection, cartsSchema);

module.exports = cartsModel;
