import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [descripcion, setDescripcion] = useState(''); // para la respuesta de seguridad si tu API lo pide
  const [nuevaPassword, setNuevaPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();

    // Ajusta si tu API requiere descripcion y nuevaPassword o solo email
    const response = await fetch('https://erickv1.somee.com/api/User/update-password', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, descripcion, nuevaPassword }),
    });

    if (response.ok) {
      setMensaje('Contraseña actualizada correctamente.');
      navigate('/login');
    } else {
      setMensaje('No se pudo actualizar la contraseña. Intenta de nuevo.');
    }
  };

  return (
    <div className="d-flex vh-100">
      <div className="w-50 bg-light d-flex align-items-center justify-content-center">
        <form className="p-4 bg-white shadow rounded w-75" onSubmit={handleReset}>
          <h3 className="mb-3">Recuperar contraseña</h3>
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Respuesta seguridad"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
          <input
            type="password"
            className="form-control mb-3"
            placeholder="Nueva contraseña"
            value={nuevaPassword}
            onChange={(e) => setNuevaPassword(e.target.value)}
            required
          />
          <button className="btn btn-primary w-100 mb-2" type="submit">Actualizar contraseña</button>
          <button type="button" className="btn btn-link w-100" onClick={() => navigate('/login')}>
            Volver al inicio
          </button>
          {mensaje && <div className="alert alert-info mt-3">{mensaje}</div>}
        </form>
      </div>
      <div
        className="w-50 bg-primary text-white d-flex align-items-center justify-content-center"
        style={{ background: 'linear-gradient(135deg, #007bff, #00c6ff)' }}
      >
        <h1 className="display-4">¿Olvidaste tu contraseña?</h1>
      </div>
    </div>
  );
};

export default ForgotPassword;
