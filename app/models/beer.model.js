const mongoose = require('mongoose');

const BeerSchema = mongoose.Schema({
    name: String,
    abv: Number,
    content: Number,
    style: String
}, {
    timestamps: true
});

module.exports = mongoose.model('beer', BeerSchema);
