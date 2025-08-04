// Configuración global para las pruebas
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret';
process.env.DB_SERVER = 'test-server';
process.env.DB_USER = 'test-user';
process.env.DB_PASSWORD = 'test-password';
process.env.DB_DATABASE = 'test-database';

// Mock console.error para pruebas más limpias
global.console = {
  ...console,
  error: jest.fn(),
  log: jest.fn(),
};