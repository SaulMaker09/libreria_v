// components/sidebar.jsx
import React, { useState } from "react";
import "../css/new_stryles.css";
import { NavLink } from "react-router-dom";

function Sidebar({ vistaActual, cambiarVista, cerrarSesion }) {
  const [retraido, setRetraido] = useState(false);
  const toggleSidebar = () => setRetraido(!retraido);

  return (
    <div className={`sidebar ${retraido ? "sidebar-retraido" : ""}`}>
      <div className="sidebar-toggle-btn" onClick={toggleSidebar}>
        {retraido ? "≡" : "×"}
      </div>

      {!retraido && (
        <>
          <div className="sidebar-title">📚 Librería</div>
          <a
            href="dashboard"
            onClick={() => cambiarVista("dashboard")}
            style={{ background: vistaActual === "dashboard" ? "#343a40" : "transparent" }}
          >
            🏠 Inicio
          </a>
          <NavLink
  to="/libros"
  className={({ isActive }) => isActive ? "active-link" : ""}
>
  📖 Libros
</NavLink>
          <NavLink
  to="/autores"
  className={({ isActive }) => isActive ? "active-link" : ""}
>
  ✍️ Autores
</NavLink>

          <div className="mt-4 px-3">
            <button onClick={cerrarSesion} className="btn btn-outline-danger w-100">
              🔒 Cerrar sesión
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Sidebar;
