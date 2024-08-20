const holdingService = require('../services/holdingService');

exports.createHolding = async (req, res) => {
    try {
        const holding = await holdingService.createHolding(req.body);
        res.status(201).json(holding);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getHoldings = async (req, res) => {
    try {
        const holdings = await holdingService.getHoldingsByPortfolioId(req.params.portfolioId);
        res.status(200).json(holdings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateHolding = async (req, res) => {
    try {
        const updatedHolding = await holdingService.updateHolding(req.params.holdingId, req.body);
        res.status(200).json(updatedHolding);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteHolding = async (req, res) => {
    try {
        await holdingService.deleteHolding(req.params.holdingId);
        res.status(204).json();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

