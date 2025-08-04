import React, { useEffect, useState } from 'react';
import EditCasoForm from './EditCasoForm';
import ReasignarCasoForm from './ReasignarCasoForm';
import HistorialCaso from './HistorialCaso';
import './CasosTable.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';
const PAGE_SIZE = 5;

function CasosTable() {
  const [casos, setCasos] = useState([]);
  const [editCaso, setEditCaso] = useState(null);
  const [reasignarCaso, setReasignarCaso] = useState(null);
  const [historialCaso, setHistorialCaso] = useState(null);
  const [page, setPage] = useState(1);

const fetchCasos = () => {
  const token = localStorage.getItem('token');
  fetch(`${API_URL}/casos`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(data => {
      if (Array.isArray(data)) {
        setCasos(data);
      } else {
        console.error("Se esperaba un arreglo, pero se obtuvo:", data);
        setCasos([]);
      }
    })
    .catch(err => {
      console.error(err);
      setCasos([]);
    });
};

  useEffect(() => {
    fetchCasos();
  }, []);

  const totalPages = Math.ceil(casos.length / PAGE_SIZE);
  const casosPaginados = casos.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleDelete = (caso) => {
    if (window.confirm(`¿Estás seguro de eliminar el caso ${caso.numero_caso}?`)) {
      fetch(`${API_URL}/casos/${caso.id}`, {
        method: 'DELETE'
      })
      .then(res => {
        if (res.ok) {
          alert('Caso eliminado correctamente');
          fetchCasos();
        } else {
          alert('Error al eliminar el caso');
        }
      });
    }
  };

  return (
    <div className="casos-container">
      <div className="casos-title">Ministerio Público - Lista de Casos</div>
      <table className="casos-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Número de Caso</th>
            <th>Descripción</th>
            <th>Estado</th>
            <th>Fiscal Asignado</th>
            <th>Fiscalía</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {casosPaginados.map(caso => (
            <tr key={caso.id}>
              <td>{caso.id}</td>
              <td>{caso.numero_caso}</td>
              <td>{caso.descripcion}</td>
              <td>{caso.estado}</td>
              <td>{caso.nombre_fiscal}</td>
              <td>{caso.nombre_fiscalia}</td>
              <td>
                <span
                  style={{ cursor: 'pointer', fontSize: '1.2rem', marginRight: '0.5rem' }}
                  title="Editar"
                  onClick={() => setEditCaso(caso)}
                >
                  ✏️
                </span>
                {caso.estado === 'pendiente' && (
                  <span
                    style={{ cursor: 'pointer', fontSize: '1.2rem', marginRight: '0.5rem' }}
                    title="Reasignar"
                    onClick={() => setReasignarCaso(caso)}
                  >
                    🔄
                  </span>
                )}
                <span
                  style={{ cursor: 'pointer', fontSize: '1.2rem', marginRight: '0.5rem' }}
                  title="Eliminar"
                  onClick={() => handleDelete(caso)}
                >
                  🗑️
                </span>
                <span
                  style={{ cursor: 'pointer', fontSize: '1.2rem' }}
                  title="Ver Historial"
                  onClick={() => setHistorialCaso(caso)}
                >
                  📜
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="casos-pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Anterior
        </button>
        <span>
          Página {page} de {totalPages}
        </span>
        <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>
          Siguiente
        </button>
      </div>

      {editCaso && (
        <div className="modal-overlay" onClick={() => setEditCaso(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <EditCasoForm
              caso={editCaso}
              onClose={() => setEditCaso(null)}
              onCasoEditado={fetchCasos}
            />
          </div>
        </div>
      )}

      {reasignarCaso && (
        <div className="modal-overlay" onClick={() => setReasignarCaso(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <ReasignarCasoForm
              caso={reasignarCaso}
              onClose={() => setReasignarCaso(null)}
              onReasignado={fetchCasos}
            />
          </div>
        </div>
      )}

      {historialCaso && (
        <div className="modal-overlay" onClick={() => setHistorialCaso(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            {/* Se asume que el componente HistorialCaso muestra el historial de un caso pasándole su id */}
            <HistorialCaso idCaso={historialCaso.id} />
          </div>
        </div>
      )}
    </div>
  );
}

export default CasosTable;