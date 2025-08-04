const { Router } = require('express');
const router = Router();
const { getFiscalias } = require('../controllers/fiscalias.controller');

router.get('/', getFiscalias);

module.exports = router;