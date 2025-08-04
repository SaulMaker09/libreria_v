// components/Dashboard.jsx
import React from 'react';
import '../css/Dash.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container text-center">
      <h1 className="dashboard-title">👋 ¡Bienvenido a tu Biblioteca Digital!</h1>
      <p className="dashboard-subtitle">
        Usa el menú lateral para comenzar a explorar los libros y autores.
      </p>
      <img
        src="https://cdn-icons-png.flaticon.com/512/3285/3285391.png"
        alt="Bienvenida"
        style={{ maxWidth: '300px', marginTop: '2rem' }}
      />
    </div>
  );
};

export default Dashboard;
