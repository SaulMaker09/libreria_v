import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const response = await fetch('https://erickv1.somee.com/api/User/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: nombre, password, email, descripcion: '' }),
    });

    if (response.ok) {
      setMensaje('Registro exitoso. Ahora puedes iniciar sesión.');
      navigate('/login');
    } else {
      setMensaje('Error en el registro. Intenta de nuevo.');
    }
  };

  return (
    <div className="d-flex vh-100">
      <div className="w-50 bg-light d-flex align-items-center justify-content-center">
        <form className="p-4 bg-white shadow rounded w-75" onSubmit={handleRegister}>
          <h3 className="mb-3">Registrarse</h3>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="form-control mb-3"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="btn btn-primary w-100 mb-2" type="submit">Registrarse</button>
          <button type="button" className="btn btn-link w-100" onClick={() => navigate('/login')}>
            ¿Ya tienes cuenta? Inicia sesión
          </button>
          {mensaje && <div className="alert alert-info mt-3">{mensaje}</div>}
        </form>
      </div>
      <div
        className="w-50 bg-primary text-white d-flex align-items-center justify-content-center"
        style={{ background: 'linear-gradient(135deg, #007bff, #00c6ff)' }}
      >
        <h1 className="display-4">Crea tu cuenta</h1>
      </div>
    </div>
  );
};

export default Register;
