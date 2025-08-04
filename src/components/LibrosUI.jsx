import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Alert,
  Container,
  Row,
  Col,
  Spinner,
  Card,
} from "react-bootstrap";
import {
  obtenerLibros,
  crearLibro,
  actualizarLibro,
  eliminarLibro,
} from "../Api";
import LibroForm from "./LibroForm";
import { FaPlus } from "react-icons/fa";

const Libros = ({ cerrarSesion, irDashboard }) => {
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
    <Container
      fluid
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
        padding: "40px 20px",
      }}
    >
      <Row className="mb-4 justify-content-between align-items-center">
        <Col xs="auto">
          <h1 className="text-white fw-bold" style={{ textShadow: "1px 1px 5px rgba(0,0,0,0.4)" }}>
            📚 Librería
          </h1>
        </Col>
        <Col xs="auto" className="d-flex gap-2">
          <Button variant="light" onClick={irDashboard} className="fw-semibold shadow">
            Volver al Dashboard
          </Button>
          <Button variant="danger" onClick={cerrarSesion} className="fw-semibold shadow">
            Cerrar sesión
          </Button>
        </Col>
      </Row>

      {error && (
        <Row className="justify-content-center mb-3">
          <Col xs={12} md={8}>
            <Alert variant="danger" className="shadow">
              {error}
            </Alert>
          </Col>
        </Row>
      )}

      <Row className="mb-4 justify-content-center">
        <Col xs={12} md={8} className="d-flex justify-content-end">
          <Button variant="light" className="fw-semibold shadow" onClick={handleNuevo}>
            <FaPlus className="me-2" />
            Nuevo Libro
          </Button>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col xs={12} md={10}>
          {loading ? (
            <div className="d-flex justify-content-center py-5">
              <Spinner animation="border" variant="light" />
            </div>
          ) : (
            <Row xs={1} md={2} lg={3} className="g-4">
              {libros.map((libro) => (
                <Col key={libro.libreriaMaterialId}>
                  <Card className="h-100 shadow-sm">
                    <Card.Body>
                      <Card.Title className="fw-bold">{libro.titulo || "Título no disponible"}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">{libro.autor || "Autor desconocido"}</Card.Subtitle>
                      <Card.Text>
                        {libro.descripcion ? libro.descripcion.slice(0, 100) + "..." : "Sin descripción disponible."}
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer className="d-flex justify-content-between">
                      <Button variant="outline-primary" size="sm" onClick={() => handleEditar(libro)}>
                        Editar
                      </Button>
                      <Button variant="outline-danger" size="sm" onClick={() => handleEliminar(libro.libreriaMaterialId)}>
                        Eliminar
                      </Button>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>

      <Modal show={mostrarModal} onHide={() => setMostrarModal(false)} centered contentClassName="bg-light shadow rounded">
        <Modal.Header closeButton>
          <Modal.Title>{libroEditando ? "Editar Libro" : "Nuevo Libro"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LibroForm libroEditando={libroEditando} onFinish={handleGuardar} onCancel={() => setMostrarModal(false)} />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Libros;
