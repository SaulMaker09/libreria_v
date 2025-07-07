import React, { useState } from "react";
import "../css/new_stryles.css";

function Sidebar({ vistaActual, cambiarVista }) {
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
            href="#libros"
            onClick={() => cambiarVista("libros")}
            style={{ background: vistaActual === "libros" ? "#343a40" : "transparent" }}
          >
            📖 Libros
          </a>
          <a
            href="#autores"
            onClick={() => cambiarVista("autores")}
            style={{ background: vistaActual === "autores" ? "#343a40" : "transparent" }}
          >
            ✍️ Autores
          </a>
        </>
      )}
    </div>
  );
}

export default Sidebar;
