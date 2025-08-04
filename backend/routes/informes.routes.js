const { Router } = require('express');
const { getInformeCasos } = require('../controllers/informes.controller');
const router = Router();

router.get('/casos', getInformeCasos);

module.exports = router;