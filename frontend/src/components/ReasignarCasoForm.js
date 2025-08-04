import React, { useState, useEffect } from 'react';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

function ReasignarCasoForm({ caso, onClose, onReasignado }) {
  const [fiscales, setFiscales] = useState([]);
  const [idFiscalNuevo, setIdFiscalNuevo] = useState('');
  const [currentFiscalAsignado, setCurrentFiscalAsignado] = useState(Number(caso.id_fiscal_asignado));

  // Actualiza el fiscal actual asignado cuando cambie el caso
  useEffect(() => {
    setCurrentFiscalAsignado(Number(caso.id_fiscal_asignado));
  }, [caso]);

  // Obtiene la lista de fiscales y filtra por la misma fiscalía y que no sea el ya asignado
  useEffect(() => {
    fetch(`${API_URL}/fiscales`)
      .then(res => res.json())
      .then(data => {
        // Imprime para debug
        console.log("Datos fiscales recibidos:", data);
        const mismosFiscales = data.filter(f => {
          // Asegúrate de convertir correctamente los valores a número
          const fiscalFiscalia = Number(f.id_fiscalia);
          const casoFiscalia = Number(caso.id_fiscalia);
          const fiscalId = Number(f.id);
          // Debug de comparación
          console.log(`Comparando fiscal ${fiscalId} (f.id_fiscalia: ${fiscalFiscalia}) con caso (caso.id_fiscalia: ${casoFiscalia}) y currentFiscalAsignado: ${currentFiscalAsignado}`);
          return fiscalFiscalia === casoFiscalia && fiscalId !== currentFiscalAsignado;
        });
        console.log("Fiscales filtrados:", mismosFiscales);
        setFiscales(mismosFiscales);
      });
  }, [caso, currentFiscalAsignado]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/casos/${caso.id}/reasignar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id_fiscal_nuevo: Number(idFiscalNuevo) })
    });
    if (res.ok) {
      // Actualiza lista de casos y cierra modal
      onReasignado();
      onClose();
    } else {
      alert('Error al intentar reasignar el caso');
    }
  };

  return (
    <form className="caso-form" onSubmit={handleSubmit}>
      <h3>Reasignar Caso</h3>
      <label>
        Fiscal Nuevo:
        <select value={idFiscalNuevo} onChange={e => setIdFiscalNuevo(e.target.value)} required>
          <option value="">Seleccione...</option>
          {fiscales.map(f => (
            <option key={f.id} value={f.id}>{f.nombre}</option>
          ))}
        </select>
      </label>
      <button type="submit">Reasignar</button>
      <button type="button" onClick={onClose} style={{ marginLeft: '1rem' }}>Cancelar</button>
    </form>
  );
}

export default ReasignarCasoForm;