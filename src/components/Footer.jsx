import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="app-footer py-2 border-top border-2 border-light">
      <Container>
        <Row className="g-4">
          {/* Legal Section - Left */}
          <Col md={8}>
            <h4>Legal</h4>
            <div className="legal-text">
              <p>
                Esta aplicación es únicamente con fines educativos y no tiene fines comerciales.
                Todos los derechos de Pokémon pertenecen a Nintendo, Game Freak y Creatures Inc.
              </p>
              <p>
                Los datos de Pokémon son proporcionados por la{' '}
                <Button 
                  variant="link" 
                  href="https://pokeapi.co/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-decoration-none p-0"
                >
                  PokeAPI
                </Button>
                , un servicio gratuito para uso educativo.
              </p>
              <p>
                Este proyecto se rige bajo los términos de uso justo (Fair Use) para fines educativos
                y de aprendizaje.
              </p>
            </div>
          </Col>

          {/* Pokémon Explorer Section - Center */}
          <Col md={4}>
            <div className="d-flex flex-column text-center text-md-start">
              <h4 className="fs-3 fs-md-4">Pokémon Explorer</h4>
              <p>Una aplicación para explorar y aprender sobre Pokémon</p>
              <div className="d-flex gap-3 mb-2 justify-content-center justify-content-md-start">
                <Button 
                  variant="outline-light" 
                  href="https://github.com/FLucena" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="d-flex align-items-center gap-2"
                >
                  <i className="bi bi-github"></i>
                  <span>@FLucena</span>
                </Button>
                <Button 
                  variant="outline-light"
                  href="https://flucena.vercel.app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="d-flex align-items-center gap-2"
                >
                  <i className="bi bi-person-workspace"></i>
                  <span>Portfolio</span>
                </Button>
              </div>
              
              {/* Contact Section - Below Explorer for all screens */}
              <div className="mt-3">
                <h4 className="fs-5 fs-md-4">Contacto</h4>
                <ul className="list-unstyled">
                  <li>
                    <Button 
                      variant="link" 
                      href="mailto:franciscolucena90@gmail.com"
                      className="text-decoration-none p-0"
                      style={{ fontSize: '0.75rem' }}
                    >
                      <i className="bi bi-envelope me-2"></i>
                      franciscolucena90@gmail.com
                    </Button>
                  </li>
                </ul>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <div className="footer-bottom text-center">
        <p className="mb-0">&copy; {new Date().getFullYear()} Pokémon Explorer. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer; 