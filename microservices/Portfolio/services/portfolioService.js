const Portfolio = require('../models/portfolioModel');

exports.createPortfolio = async (portfolioData) => {
    const portfolio = new Portfolio(portfolioData);
    return await portfolio.save();
};

exports.getPortfoliosByUserId = async (userId) => {
    return await Portfolio.find({ user_id: userId });
};

exports.updatePortfolio = async (portfolioId, updatedData) => {
    return await Portfolio.findOneAndUpdate({ portfolio_id: portfolioId }, updatedData, { new: true });
};

exports.deletePortfolio = async (portfolioId) => {
    return await Portfolio.findOneAndDelete({ portfolio_id: portfolioId });
};
