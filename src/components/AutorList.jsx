import React from "react";
import { Table, Button, Spinner } from "react-bootstrap";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

function AutorList({ autores, onEdit, onDelete, loading }) {
  if (loading) return <p>Cargando autores...</p>;
  if (!autores.length) return <p>No se encontraron autores.</p>;

  return (
    <div className="autor-list-container">
      <table className="autor-list-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Fecha Nacimiento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {autores.map((autor) => (
            <tr key={autor.autorLibroGuid}>
              <td>{autor.nombre}</td>
              <td>{autor.apellido}</td>
              <td>{new Date(autor.fechaNacimiento).toLocaleDateString()}</td>
              <td>
                <button className="btn btn-edit" onClick={() => onEdit(autor)}>
                  Editar
                </button>
                <button className="btn btn-delete" onClick={() => onDelete(autor.autorLibroGuid)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AutorList;
