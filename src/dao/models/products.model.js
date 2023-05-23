const mongoose = require ('mongoose');

const productsCollection = 'productos'

const productsSchema = mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    category: String

})

const productsModel = mongoose.model(productsCollection, productsSchema)

module.exports = productsModel;