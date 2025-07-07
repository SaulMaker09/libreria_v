import React from "react";
import { Table, Button, Spinner } from "react-bootstrap";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import "../css/new_stryles.css";

function LibroList({ libros, onEdit, onDelete, loading }) {
  if (loading) {
    return (
      <div className="text-center py-5 fade-in">
        <Spinner animation="border" variant="light" />
      </div>
    );
  }

  if (libros.length === 0) {
    return (
      <p className="text-center text-light fs-5 fade-in">
        No hay libros para mostrar.
      </p>
    );
  }

  return (
    <div className="table-container fade-in">
      <Table
        responsive
        bordered
        hover
        className="modern-table shadow-lg rounded-4 overflow-hidden text-light"
      >
        <thead className="table-custom-header">
          <tr>
            <th>Título</th>
            <th>Fecha Publicación</th>
            <th>Autor (ID)</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {libros.map((libro) => (
            <tr key={libro.libreriaMaterialId}>
              <td>{libro.titulo}</td>
              <td>{new Date(libro.fechaPublicacion).toLocaleDateString()}</td>
              <td>{libro.autorLibro}</td>
              <td>
                <Button
                  variant="outline-warning"
                  size="sm"
                  onClick={() => onEdit(libro)}
                  className="me-2 action-button"
                >
                  <FaEdit className="me-1" /> Editar
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar el libro "${libro.titulo}"?`)) {
      onDelete(libro.libreriaMaterialId);
    }
  }}
                  className="action-button"
                >
                  <FaTrashAlt className="me-1" /> Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default LibroList;
