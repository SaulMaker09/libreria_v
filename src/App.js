// App.js
import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import Sidebar from "./components/sidebar";
import Libros from "./components/LibrosUI";
import AutoresUI from "./components/AutoresUI";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";

import "./css/new_stryles.css";

function App() {
  const [authState, setAuthState] = useState({
    isAuthenticated: false
  });

  const cerrarSesion = () => {
    setAuthState({ isAuthenticated: false });
  };

  return (
    <Routes>
      {!authState.isAuthenticated ? (
        <>
          <Route path="/login" element={<Login setAuthState={setAuthState} />} />
          <Route path="/register" element={<Register setAuthState={setAuthState} />} />
          <Route path="/forgot" element={<ForgotPassword setAuthState={setAuthState} />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      ) : (
        <>
          <Route path="/" element={
            <div className="app-gradient-background">
              <Container fluid>
                <Row>
                  <Col xs={12} md={3} lg={2} className="p-0">
                    <Sidebar
                      cambiarVista={() => {}}
                      cerrarSesion={cerrarSesion}
                    />
                  </Col>
                  <Col xs={12} md={9} lg={10}>
                    <div className="py-4 px-3">
                      <Dashboard />
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          } />
          <Route path="/libros" element={<Libros />} />
          <Route path="/autores" element={<AutoresUI />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </>
      )}
    </Routes>
  );
}

export default App;
