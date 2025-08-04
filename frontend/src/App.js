import React, { useContext } from 'react';
import Login from './components/Login';
import CasosTable from './components/CasosTable';
import EstadisticasCasos from './components/EstadisticasCasos';
import LogsReasignacionTable from './components/LogsReasignacionTable';
import CasoForm from './components/CasoForm';
import { AuthContext, AuthProvider } from './contexts/AuthContext';

function AppContent() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [showEstadisticas, setShowEstadisticas] = React.useState(false);
  const [showLogs, setShowLogs] = React.useState(false);
  const [showCreateModal, setShowCreateModal] = React.useState(false);
  const [refresh, setRefresh] = React.useState(0);

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <div>
      <button
        onClick={logout}
        style={{
          background: '#cc0000',
          color: '#fff',
          padding: '0.75rem 1.5rem',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          margin: '1rem auto',
          display: 'block'
        }}
      >
        Logout
      </button>
      <button
        onClick={() => setShowEstadisticas(!showEstadisticas)}
        style={{
          background: '#003366',
          color: '#FFD600',
          padding: '0.75rem 1.5rem',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          margin: '1rem auto',
          display: 'block'
        }}
      >
        {showEstadisticas ? 'Ocultar Estadísticas' : 'Ver Estadísticas de Casos'}
      </button>
      {showEstadisticas && <EstadisticasCasos />}

      <button
        style={{
          background: '#003366',
          color: '#FFD600',
          border: 'none',
          padding: '0.75rem 1.5rem',
          borderRadius: '4px',
          fontWeight: 'bold',
          cursor: 'pointer',
          margin: '1rem auto',
          display: 'block'
        }}
        onClick={() => setShowLogs(!showLogs)}
      >
        {showLogs ? 'Ocultar Logs' : 'Ver Logs de Reasignación'}
      </button>
      {showLogs && <LogsReasignacionTable />}

      <CasosTable key={refresh} />

      <button
        style={{
          background: '#003366',
          color: '#FFD600',
          border: 'none',
          padding: '0.75rem 1.5rem',
          borderRadius: '4px',
          fontWeight: 'bold',
          cursor: 'pointer',
          margin: '2rem auto',
          display: 'block'
        }}
        onClick={() => setShowCreateModal(true)}
      >
        Registrar Nuevo Caso
      </button>

      {showCreateModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowCreateModal(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#fff',
              padding: '2rem',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              minWidth: '350px'
            }}
          >
            <CasoForm onCasoCreado={() => setRefresh(refresh + 1)} />
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;