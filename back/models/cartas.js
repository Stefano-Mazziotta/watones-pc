const mongoose = require('mongoose');

const Pibes = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    foto: {
        data: Buffer,
        contentType: String,
    },
    stat1: {
        type: String,
        required: true
    },
    porc1: {
        type: Number,
        required: true
    }
   
})

module.exports = mongoose.model('Pibes', Pibes);