const { getConnection, sql } = require('../database');

const getInformeCasos = async (req, res) => {
    try {
        const { estado, fechaDesde, fechaHasta } = req.query;
        const pool = await getConnection();
        
        const result = await pool.request()
            .input('estado', sql.NVarChar(50), estado || null)
            .input('fecha_desde', sql.Date, fechaDesde || null)
            .input('fecha_hasta', sql.Date, fechaHasta || null)
            .execute('sp_GetInformeCasos');
        
        res.json(result.recordset);
    } catch (error) {
        console.error("Error al obtener informe de casos:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getInformeCasos };