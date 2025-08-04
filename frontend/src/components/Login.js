import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

function Login() {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          login(data.token); // Usa el método del context
        } else {
          setError(data.error || 'Error al iniciar sesión');
        }
      })
      .catch((err) => {
        console.error(err);
        setError('Error en el servidor');
      });
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '300px', margin: '2rem auto' }}>
      <h2>Iniciar Sesión</h2>
      <input
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
      />
      <button
        type="submit"
        style={{
          background: '#003366',
          color: '#FFD600',
          border: 'none',
          padding: '0.5rem 1rem',
          borderRadius: '4px',
          cursor: 'pointer',
          width: '100%'
        }}
      >
        Iniciar Sesión
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default Login;