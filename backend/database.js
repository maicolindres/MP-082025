const sql = require('mssql');
require('dotenv').config();

const config = {
    server: process.env.SQLSERVER_HOST || 'localhost', // ahora usará "sqlserver"
    port: Number(process.env.SQLSERVER_PORT) || 1433,
    user: process.env.SQLSERVER_USER || 'sa',
    password: process.env.SQLSERVER_PASSWORD,
    database: process.env.SQLSERVER_DATABASE || 'MP_DB',
    options: {
        encrypt: false, // Para desarrollo local con Docker
        trustServerCertificate: true // Necesario para conexiones locales a SQL Server
    }
};

async function getConnection() {
    try {
        const pool = await sql.connect(config);
        console.log('Conexión exitosa a la base de datos');
        return pool;
    } catch (err) {
        console.error('Error al conectar a la base de datos:', err);
        // Lanza el error para que el llamador pueda manejarlo
        throw err; 
    }
}

module.exports = {
    getConnection,
    sql
};