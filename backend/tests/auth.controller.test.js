const jwt = require('jsonwebtoken');
const { login } = require('../controllers/auth.controller');

// Mock de jwt
jest.mock('jsonwebtoken');

describe('Auth Controller', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {}
    };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };
    process.env.JWT_SECRET = 'test-secret';
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    test('should return token for valid credentials', async () => {
      const mockToken = 'mock-jwt-token';
      jwt.sign.mockReturnValue(mockToken);

      req.body = {
        username: 'admin',
        password: 'secret'
      };

      await login(req, res);

      expect(jwt.sign).toHaveBeenCalledWith(
        { username: 'admin' },
        'test-secret',
        { expiresIn: '1h' }
      );
      expect(res.json).toHaveBeenCalledWith({ token: mockToken });
    });

    test('should return 401 for invalid username', async () => {
      req.body = {
        username: 'invalid',
        password: 'secret'
      };

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: 'Credenciales inválidas' });
      expect(jwt.sign).not.toHaveBeenCalled();
    });

    test('should return 401 for invalid password', async () => {
      req.body = {
        username: 'admin',
        password: 'wrong'
      };

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: 'Credenciales inválidas' });
      expect(jwt.sign).not.toHaveBeenCalled();
    });

    test('should return 401 for missing credentials', async () => {
      req.body = {};

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: 'Credenciales inválidas' });
      expect(jwt.sign).not.toHaveBeenCalled();
    });
  });
});