const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  const { username, password } = req.body;
  
  // Ejemplo simplificado: valida las credenciales (en un caso real, consulta la base de datos)
  if (username === 'admin' && password === 'secret') {
    // Firma el token; asegúrate de tener definido process.env.JWT_SECRET
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token });
  } else {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }
};

module.exports = { login };