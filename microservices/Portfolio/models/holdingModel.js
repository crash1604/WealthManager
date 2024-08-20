const mongoose = require('mongoose');

const HoldingSchema = new mongoose.Schema({
    holding_id: { type: String, required: true, unique: true },
    portfolio_id: { type: String, required: true },
    asset_id: { type: String, required: true },
    asset_type: { type: String, required: true },
    symbol: { type: String, required: true },
    quantity: { type: Number, required: true },
    purchase_price: { type: Number, required: true },
    current_price: { type: Number, required: true },
    purchase_date: { type: Date, default: Date.now },
    market_value: {
        type: Number,
        required: true,
        get: function () { return this.quantity * this.current_price; },
    },
});

module.exports = mongoose.model('Holding', HoldingSchema);
