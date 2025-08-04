import React, { useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useTheme } from '../ThemeContext';

function AuthLayout() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="container">
      <nav>
        <button onClick={() => navigate('/')}>Login</button>
        <button onClick={() => navigate('/registro')}>Registro</button>
        <button onClick={() => navigate('/recuperar')}>Recuperar</button>
        <button onClick={toggleTheme} className="theme-toggle" title="Cambiar tema">
          <i className={`bi ${theme === 'dark' ? 'bi-moon' : 'bi-sun'}`}></i>
        </button>
      </nav>

      {/* Aquí se renderiza el formulario correspondiente */}
      <Outlet />
    </div>
  );
}

export default AuthLayout;
