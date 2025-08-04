import React, { useEffect, useState } from 'react';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

function HistorialCaso({ idCaso }) {
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/casos/${idCaso}/historial`)
      .then(res => res.json())
      .then(data => setHistorial(data))
      .catch(err => console.error("Error al cargar historial:", err));
  }, [idCaso]);

  return (
    <div>
      <h3>Historial del Caso {idCaso}</h3>
      <ul>
        {historial.map(registro => (
          <li key={registro.id}>
            <strong>{new Date(registro.fecha).toLocaleString()}</strong>: {registro.estado} – {registro.descripcion}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HistorialCaso;