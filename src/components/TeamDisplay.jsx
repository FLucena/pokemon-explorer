import { Card, Button, Row, Col } from 'react-bootstrap';
import pokeballPlaceholder from '../assets/pokeball.png';

const TeamDisplay = ({ team, onRemoveFromTeam, onToggleFavorite, isFavorite, teamImgErrors, setTeamImgErrors, onResetTeam }) => {
  return (
    <Card className="h-80">
      <Card.Header className="d-fex justify-content-between align-items-center">
        <h3 className="mb-0">Tu Equipo</h3>
        <Button 
          variant="outline-danger" 
          size="sm"
          onClick={onResetTeam}
          className="d-flex align-items-center gap-2"
          disabled={team.every(slot => slot === null)}
        >
          <i className="bi bi-arrow-counterclockwise"></i>
          Reiniciar
        </Button>
      </Card.Header>
      <Card.Body>
        <Row className="g-3">
          {team.map((pokemon, index) => (
            <Col key={`team-slot-${index}`} xs={6} md={4}>
              {pokemon ? (
                <Card className="h-100">
                  <Card.Img 
                    variant="top"
                    src={teamImgErrors[index] ? pokeballPlaceholder : pokemon.sprites.front_default}
                    alt={pokemon.name}
                    onError={() => setTeamImgErrors(errors => {
                      const newErrors = [...errors];
                      newErrors[index] = true;
                      return newErrors;
                    })}
                  />
                  <Card.Body className="p-2">
                    <Card.Title className="text-capitalize h6 mb-2">{pokemon.name}</Card.Title>
                    <div className="d-flex justify-content-between">
                      <Button
                        variant={isFavorite(pokemon) ? "warning" : "outline-warning"}
                        size="sm"
                        onClick={() => onToggleFavorite(pokemon)}
                      >
                        {isFavorite(pokemon) ? '★' : '☆'}
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => onRemoveFromTeam(index)}
                      >
                        ✕
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              ) : (
                <Card className="h-100 d-flex flex-column align-items-center">
                  <Card.Img 
                    variant="top"
                    src={pokeballPlaceholder}
                    alt={`Slot ${index + 1}`}
                    style={{ width: '96px', height: '96px', objectFit: 'contain', marginTop: '16px' }}
                  />
                  <Card.Body className="p-2 d-flex flex-column align-items-center justify-content-center">
                    <Card.Title className="h6 mb-2 text-muted">{`Slot ${index + 1}`}</Card.Title>
                  </Card.Body>
                </Card>
              )}
            </Col>
          ))}
        </Row>
      </Card.Body>
    </Card>
  );
};

export default TeamDisplay; 