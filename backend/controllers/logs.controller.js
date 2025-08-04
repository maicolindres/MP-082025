const { getConnection } = require('../database');

const getLogsReasignacion = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().execute('sp_GetLogsReasignacion');
        res.json(result.recordset);
    } catch (error) {
        console.error("Error al obtener logs:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getLogsReasignacion };