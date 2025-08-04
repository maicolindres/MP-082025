import React, { useEffect, useState } from 'react';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

function EstadisticasCasos() {
  const [informe, setInforme] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/informes/casos`)
      .then((res) => res.json())
      .then((data) => setInforme(data))
      .catch((err) => console.error("Error al cargar informe:", err));
  }, []);

  return (
    <div style={{ padding: '1rem', margin: '1rem auto', maxWidth: '800px' }}>
      <h2>Estadísticas de Casos</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#003366', color: '#FFD600' }}>
            <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Estado</th>
            <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Total</th>
          </tr>
        </thead>
        <tbody>
          {informe.map((item) => (
            <tr key={item.estado} style={{ backgroundColor: '#f1f1f1' }}>
              <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{item.estado}</td>
              <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{item.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EstadisticasCasos;