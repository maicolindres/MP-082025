const { getConnection } = require('../database');

const getFiscales = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().execute('sp_GetFiscales');
        res.json(result.recordset);
    } catch (error) {
        console.error("Error al obtener fiscales:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getFiscales };