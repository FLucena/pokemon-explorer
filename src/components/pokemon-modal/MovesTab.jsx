import React, { useState } from 'react';
import { Form, ButtonGroup, Button, Card, Row, Col, Pagination } from 'react-bootstrap';

const MovesTab = ({ moves }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const movesPerPage = 12;

  const filteredMoves = moves.filter(move => {
    const matchesSearch = move.move.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || move.move.name.includes(selectedType);
    return matchesSearch && matchesType;
  });

  // Calculate pagination
  const indexOfLastMove = currentPage * movesPerPage;
  const indexOfFirstMove = indexOfLastMove - movesPerPage;
  const currentMoves = filteredMoves.slice(indexOfFirstMove, indexOfLastMove);
  const totalPages = Math.ceil(filteredMoves.length / movesPerPage);

  const moveTypes = ['all', 'physical', 'special', 'status'];

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedType]);

  return (
    <div className="moves-container p-4">
      <div className="moves-filters mb-4">
        <Row className="g-3">
          <Col md={6}>
            <Form.Control
              type="text"
              placeholder="Buscar movimientos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-3 mb-md-0"
            />
          </Col>
          <Col md={6}>
            <ButtonGroup className="w-100">
              {moveTypes.map(type => (
                <Button
                  key={type}
                  variant={selectedType === type ? 'primary' : 'outline-primary'}
                  onClick={() => setSelectedType(type)}
                  className="text-capitalize"
                >
                  {type}
                </Button>
              ))}
            </ButtonGroup>
          </Col>
        </Row>
      </div>

      <Row className="g-3">
        {currentMoves.map(move => (
          <Col key={move.move.name} xs={12} sm={6} md={4} lg={3}>
            <Card className="h-100">
              <Card.Body>
                <Card.Title className="text-capitalize h5 mb-2">
                  {move.move.name.replace(/-/g, ' ')}
                </Card.Title>
                <Card.Text className="d-flex justify-content-between text-muted small">
                  <span>Nivel {move.version_group_details[0].level_learned_at}</span>
                  <span className="text-capitalize">
                    {move.version_group_details[0].move_learn_method.name}
                  </span>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <Pagination>
            <Pagination.First 
              onClick={() => handlePageChange(1)} 
              disabled={currentPage === 1}
            />
            <Pagination.Prev 
              onClick={() => handlePageChange(currentPage - 1)} 
              disabled={currentPage === 1}
            />
            
            {[...Array(totalPages)].map((_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}

            <Pagination.Next 
              onClick={() => handlePageChange(currentPage + 1)} 
              disabled={currentPage === totalPages}
            />
            <Pagination.Last 
              onClick={() => handlePageChange(totalPages)} 
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default MovesTab; 