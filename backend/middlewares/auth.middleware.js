const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'No se proporcionó token' });
  }

  const token = authHeader.split(' ')[1]; // Se espera el formato "Bearer <token>"
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};

module.exports = authMiddleware;