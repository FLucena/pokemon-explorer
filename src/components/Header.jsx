import React from 'react';
import { Navbar, Container, Alert } from 'react-bootstrap';

const Header = () => {
  return (
    <>
      <Navbar bg="light" expand="lg" className="app-header">
        <Container>
          <Navbar.Brand className="d-flex align-items-center">
            <div className="logo-container me-3">
              <img 
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png" 
                alt="Pikachu" 
                className="header-logo"
                style={{ width: '50px', height: '50px' }}
              />
            </div>
            <div className="header-text">
              <h1 className="mb-0">Pokémon Explorer</h1>
              <p className="subtitle mb-0">Explora y Adivina Pokémon</p>
            </div>
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Alert variant="info" className="m-0 py-2 text-center">
        <small>
          Esta es una aplicación educativa sin fines comerciales. Pokémon y todos los nombres relacionados son marcas registradas de Nintendo, Game Freak y Creatures Inc. 
          <br />
          Los datos son proporcionados por <a href="https://pokeapi.co/" target="_blank" rel="noopener noreferrer">PokeAPI</a> para uso educativo.
        </small>
      </Alert>
    </>
  );
};

export default Header; 