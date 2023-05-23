const mongoose = require ('mongoose');

const cartsCollection = 'carrito'

const cartsSchema = mongoose.Schema({
    name: String

})

const cartsModel = mongoose.model(cartsCollection, cartsSchema)

module.exports = cartsModel;