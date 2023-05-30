const mongoose = require ('mongoose');

const productsCollection = 'productos'

const productsSchema = mongoose.Schema({

    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        require: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },

});

const productsModel = mongoose.model(productsCollection, productsSchema)

module.exports = productsModel;