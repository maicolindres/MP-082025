import React, { useState, useEffect } from 'react';
import './CasoForm.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

function EditCasoForm({ caso, onClose, onCasoEditado }) {
  const [numeroCaso, setNumeroCaso] = useState(caso.numero_caso);
  const [descripcion, setDescripcion] = useState(caso.descripcion);
  const [estado, setEstado] = useState(caso.estado);
  const [fiscales, setFiscales] = useState([]);
  const [fiscalias, setFiscalias] = useState([]);
  const [idFiscalAsignado, setIdFiscalAsignado] = useState(caso.id_fiscal_asignado);
  const [idFiscalia, setIdFiscalia] = useState(caso.id_fiscalia);

  useEffect(() => {
    fetch(`${API_URL}/fiscales`)
      .then(res => res.json())
      .then(data => setFiscales(data));
    fetch(`${API_URL}/fiscalias`)
      .then(res => res.json())
      .then(data => setFiscalias(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      numero_caso: numeroCaso,
      descripcion,
      estado,
      id_fiscal_asignado: parseInt(idFiscalAsignado),
      id_fiscalia: parseInt(idFiscalia)
    };
    const res = await fetch(`${API_URL}/casos/${caso.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    if (res.ok) {
      if (onCasoEditado) onCasoEditado();
      alert('Caso editado correctamente');
      onClose();
    } else {
      alert('Error al editar el caso');
    }
  };

  return (
    <form className="caso-form" onSubmit={handleSubmit}>
      <h3>Editar Caso</h3>
      <label>
        Número de Caso:
        <input value={numeroCaso} onChange={e => setNumeroCaso(e.target.value)} required />
      </label>
      <label>
        Descripción:
        <textarea value={descripcion} onChange={e => setDescripcion(e.target.value)} required />
      </label>
      <label>
        Estado:
        <select value={estado} onChange={e => setEstado(e.target.value)}>
          <option value="pendiente">Pendiente</option>
          <option value="en progreso">En Progreso</option>
          <option value="cerrado">Cerrado</option>
        </select>
      </label>
      <label>
        Fiscalía:
        <select value={idFiscalia} onChange={e => setIdFiscalia(e.target.value)} required>
          <option value="">Seleccione...</option>
          {fiscalias.map(f => (
            <option key={f.id} value={f.id}>{f.nombre}</option>
          ))}
        </select>
      </label>
      <label>
        Fiscal Asignado:
        <select value={idFiscalAsignado} onChange={e => setIdFiscalAsignado(e.target.value)} required>
          <option value="">Seleccione...</option>
          {fiscales.map(f => (
            <option key={f.id} value={f.id}>{f.nombre}</option>
          ))}
        </select>
      </label>
      <button type="submit">Guardar Cambios</button>
      <button type="button" onClick={onClose} style={{marginLeft: '1rem'}}>Cancelar</button>
    </form>
  );
}

export default EditCasoForm;