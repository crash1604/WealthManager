const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController');

router.post('/', portfolioController.createPortfolio);
router.get('/:userId', portfolioController.getPortfolios);
router.put('/:portfolioId', portfolioController.updatePortfolio);
router.delete('/:portfolioId', portfolioController.deletePortfolio);

module.exports = router;
