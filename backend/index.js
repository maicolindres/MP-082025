require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { getConnection } = require('./database');
const casosRoutes = require('./routes/casos.routes.js');
const fiscalesRoutes = require('./routes/fiscales.routes');
const fiscaliasRoutes = require('./routes/fiscalias.routes');
const logsReasignacionRoutes = require('./routes/logs.routes');
const informesRoutes = require('./routes/informes.routes');
const authRoutes = require('./routes/auth.routes');

// Importar Swagger
const { swaggerUi, specs } = require('./swagger');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'MP API Documentation'
}));

// Rutas
app.use('/api', authRoutes);
app.use('/api', casosRoutes);
app.use('/api', fiscalesRoutes);
app.use('/api', fiscaliasRoutes);
app.use('/api', logsReasignacionRoutes);
app.use('/api', informesRoutes);

// Ruta de información de la API
app.get('/api', (req, res) => {
  res.json({
    message: 'API del Ministerio Público',
    version: '1.0.0',
    documentation: '/api-docs'
  });
});

// Función para iniciar el servidor
const startServer = async () => {
    try {
        await getConnection();
        console.log('Conexión a la base de datos establecida correctamente.');

        app.listen(port, () => {
            console.log(`Servidor corriendo en el puerto ${port}`);
            console.log(`Documentación disponible en: http://localhost:${port}/api-docs`);
        });
    } catch (error) {
        console.error('No se pudo iniciar el servidor:', error.message);
    }
};

// Ejecutamos la función para iniciar el servidor
startServer();

module.exports = app;