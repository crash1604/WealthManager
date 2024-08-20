const express = require('express');
const router = express.Router();
const holdingController = require('../controllers/holdingController');

router.post('/', holdingController.createHolding);
router.get('/:portfolioId', holdingController.getHoldings);
router.put('/:holdingId', holdingController.updateHolding);
router.delete('/:holdingId', holdingController.deleteHolding);

module.exports = router;

