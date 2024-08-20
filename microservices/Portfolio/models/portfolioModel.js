const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
    portfolio_id: { type: String, required: true, unique: true },
    user_id: { type: String, required: true },
    portfolio_name: { type: String, required: true },
    creation_date: { type: Date, default: Date.now },
    total_value: { type: Number, default: 0 },
    cash_balance: { type: Number, default: 0 },
});

module.exports = mongoose.model('Portfolio', PortfolioSchema);
