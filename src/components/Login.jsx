import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = ({ setAuthState }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://erickv1.somee.com/api/User/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Guarda tokens en localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('refreshToken', data.refreshToken);

        // Actualiza el estado de autenticación global
        setAuthState({ isAuthenticated: true });

        setMensaje('Inicio de sesión exitoso.');
        navigate('/dashboard'); // Asegúrate de que esta ruta sea válida
      } else {
        setMensaje('Credenciales inválidas. Intenta de nuevo.');
      }
    } catch (error) {
      setMensaje('Error al iniciar sesión. Intenta más tarde.');
    }
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');

      await fetch('https://erickv1.somee.com/api/User/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // opcional, según tu API
          'Content-Type': 'application/json'
        }
      });

      // Limpia tokens y estado
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      setAuthState({ isAuthenticated: false });
      setMensaje('Sesión cerrada.');
    } catch (error) {
      setMensaje('Error al cerrar sesión.');
    }
  };

  return (
    <div className="d-flex vh-100">
      <div className="w-50 bg-light d-flex align-items-center justify-content-center">
        <form className="p-4 bg-white shadow rounded w-75" onSubmit={handleLogin}>
          <h3 className="mb-3">Iniciar sesión</h3>
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
          <button className="btn btn-primary w-100 mb-2" type="submit">Entrar</button>
          <button type="button" className="btn btn-secondary w-100 mb-2" onClick={handleLogout}>Cerrar sesión</button>
          <button type="button" className="btn btn-link w-100" onClick={() => navigate('/forgot')}>¿Olvidaste tu contraseña?</button>
          <button type="button" className="btn btn-link w-100" onClick={() => navigate('/register')}>¿No tienes cuenta? Regístrate</button>
          {mensaje && <div className="alert alert-info mt-3">{mensaje}</div>}
        </form>
      </div>
      <div
        className="w-50 bg-primary text-white d-flex align-items-center justify-content-center"
        style={{ background: 'linear-gradient(135deg, #007bff, #00c6ff)' }}
      >
        <h1 className="display-4">Bienvenido</h1>
      </div>
    </div>
  );
};

export default Login;
