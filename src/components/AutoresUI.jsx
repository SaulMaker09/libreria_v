import React, { useEffect, useState } from "react";
import { Button, Modal, Alert, InputGroup, Form } from "react-bootstrap";
import { obtenerAutores, crearAutor, actualizarAutor, eliminarAutor } from "../Api";
import AutorList from "../components/AutorList";
import AutorForm from "../components/AutorForm";
import { FaPlus, FaSearch } from "react-icons/fa";

const AutoresUI = () => {
  const [autores, setAutores] = useState([]);
  const [autorEditando, setAutorEditando] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    cargarAutores();
  }, []);

  const cargarAutores = async () => {
    setLoading(true);
    setError(null);
    try {
      const datos = await obtenerAutores();
      setAutores(datos);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNuevo = () => {
    setAutorEditando(null);
    setMostrarModal(true);
  };

  const handleEditar = (autor) => {
    setAutorEditando(autor);
    setMostrarModal(true);
  };

  const handleGuardar = async (datosAutor) => {
    setError(null);
    try {
      if (autorEditando) {
        if (!datosAutor.autorGuid) datosAutor.autorGuid = autorEditando.autorLibroGuid;
        await actualizarAutor(autorEditando.autorLibroGuid, datosAutor);
      } else {
        await crearAutor(datosAutor);
      }
      setMostrarModal(false);
      cargarAutores();
    } catch (e) {
      setError(e.message);
    }
  };

  const handleEliminar = async (id) => {
    setError(null);
    try {
      await eliminarAutor(id);
      setAutores(autores.filter((autor) => autor.autorLibroGuid !== id));
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div>
      <h1 className="text-white text-center mb-4">🧑‍🏫 Autores</h1>

      {error && <Alert variant="danger" className="fade-in">{error}</Alert>}

      <InputGroup className="mb-3 input-group-animated">
        <Form.Control
          placeholder="Buscar autor por nombre..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="input-search"
        />
        <Button variant="secondary" className="btn-search" onClick={() => {}}>
          <FaSearch />
        </Button>
      </InputGroup>

      <div className="text-center mb-3">
        <Button className="nuevo-libro-boton btn-animated" onClick={handleNuevo}>
          <FaPlus className="me-2" /> Nuevo Autor
        </Button>
      </div>

      <AutorList
        autores={autores.filter(autor =>
          autor.nombre.toLowerCase().includes(busqueda.toLowerCase())
        )}
        onEdit={handleEditar}
        onDelete={handleEliminar}
        loading={loading}
        className="autor-list-animated"
      />

      <Modal
        show={mostrarModal}
        onHide={() => setMostrarModal(false)}
        centered
        dialogClassName="modal-animated"
      >
        <Modal.Header closeButton>
          <Modal.Title>{autorEditando ? "Editar Autor" : "Nuevo Autor"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AutorForm
            autorEditando={autorEditando}
            onFinish={handleGuardar}
            onCancel={() => setMostrarModal(false)}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AutoresUI;
