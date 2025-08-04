const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Ministerio Público - API',
      version: '1.0.0',
      description: 'API para el sistema de gestión de casos del Ministerio Público',
      contact: {
        name: 'Equipo de Desarrollo',
        email: 'dev@mp.gob'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Servidor de desarrollo'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        Caso: {
          type: 'object',
          required: ['numero_caso', 'descripcion', 'id_fiscal_asignado', 'id_fiscalia'],
          properties: {
            id: {
              type: 'integer',
              description: 'ID único del caso'
            },
            numero_caso: {
              type: 'string',
              description: 'Número identificador del caso'
            },
            descripcion: {
              type: 'string',
              description: 'Descripción detallada del caso'
            },
            estado: {
              type: 'string',
              enum: ['pendiente', 'en_proceso', 'resuelto', 'archivado'],
              description: 'Estado actual del caso'
            },
            id_fiscal_asignado: {
              type: 'integer',
              description: 'ID del fiscal asignado al caso'
            },
            id_fiscalia: {
              type: 'integer',
              description: 'ID de la fiscalía responsable'
            },
            fecha_creacion: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de creación del caso'
            }
          }
        },
        Fiscal: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'ID único del fiscal'
            },
            nombre: {
              type: 'string',
              description: 'Nombre completo del fiscal'
            },
            id_fiscalia: {
              type: 'integer',
              description: 'ID de la fiscalía a la que pertenece'
            }
          }
        },
        Fiscalia: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'ID único de la fiscalía'
            },
            nombre: {
              type: 'string',
              description: 'Nombre de la fiscalía'
            }
          }
        },
        LoginRequest: {
          type: 'object',
          required: ['username', 'password'],
          properties: {
            username: {
              type: 'string',
              description: 'Nombre de usuario'
            },
            password: {
              type: 'string',
              description: 'Contraseña'
            }
          }
        },
        LoginResponse: {
          type: 'object',
          properties: {
            token: {
              type: 'string',
              description: 'JWT token para autenticación'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Mensaje de error'
            },
            msg: {
              type: 'string',
              description: 'Mensaje descriptivo del error'
            }
          }
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./routes/*.js', './controllers/*.js']
};

const specs = swaggerJSDoc(options);

module.exports = { swaggerUi, specs };