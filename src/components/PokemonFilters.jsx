import React from 'react';
import { Form, InputGroup, Button, Row, Col, ButtonGroup, Container } from 'react-bootstrap';
import './PokemonFilters.css';

const PokemonFilters = ({
  filters,
  onFilterChange,
  onRefresh,
  layout,
  onLayoutChange
}) => {
  const handleSearchChange = (e) => {
    onFilterChange({
      ...filters,
      search: e.target.value
    });
  };

  const handleTypeChange = (e) => {
    onFilterChange({
      ...filters,
      type: e.target.value
    });
  };

  const handleSortChange = (e) => {
    onFilterChange({
      ...filters,
      sortBy: e.target.value
    });
  };

  return (
    <Container>
      <Row className="pokemon-filters justify-content-center align-items-center g-3">
        <Col xs={12} md={3}>
          <InputGroup>
            <InputGroup.Text>
              <i className="bi bi-search"></i>
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Buscar Pokémon"
              value={filters.search}
              onChange={handleSearchChange}
              size="sm"
            />
          </InputGroup>
        </Col>
        
        <Col xs={12} md={3}>
          <Form.Select
            value={filters.type}
            onChange={handleTypeChange}
            size="sm"
          >
            <option value="all">Todos los tipos</option>
            <option value="normal">Normal</option>
            <option value="fire">Fuego</option>
            <option value="water">Agua</option>
            <option value="electric">Eléctrico</option>
            <option value="grass">Planta</option>
            <option value="ice">Hielo</option>
            <option value="fighting">Lucha</option>
            <option value="poison">Veneno</option>
            <option value="ground">Tierra</option>
            <option value="flying">Volador</option>
            <option value="psychic">Psíquico</option>
            <option value="bug">Bicho</option>
            <option value="rock">Roca</option>
            <option value="ghost">Fantasma</option>
            <option value="dragon">Dragón</option>
            <option value="dark">Siniestro</option>
            <option value="steel">Acero</option>
            <option value="fairy">Hada</option>
          </Form.Select>
        </Col>

        <Col xs={12} md={3}>
          <Form.Select
            value={filters.sortBy}
            onChange={handleSortChange}
            size="sm"
          >
            <option value="id">Ordenar por ID</option>
            <option value="name">Ordenar por Nombre</option>
            <option value="type">Ordenar por Tipo</option>
          </Form.Select>
        </Col>

        <Col xs={12} md={2}>
          <div className="d-flex">
            <ButtonGroup>
              <Button
                variant={layout === 'grid' ? 'primary' : 'outline-primary'}
                onClick={() => onLayoutChange('grid')}
                title="Vista de cuadrícula"
              >
                <i className="bi bi-grid-3x3-gap"></i>
              </Button>
              <Button
                variant={layout === 'list' ? 'primary' : 'outline-primary'}
                onClick={() => onLayoutChange('list')}
                title="Vista de lista"
              >
                <i className="bi bi-list"></i>
              </Button>
              <Button
                variant={layout === 'compact' ? 'primary' : 'outline-primary'}
                onClick={() => onLayoutChange('compact')}
                title="Vista compacta"
              >
                <i className="bi bi-grid"></i>
              </Button>
            </ButtonGroup>
            <Button
              variant="outline-primary"
              onClick={onRefresh}
              title="Refrescar Pokémon"
            >
              <i className="bi bi-arrow-clockwise"></i>
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default PokemonFilters; 