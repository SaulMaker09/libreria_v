import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleVolverLogin = () => {
    navigate('/');
  };

  return (
    <div className="container">
      <h2>Bienvenido</h2>
      <p>Has iniciado sesión correctamente.</p>

      <button onClick={handleVolverLogin} style={styles.boton}>
        Ir al inicio de sesión
      </button>
    </div>
  );
}

const styles = {
  boton: {
    marginTop: '1rem',
    padding: '0.75rem',
    borderRadius: '10px',
    background: 'var(--color-primary)',
    color: 'var(--color-btn-text)',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.3s ease'
  }
};

export default Home;
