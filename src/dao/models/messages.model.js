const mongoose = require ('mongoose');

const messagesCollection = 'carrito'

const messagesSchema = mongoose.Schema({
    name: String

})

const messagesModel = mongoose.model(messagesCollection, messagesSchema)

module.exports = messagesModel;