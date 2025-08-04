const { Router } = require('express');
const { getLogsReasignacion } = require('../controllers/logs.controller');
const router = Router();

router.get('/', getLogsReasignacion);

module.exports = router;