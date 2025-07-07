import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { obtenerAutores } from "../Api";

function LibroForm({ libroEditando, onFinish, onCancel }) {
  const [titulo, setTitulo] = useState("");
  const [fechaPublicacion, setFechaPublicacion] = useState("");
  const [autorLibro, setAutorLibro] = useState("");
  const [autores, setAutores] = useState([]);

  useEffect(() => {
    // Cargar autores desde el microservicio de Autor
    const cargarAutores = async () => {
      try {
        const lista = await obtenerAutores();
        setAutores(lista);
      } catch (error) {
        console.error("Error al obtener autores:", error);
      }
    };

    cargarAutores();
  }, []);

  useEffect(() => {
    if (libroEditando) {
      setTitulo(libroEditando.titulo);
      setFechaPublicacion(libroEditando.fechaPublicacion?.split("T")[0] || "");
      setAutorLibro(libroEditando.autorLibro); // Aquí ya deberías tener el Guid
    } else {
      setTitulo("");
      setFechaPublicacion("");
      setAutorLibro("");
    }
  }, [libroEditando]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!titulo || !fechaPublicacion || !autorLibro) {
      alert("Por favor, complete todos los campos.");
      return;
    }
    onFinish({ titulo, fechaPublicacion, autorLibro });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formTitulo">
        <Form.Label>Título</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingrese título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formFechaPublicacion">
        <Form.Label>Fecha de Publicación</Form.Label>
        <Form.Control
          type="date"
          value={fechaPublicacion}
          onChange={(e) => setFechaPublicacion(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formAutorLibro">
        <Form.Label>Autor</Form.Label>
        <Form.Select
          value={autorLibro}
          onChange={(e) => setAutorLibro(e.target.value)}
          required
        >
          <option value="">-- Selecciona un autor --</option>
          {autores.map((autor) => (
            <option key={autor.autorLibroGuid} value={autor.autorLibroGuid}>
              {autor.nombre} {autor.apellido}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <div className="d-flex justify-content-end">
        <Button variant="secondary" onClick={onCancel} className="me-2">
          Cancelar
        </Button>
        <Button variant="primary" type="submit">
          Guardar
        </Button>
      </div>
    </Form>
  );
}

export default LibroForm;
