const { Router } = require('express');
const { 
    getCasos, 
    getCasoById, 
    createCaso, 
    updateCasoById, 
    deleteCasoById,
    reasignarCaso,
    getHistorialCaso
} = require('../controllers/casos.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     CasoInput:
 *       type: object
 *       required:
 *         - numero_caso
 *         - descripcion
 *         - id_fiscal_asignado
 *         - id_fiscalia
 *       properties:
 *         numero_caso:
 *           type: string
 *           description: Número del caso
 *         descripcion:
 *           type: string
 *           description: Descripción del caso
 *         estado:
 *           type: string
 *           enum: [pendiente, en_proceso, resuelto, archivado]
 *           default: pendiente
 *         id_fiscal_asignado:
 *           type: integer
 *         id_fiscalia:
 *           type: integer
 */

/**
 * @swagger
 * /casos:
 *   get:
 *     summary: Obtener todos los casos
 *     tags: [Casos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de casos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Caso'
 *       401:
 *         description: No autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error del servidor
 */
router.get('/casos', authMiddleware, getCasos);

/**
 * @swagger
 * /casos/{id}:
 *   get:
 *     summary: Obtener caso por ID
 *     tags: [Casos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del caso
 *     responses:
 *       200:
 *         description: Datos del caso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Caso'
 *       404:
 *         description: Caso no encontrado
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.get('/casos/:id', authMiddleware, getCasoById);

/**
 * @swagger
 * /casos:
 *   post:
 *     summary: Crear nuevo caso
 *     tags: [Casos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CasoInput'
 *           example:
 *             numero_caso: "CASO-2024-001"
 *             descripcion: "Descripción del caso"
 *             estado: "pendiente"
 *             id_fiscal_asignado: 1
 *             id_fiscalia: 1
 *     responses:
 *       201:
 *         description: Caso creado exitosamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.post('/casos', authMiddleware, createCaso);

/**
 * @swagger
 * /casos/{id}:
 *   put:
 *     summary: Actualizar caso
 *     tags: [Casos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del caso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CasoInput'
 *     responses:
 *       200:
 *         description: Caso actualizado exitosamente
 *       404:
 *         description: Caso no encontrado
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.put('/casos/:id', authMiddleware, updateCasoById);

/**
 * @swagger
 * /casos/{id}:
 *   delete:
 *     summary: Eliminar caso
 *     tags: [Casos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del caso
 *     responses:
 *       204:
 *         description: Caso eliminado exitosamente
 *       404:
 *         description: Caso no encontrado
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.delete('/casos/:id', authMiddleware, deleteCasoById);

/**
 * @swagger
 * /casos/{id}/reasignar:
 *   post:
 *     summary: Reasignar caso a otro fiscal
 *     tags: [Casos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del caso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_fiscal_nuevo
 *             properties:
 *               id_fiscal_nuevo:
 *                 type: integer
 *                 description: ID del nuevo fiscal
 *           example:
 *             id_fiscal_nuevo: 2
 *     responses:
 *       200:
 *         description: Intento de reasignación procesado
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.post('/casos/:id/reasignar', authMiddleware, reasignarCaso);

/**
 * @swagger
 * /casos/{id}/historial:
 *   get:
 *     summary: Obtener historial del caso
 *     tags: [Casos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del caso
 *     responses:
 *       200:
 *         description: Historial del caso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   id_caso:
 *                     type: integer
 *                   estado:
 *                     type: string
 *                   descripcion:
 *                     type: string
 *                   fecha:
 *                     type: string
 *                     format: date-time
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.get('/casos/:id/historial', authMiddleware, getHistorialCaso);

module.exports = router;