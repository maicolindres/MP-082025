const { 
  getCasos, 
  createCaso, 
  getCasoById, 
  deleteCasoById, 
  updateCasoById,
  reasignarCaso,
  getHistorialCaso
} = require('../controllers/casos.controller');
const { getConnection, sql } = require('../database');

// Mock de la base de datos
jest.mock('../database');

describe('Casos Controller', () => {
  let req, res, mockPool, mockRequest;

  beforeEach(() => {
    req = {
      params: {},
      body: {}
    };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      sendStatus: jest.fn()
    };

    mockRequest = {
      input: jest.fn().mockReturnThis(),
      execute: jest.fn()
    };

    mockPool = {
      request: jest.fn().mockReturnValue(mockRequest)
    };

    getConnection.mockResolvedValue(mockPool);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getCasos', () => {
    test('should return all casos', async () => {
      const mockCasos = [
        { id: 1, numero_caso: 'CASO-001', descripcion: 'Descripción 1' },
        { id: 2, numero_caso: 'CASO-002', descripcion: 'Descripción 2' }
      ];

      mockRequest.execute.mockResolvedValue({
        recordset: mockCasos
      });

      await getCasos(req, res);

      expect(mockRequest.execute).toHaveBeenCalledWith('sp_get_all_casos');
      expect(res.json).toHaveBeenCalledWith(mockCasos);
    });

    test('should handle database errors', async () => {
      const errorMessage = 'Database connection failed';
      mockRequest.execute.mockRejectedValue(new Error(errorMessage));

      await getCasos(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith(errorMessage);
    });
  });

  describe('createCaso', () => {
    test('should create caso with valid data', async () => {
      req.body = {
        numero_caso: 'CASO-001',
        descripcion: 'Descripción del caso',
        estado: 'pendiente',
        id_fiscal_asignado: 1,
        id_fiscalia: 1
      };

      mockRequest.execute.mockResolvedValue({});

      await createCaso(req, res);

      expect(mockRequest.input).toHaveBeenCalledWith('numero_caso', sql.VarChar, 'CASO-001');
      expect(mockRequest.input).toHaveBeenCalledWith('descripcion', sql.Text, 'Descripción del caso');
      expect(mockRequest.execute).toHaveBeenCalledWith('sp_insert_caso');
      expect(res.json).toHaveBeenCalledWith(req.body);
    });

    test('should return 400 for missing required fields', async () => {
      req.body = {
        numero_caso: 'CASO-001'
        // Faltan campos obligatorios
      };

      await createCaso(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        msg: 'Bad Request. Por favor, rellene todos los campos obligatorios.'
      });
      expect(mockRequest.execute).not.toHaveBeenCalled();
    });

    test('should use default estado when not provided', async () => {
      req.body = {
        numero_caso: 'CASO-001',
        descripcion: 'Descripción del caso',
        id_fiscal_asignado: 1,
        id_fiscalia: 1
      };

      mockRequest.execute.mockResolvedValue({});

      await createCaso(req, res);

      expect(mockRequest.input).toHaveBeenCalledWith('estado', sql.VarChar, 'pendiente');
    });
  });

  describe('getCasoById', () => {
    test('should return caso when found', async () => {
      const mockCaso = { id: 1, numero_caso: 'CASO-001', descripcion: 'Descripción' };
      req.params.id = '1';

      mockRequest.execute.mockResolvedValue({
        recordset: [mockCaso]
      });

      await getCasoById(req, res);

      expect(mockRequest.input).toHaveBeenCalledWith('id', sql.Int, '1');
      expect(mockRequest.execute).toHaveBeenCalledWith('sp_get_caso_by_id');
      expect(res.json).toHaveBeenCalledWith(mockCaso);
    });

    test('should return 404 when caso not found', async () => {
      req.params.id = '999';

      mockRequest.execute.mockResolvedValue({
        recordset: []
      });

      await getCasoById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ msg: 'Caso no encontrado' });
    });
  });

  describe('updateCasoById', () => {
    test('should update caso successfully', async () => {
      req.params.id = '1';
      req.body = {
        numero_caso: 'CASO-001-UPDATED',
        descripcion: 'Descripción actualizada',
        estado: 'en_proceso'
      };

      mockRequest.execute
        .mockResolvedValueOnce({
          recordset: [{ rowsAffected: 1 }]
        })
        .mockResolvedValueOnce({}); // Para el historial

      await updateCasoById(req, res);

      expect(mockRequest.input).toHaveBeenCalledWith('id', sql.Int, '1');
      expect(mockRequest.execute).toHaveBeenCalledWith('sp_UpdateCasoById');
      expect(res.json).toHaveBeenCalledWith({ msg: 'Caso actualizado correctamente.' });
    });

    test('should return 404 when caso not found for update', async () => {
      req.params.id = '999';
      req.body = { descripcion: 'Nueva descripción' };

      mockRequest.execute.mockResolvedValue({
        recordset: [{ rowsAffected: 0 }]
      });

      await updateCasoById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ msg: 'Caso no encontrado' });
    });
  });

  describe('deleteCasoById', () => {
    test('should delete caso successfully', async () => {
      req.params.id = '1';

      mockRequest.execute.mockResolvedValue({
        rowsAffected: [1]
      });

      await deleteCasoById(req, res);

      expect(mockRequest.input).toHaveBeenCalledWith('id', sql.Int, '1');
      expect(mockRequest.execute).toHaveBeenCalledWith('sp_delete_caso');
      expect(res.sendStatus).toHaveBeenCalledWith(204);
    });

    test('should return 404 when caso not found for deletion', async () => {
      req.params.id = '999';

      mockRequest.execute.mockResolvedValue({
        rowsAffected: [0]
      });

      await deleteCasoById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ msg: 'Caso no encontrado' });
    });
  });

  describe('reasignarCaso', () => {
    test('should process reasignacion attempt', async () => {
      req.params.id = '1';
      req.body = { id_fiscal_nuevo: 2 };

      mockRequest.execute.mockResolvedValue({});

      await reasignarCaso(req, res);

      expect(mockRequest.input).toHaveBeenCalledWith('id_caso', sql.Int, '1');
      expect(mockRequest.input).toHaveBeenCalledWith('id_fiscal_nuevo', sql.Int, 2);
      expect(mockRequest.execute).toHaveBeenCalledWith('sp_reasignar_caso');
      expect(res.json).toHaveBeenCalledWith({ msg: 'Intento de reasignación procesado.' });
    });
  });

  describe('getHistorialCaso', () => {
    test('should return historial for caso', async () => {
      const mockHistorial = [
        { id: 1, id_caso: 1, estado: 'pendiente', fecha: '2023-01-01' },
        { id: 2, id_caso: 1, estado: 'en_proceso', fecha: '2023-01-02' }
      ];
      req.params.id = '1';

      mockRequest.execute.mockResolvedValue({
        recordset: mockHistorial
      });

      await getHistorialCaso(req, res);

      expect(mockRequest.input).toHaveBeenCalledWith('id_caso', sql.Int, '1');
      expect(mockRequest.execute).toHaveBeenCalledWith('sp_GetHistorialCaso');
      expect(res.json).toHaveBeenCalledWith(mockHistorial);
    });
  });
});