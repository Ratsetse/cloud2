const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
    name: String,
    product: String,
    quantity: Number
}, { timestamps: true });

module.exports = mongoose.model('Purchase', purchaseSchema);
