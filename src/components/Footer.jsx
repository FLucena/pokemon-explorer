import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="app-footer py-4 border-top border-2 border-light">
      <Container>
        <Row className="g-4">
          {/* Legal Section - Left */}
          <Col md={8}>
            <h4>Información Legal</h4>
            <div className="legal-text">
              <p>
                <strong>Propósito Educativo:</strong> Esta aplicación ha sido desarrollada exclusivamente con fines educativos y de aprendizaje. No tiene fines comerciales ni busca generar ingresos.
              </p>
              <p>
                <strong>Derechos de Autor:</strong> Pokémon y todos los nombres relacionados son marcas registradas de Nintendo, Game Freak y Creatures Inc. Todos los derechos reservados.
              </p>
              <p>
                <strong>Fuente de Datos:</strong> Los datos de Pokémon son proporcionados por la{' '}
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
                <strong>Uso Justo (Fair Use):</strong> Este proyecto se rige bajo los términos de uso justo para fines educativos y de aprendizaje, según lo establecido en las leyes de propiedad intelectual.
              </p>
            </div>
          </Col>

          {/* Links Section - Right */}
          <Col md={4}>
            <h4>Enlaces Oficiales</h4>
            <div className="d-flex flex-column gap-2 mb-3">
              <Button 
                variant="outline-primary" 
                href="https://www.pokemon.com" 
                target="_blank" 
                rel="noopener noreferrer"
                size="sm"
              >
                Sitio Oficial de Pokémon
              </Button>
              <Button 
                variant="outline-primary" 
                href="https://www.nintendo.com" 
                target="_blank" 
                rel="noopener noreferrer"
                size="sm"
              >
                Nintendo
              </Button>
              <Button 
                variant="outline-primary" 
                href="https://www.gamefreak.co.jp" 
                target="_blank" 
                rel="noopener noreferrer"
                size="sm"
              >
                Game Freak
              </Button>
            </div>
            <h4>Contacto</h4>
            <ul className="list-unstyled footer-contact">
              <li>
                <a href="mailto:franciscolucena90@gmail.com" target="_blank" rel="noopener noreferrer">
                  <i className="bi bi-envelope me-2"></i> franciscolucena90@gmail.com
                </a>
              </li>
              <li>
                <a href="https://flucena.vercel.app" target="_blank" rel="noopener noreferrer">
                  <i className="bi bi-person-workspace me-2"></i> Portfolio
                </a>
              </li>
              <li>
                <a href="https://github.com/FLucena" target="_blank" rel="noopener noreferrer">
                  <i className="bi bi-github me-2"></i> GitHub
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer; 