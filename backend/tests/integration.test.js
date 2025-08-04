const request = require('supertest');
const app = require('../index'); // Asume que exportas la app desde index.js

describe('Integration Tests', () => {
  let token;

  beforeAll(async () => {
    // Obtener token para las pruebas autenticadas
    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'admin',
        password: 'secret'
      });
    
    token = loginResponse.body.token;
  });

  describe('Authentication Endpoints', () => {
    test('POST /api/auth/login - should login successfully', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          username: 'admin',
          password: 'secret'
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
    });

    test('POST /api/auth/login - should reject invalid credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          username: 'admin',
          password: 'wrong'
        });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error', 'Credenciales inválidas');
    });
  });

  describe('Protected Endpoints', () => {
    test('GET /api/casos - should require authentication', async () => {
      const response = await request(app)
        .get('/api/casos');

      expect(response.status).toBe(401);
    });

    test('GET /api/casos - should work with valid token', async () => {
      const response = await request(app)
        .get('/api/casos')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });
});