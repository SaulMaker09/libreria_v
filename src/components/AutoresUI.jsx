import React, { useEffect, useState } from "react";
import { Button, Modal, Alert, InputGroup, Form, Container, Row, Col, Spinner } from "react-bootstrap";
import { obtenerAutores, crearAutor, actualizarAutor, eliminarAutor } from "../Api";
import AutorList from "../components/AutorList";
import AutorForm from "../components/AutorForm";
import { FaPlus, FaSearch } from "react-icons/fa";

const AutoresUI = ({ cerrarSesion, irDashboard }) => {
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
    <Container fluid style={{ minHeight: "100vh", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", padding: "40px 20px" }}>
      <Row className="justify-content-between align-items-center mb-4">
        <Col xs="auto" className="text-white fw-bold" style={{ textShadow: "1px 1px 5px rgba(0,0,0,0.4)", fontSize: '2rem' }}>
          🧑‍🏫 Autores
        </Col>
        <Col xs="auto" className="d-flex gap-2">
          <Button variant="light" className="fw-semibold shadow" onClick={irDashboard}>
            Volver al Dashboard
          </Button>
          <Button variant="danger" className="fw-semibold shadow" onClick={cerrarSesion}>
            Cerrar sesión
          </Button>
        </Col>
      </Row>

      {error && (
        <Row className="justify-content-center mb-3">
          <Col xs={12} md={8}>
            <Alert variant="danger" className="shadow">{error}</Alert>
          </Col>
        </Row>
      )}

      <Row className="justify-content-center mb-3">
        <Col xs={12} md={8}>
          <InputGroup>
            <Form.Control
              placeholder="Buscar autor por nombre..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              style={{ borderRadius: "0.375rem 0 0 0.375rem" }}
            />
            <Button variant="light" style={{ borderRadius: "0 0.375rem 0.375rem 0" }}>
              <FaSearch />
            </Button>
          </InputGroup>
        </Col>
      </Row>

      <Row className="justify-content-center mb-4">
        <Col xs={12} md={8} className="d-flex justify-content-end">
          <Button variant="light" className="fw-semibold shadow" onClick={handleNuevo}>
            <FaPlus className="me-2" />
            Nuevo Autor
          </Button>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          {loading ? (
            <div className="d-flex justify-content-center py-5">
              <Spinner animation="border" variant="light" />
            </div>
          ) : (
            <AutorList
              autores={autores.filter((autor) => autor.nombre.toLowerCase().includes(busqueda.toLowerCase()))}
              onEdit={handleEditar}
              onDelete={handleEliminar}
            />
          )}
        </Col>
      </Row>

      <Modal
        show={mostrarModal}
        onHide={() => setMostrarModal(false)}
        centered
        dialogClassName="modal-animated"
        contentClassName="bg-light shadow rounded"
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
    </Container>
  );
};

export default AutoresUI;
