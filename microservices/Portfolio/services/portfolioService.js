const Portfolio = require('../models/portfolioModel');

class PortfolioService {
    createPortfolio = async (portfolioData) => {
        const portfolio = new Portfolio(portfolioData);
        return await portfolio.save();
    };

    async getPortfoliosByUserId(userId) {
        return await Portfolio.find({ user_id: userId });
    };

    async updatePortfolio(portfolioId, updatedData) {
        return await Portfolio.findOneAndUpdate({ portfolio_id: portfolioId }, updatedData, { new: true });
    };

    async deletePortfolio(portfolioId) {
        return await Portfolio.findOneAndDelete({ portfolio_id: portfolioId });
    };
}

module.exports = new PortfolioService();