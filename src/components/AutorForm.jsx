import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

const AutorForm = ({ autorEditando, onFinish, onCancel }) => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState(""); // nuevo estado para Apellido
  const [fechaNacimiento, setFechaNacimiento] = useState("");

  useEffect(() => {
    if (autorEditando) {
      setNombre(autorEditando.nombre || "");
      setApellido(autorEditando.apellido || ""); // cargar apellido
      setFechaNacimiento(
        autorEditando.fechaNacimiento
          ? new Date(autorEditando.fechaNacimiento).toISOString().split("T")[0]
          : ""
      );
    } else {
      setNombre("");
      setApellido("");
      setFechaNacimiento("");
    }
  }, [autorEditando]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar si quieres, por ejemplo que nombre y apellido no estén vacíos

    onFinish({
      nombre,
      apellido,  // enviar apellido
      fechaNacimiento: fechaNacimiento || null,
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="nombre">
        <Form.Label>Nombre</Form.Label>
        <Form.Control
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="apellido">
        <Form.Label>Apellido</Form.Label>
        <Form.Control
          type="text"
          placeholder="Apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="fechaNacimiento">
        <Form.Label>Fecha de Nacimiento</Form.Label>
        <Form.Control
          type="date"
          value={fechaNacimiento}
          onChange={(e) => setFechaNacimiento(e.target.value)}
        />
      </Form.Group>

      <div className="text-end">
        <Button variant="secondary" onClick={onCancel} className="me-2">
          Cancelar
        </Button>
        <Button variant="primary" type="submit">
          {autorEditando ? "Actualizar" : "Crear"}
        </Button>
      </div>
    </Form>
  );
};

export default AutorForm;
