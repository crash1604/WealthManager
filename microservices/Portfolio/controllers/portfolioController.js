

exports.createPortfolio = async (req, res) => {
    try {
        const portfolio = await portfolioService.createPortfolio(req.body);
        res.status(201).json(portfolio);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getPortfolios = async (req, res) => {
    try {
        const portfolios = await portfolioService.getPortfoliosByUserId(req.params.userId);
        res.status(200).json(portfolios);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updatePortfolio = async (req, res) => {
    try {
        const updatedPortfolio = await portfolioService.updatePortfolio(req.params.portfolioId, req.body);
        res.status(200).json(updatedPortfolio);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deletePortfolio = async (req, res) => {
    try {
        await portfolioService.deletePortfolio(req.params.portfolioId);
        res.status(204).json();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
