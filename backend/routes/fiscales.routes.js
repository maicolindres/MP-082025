const { Router } = require('express');
const router = Router();
const { getFiscales } = require('../controllers/fiscales.controller');

router.get('/', getFiscales);

module.exports = router;