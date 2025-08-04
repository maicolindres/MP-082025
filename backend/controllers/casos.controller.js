const { getConnection, sql } = require('../database');

const getCasos = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().execute('sp_get_all_casos');
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const createCaso = async (req, res) => {
    const { numero_caso, descripcion, estado, id_fiscal_asignado, id_fiscalia } = req.body;

    // Validación básica
    if (!numero_caso || !descripcion || !id_fiscal_asignado || !id_fiscalia) {
        return res.status(400).json({ msg: 'Bad Request. Por favor, rellene todos los campos obligatorios.' });
    }

    try {
        const pool = await getConnection();
        await pool.request()
            .input('numero_caso', sql.VarChar, numero_caso)
            .input('descripcion', sql.Text, descripcion)
            .input('estado', sql.VarChar, estado || 'pendiente')
            .input('id_fiscal_asignado', sql.Int, id_fiscal_asignado)
            .input('id_fiscalia', sql.Int, id_fiscalia)
            .execute('sp_insert_caso');

        res.json({ numero_caso, descripcion, estado, id_fiscal_asignado, id_fiscalia });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const getCasoById = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.Int, req.params.id)
            .execute('sp_get_caso_by_id');
        
        if (result.recordset.length > 0) {
            return res.json(result.recordset[0]);
        } else {
            return res.status(404).json({ msg: 'Caso no encontrado' });
        }
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const deleteCasoById = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.Int, req.params.id)
            .execute('sp_delete_caso');

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ msg: 'Caso no encontrado' });
        }

        res.sendStatus(204);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const updateCasoById = async (req, res) => {
    const { id } = req.params;
    const { numero_caso, descripcion, estado, id_fiscal_asignado, id_fiscalia } = req.body;
    
    try {
        const pool = await getConnection();
        
        // Actualizar el caso usando stored procedure
        const result = await pool.request()
            .input('id', sql.Int, id)
            .input('numero_caso', sql.VarChar, numero_caso || null)
            .input('descripcion', sql.Text, descripcion || null)
            .input('estado', sql.VarChar, estado || null)
            .input('id_fiscal_asignado', sql.Int, id_fiscal_asignado || null)
            .input('id_fiscalia', sql.Int, id_fiscalia || null)
            .execute('sp_UpdateCasoById');

        // Verificar si se actualizó algún registro
        if (result.recordset[0].rowsAffected === 0) {
            return res.status(404).json({ msg: 'Caso no encontrado' });
        }

        // Si se cambió el estado, registrar en el historial
        if (estado) {
            await pool.request()
                .input('id_caso', sql.Int, id)
                .input('estado', sql.VarChar, estado)
                .input('descripcion', sql.VarChar, 'Actualización de estado')
                .execute('sp_RegistrarHistorialCaso');
        }

        res.json({ msg: 'Caso actualizado correctamente.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const reasignarCaso = async (req, res) => {
  const { id } = req.params;
  const { id_fiscal_nuevo } = req.body;

  try {
    const pool = await getConnection();
    await pool.request()
      .input('id_caso', sql.Int, id)
      .input('id_fiscal_nuevo', sql.Int, id_fiscal_nuevo)
      .execute('sp_reasignar_caso');
    res.json({ msg: 'Intento de reasignación procesado.' });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const getHistorialCaso = async (req, res) => {
    try {
        const { id } = req.params;
        const pool = await getConnection();
        const result = await pool.request()
            .input('id_caso', sql.Int, id)
            .execute('sp_GetHistorialCaso');
        
        res.json(result.recordset);
    } catch (error) {
        console.error("Error al obtener historial:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getCasos,
    createCaso,
    getCasoById,
    deleteCasoById,
    updateCasoById,
    reasignarCaso,
    getHistorialCaso
};