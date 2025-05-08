import React from 'react';
import { Card, ListGroup, Badge } from 'react-bootstrap';

const DetailsTab = ({ pokemon }) => {
  return (
    <div className="pokemon-details p-4">
      <Card className="mb-4">
        <Card.Header as="h5">Habilidades</Card.Header>
        <Card.Body>
          <div className="d-flex flex-wrap gap-2">
            {pokemon.abilities.map(ability => (
              <Badge 
                key={ability.ability.name} 
                bg="primary" 
                className="text-capitalize"
              >
                {ability.ability.name}
              </Badge>
            ))}
          </div>
        </Card.Body>
      </Card>

      <Card>
        <Card.Header as="h5">Características</Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item className="d-flex justify-content-between align-items-center">
            <span className="fw-bold">Altura:</span>
            <span>{pokemon.height / 10}m</span>
          </ListGroup.Item>
          <ListGroup.Item className="d-flex justify-content-between align-items-center">
            <span className="fw-bold">Peso:</span>
            <span>{pokemon.weight / 10}kg</span>
          </ListGroup.Item>
          <ListGroup.Item className="d-flex justify-content-between align-items-center">
            <span className="fw-bold">Experiencia base:</span>
            <span>{pokemon.base_experience}</span>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </div>
  );
};

export default DetailsTab; 