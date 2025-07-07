// components/Libros.jsx
import React, { useEffect, useState } from "react";
import { Button, Modal, Alert } from "react-bootstrap";
import { obtenerLibros, crearLibro, actualizarLibro, eliminarLibro } from "../Api";
import LibroList from "./LibroList";
import LibroForm from "./LibroForm";
import { FaPlus } from "react-icons/fa";

const Libros = () => {
  const [libros, setLibros] = useState([]);
  const [libroEditando, setLibroEditando] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    cargarLibros();
  }, []);

  const cargarLibros = async () => {
    setLoading(true);
    setError(null);
    try {
      const datos = await obtenerLibros();
      setLibros(datos);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNuevo = () => {
    setLibroEditando(null);
    setMostrarModal(true);
  };

  const handleEditar = (libro) => {
    setLibroEditando(libro);
    setMostrarModal(true);
  };

  const handleGuardar = async (datosLibro) => {
    setError(null);
    try {
      if (libroEditando) {
        await actualizarLibro(libroEditando.libreriaMaterialId, datosLibro);
      } else {
        await crearLibro(datosLibro);
      }
      setMostrarModal(false);
      cargarLibros();
    } catch (e) {
      setError(e.message);
    }
  };

  const handleEliminar = async (id) => {
    setError(null);
    try {
      await eliminarLibro(id);
      setLibros(libros.filter((libro) => libro.libreriaMaterialId !== id));
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div>
      <h1 className="text-white text-center">📚 Librería</h1>

      {error && <Alert variant="danger">{error}</Alert>}

      <div className="text-center mb-3">
        <Button className="nuevo-libro-boton" onClick={handleNuevo}>
          <FaPlus className="me-2" /> Nuevo Libro
        </Button>
      </div>

      <LibroList libros={libros} onEdit={handleEditar} onDelete={handleEliminar} loading={loading} />

      <Modal show={mostrarModal} onHide={() => setMostrarModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{libroEditando ? "Editar Libro" : "Nuevo Libro"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LibroForm
            libroEditando={libroEditando}
            onFinish={handleGuardar}
            onCancel={() => setMostrarModal(false)}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Libros;
