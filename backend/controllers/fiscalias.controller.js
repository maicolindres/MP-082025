const { getConnection } = require('../database');

const getFiscalias = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().execute('sp_GetFiscalias');
        res.json(result.recordset);
    } catch (error) {
        console.error("Error al obtener fiscalías:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getFiscalias };