const Holding = require('../models/holdingModel');

exports.createHolding = async (holdingData) => {
    const holding = new Holding(holdingData);
    return await holding.save();
};

exports.getHoldingsByPortfolioId = async (portfolioId) => {
    return await Holding.find({ portfolio_id: portfolioId });
};

exports.updateHolding = async (holdingId, updatedData) => {
    return await Holding.findOneAndUpdate({ holding_id: holdingId }, updatedData, { new: true });
};

exports.deleteHolding = async (holdingId) => {
    return await Holding.findOneAndDelete({ holding_id: holdingId });
};
