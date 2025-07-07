// App.js
import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "./components/sidebar";
import Libros from "./components/LibrosUI";
import AutoresUI from "./components/AutoresUI";
import "./css/new_stryles.css";

function App() {
  const [vista, setVista] = useState("libros");

  return (
    <div className="app-gradient-background">
      <Container fluid>
        <Row>
          <Col xs={12} md={3} lg={2} className="p-0">
            <Sidebar cambiarVista={setVista} vistaActual={vista} />
          </Col>
          <Col xs={12} md={9} lg={10}>
            <div className="py-4 px-3">
              {vista === "libros" && <Libros />}
              {vista === "autores" && <AutoresUI />}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
