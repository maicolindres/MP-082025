import React, { useEffect, useState } from 'react';
import './LogsReasignacionTable.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

function LogsReasignacionTable() {
  const [logs, setLogs] = useState([]);

  const fetchLogs = () => {
    fetch(`${API_URL}/logs-reasignacion`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setLogs(data);
        } else {
          console.error("Se esperaba un arreglo pero se obtuvo:", data);
          setLogs([]);
        }
      })
      .catch(err => {
        console.error("Error al obtener logs:", err);
        setLogs([]);
      });
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="logs-container">
      <h2>Logs de Reasignación</h2>
      <table className="logs-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Caso</th>
            <th>Fiscal Anterior</th>
            <th>Fiscal Nuevo</th>
            <th>Motivo</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {logs.map(log => (
            <tr key={log.id}>
              <td>{log.id}</td>
              <td>{log.numero_caso}</td>
              <td>{log.nombre_fiscal_anterior}</td>
              <td>{log.nombre_fiscal_nuevo}</td>
              <td>{log.motivo}</td>
              <td>{new Date(log.fecha).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LogsReasignacionTable;