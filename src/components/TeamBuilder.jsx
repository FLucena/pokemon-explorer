import { useState, useEffect } from 'react';
import { Card, Button, Row, Col, Spinner } from 'react-bootstrap';
import pokeballPlaceholder from '../assets/pokeball.png';
import PokemonCard from './PokemonCard';
import { Carousel, Form } from 'react-bootstrap';
import '../styles/team-builder.css';

const TeamBuilder = () => {
  const [team, setTeam] = useState(() => {
    const savedTeam = localStorage.getItem('pokemonTeam');
    return savedTeam ? JSON.parse(savedTeam) : Array(6).fill(null);
  });
  const [availablePokemon, setAvailablePokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('pokemonFavorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const [teamImgErrors, setTeamImgErrors] = useState(Array(6).fill(false));
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  useEffect(() => {
    localStorage.setItem('pokemonTeam', JSON.stringify(team));
  }, [team]);

  useEffect(() => {
    localStorage.setItem('pokemonFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const fetchRandomPokemon = async () => {
    try {
      const randomId = Math.floor(Math.random() * 151) + 1;
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Pokemon:', error);
      return null;
    }
  };

  const loadRandomPokemon = async () => {
    setLoading(true);
    const newPokemonList = await Promise.all(
      Array(12).fill().map(() => fetchRandomPokemon())
    );
    setAvailablePokemon(newPokemonList.filter(p => p !== null));
    setLoading(false);
  };

  useEffect(() => {
    const loadInitialPokemon = async () => {
      setLoading(true);
      const initialPokemon = await Promise.all(
        Array(12).fill().map(() => fetchRandomPokemon())
      );
      setAvailablePokemon(initialPokemon.filter(p => p !== null));
      setLoading(false);
    };
    loadInitialPokemon();
  }, []);

  const addToTeam = (pokemon, teamIndex) => {
    setTeam(prevTeam => {
      const newTeam = [...prevTeam];
      newTeam[teamIndex] = pokemon;
      return newTeam;
    });
  };

  const removeFromTeam = (teamIndex) => {
    setTeam(prevTeam => {
      const newTeam = [...prevTeam];
      newTeam[teamIndex] = null;
      return newTeam;
    });
  };

  const resetTeam = () => {
    if (window.confirm('¿Estás seguro de que quieres reiniciar tu equipo?')) {
      setTeam(Array(6).fill(null));
    }
  };

  const toggleFavorite = (pokemon) => {
    setFavorites(prev => {
      const isFavorite = prev.some(fav => fav.id === pokemon.id);
      if (isFavorite) {
        return prev.filter(fav => fav.id !== pokemon.id);
      } else {
        return [...prev, pokemon];
      }
    });
  };

  const isFavorite = (pokemon) => {
    return favorites.some(fav => fav.id === pokemon.id);
  };

  const displayedPokemon = showOnlyFavorites ? favorites : availablePokemon;

  if (loading) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center py-5">
        <Spinner animation="border" role="status" className="mb-3">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
        <p>Cargando Pokémon...</p>
      </div>
    );
  }

  return (
    <div className="team-builder p-4">
      <h2 className="mb-4">Constructor de Equipo</h2>
      <p className="team-builder-subtitle mb-4">Haz clic en un Pokémon para añadirlo a tu equipo</p>
      
      <Row className="g-4">
        <Col lg={4}>
          <Card className="h-80">
            <Card.Header className="d-fex justify-content-between align-items-center">
              <h3 className="mb-0">Tu Equipo</h3>
              <Button 
                variant="outline-danger" 
                size="sm"
                onClick={resetTeam}
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
                              onClick={() => toggleFavorite(pokemon)}
                            >
                              {isFavorite(pokemon) ? '★' : '☆'}
                            </Button>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => removeFromTeam(index)}
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
        </Col>

        <Col lg={8}>
          <Card className="h-100">
            <Card.Header className="d-flex justify-content-between align-items-center py-2">
              <h3 className="mb-0 fs-4">Pokémon Disponibles</h3>
              <div className="d-flex align-items-center gap-3">
                <Form.Check
                  type="checkbox"
                  id="show-only-favorites"
                  label="Mostrar solo favoritos"
                  checked={showOnlyFavorites}
                  onChange={e => setShowOnlyFavorites(e.target.checked)}
                  className="mb-0"
                />
                <Button 
                  variant="primary"
                  onClick={loadRandomPokemon}
                  className="d-flex align-items-center gap-2"
                  size="sm"
                >
                  <i className="bi bi-plus-lg"></i>
                  Cargar otros
                </Button>
              </div>
            </Card.Header>
            <Card.Body className="py-2 d-flex align-items-center">
              {displayedPokemon.length === 0 ? (
                <div className="text-center text-muted">No hay Pokémon para mostrar.</div>
              ) : (
                <Carousel
                  indicators={displayedPokemon.length > 1}
                  controls={displayedPokemon.length > 1}
                  interval={null}
                  className="pokemon-carousel w-100"
                >
                  {displayedPokemon.map((pokemon, index) => {
                    const isInTeam = team.some(slot => slot && slot.id === pokemon.id);
                    return (
                      <Carousel.Item key={`available-${pokemon.id}`}
                        style={{ minHeight: 200, display: 'flex', justifyContent: 'center' }}
                      >
                        <div style={{ opacity: isInTeam ? 0.5 : 1, pointerEvents: isInTeam ? 'none' : 'auto', width: 160 }}>
                          <PokemonCard
                            pokemon={pokemon}
                            currentPokemon={displayedPokemon[index]}
                            onNext={() => {
                              if (index < displayedPokemon.length - 1) {
                                const nextPokemon = displayedPokemon[index + 1];
                                if (!team.some(slot => slot && slot.id === nextPokemon.id)) {
                                  const emptySlotIndex = team.findIndex(slot => slot === null);
                                  if (emptySlotIndex !== -1) {
                                    addToTeam(nextPokemon, emptySlotIndex);
                                  }
                                }
                              }
                            }}
                            onPrevious={() => {
                              if (index > 0) {
                                const prevPokemon = displayedPokemon[index - 1];
                                if (!team.some(slot => slot && slot.id === prevPokemon.id)) {
                                  const emptySlotIndex = team.findIndex(slot => slot === null);
                                  if (emptySlotIndex !== -1) {
                                    addToTeam(prevPokemon, emptySlotIndex);
                                  }
                                }
                              }
                            }}
                            isCurrent={true}
                            onCardClick={() => {
                              if (isInTeam) return;
                              const emptySlotIndex = team.findIndex(slot => slot === null);
                              if (emptySlotIndex !== -1) {
                                addToTeam(pokemon, emptySlotIndex);
                              }
                            }}
                            showModalOnClick={false}
                          />
                          <Button
                            variant={isFavorite(pokemon) ? "warning" : "outline-warning"}
                            size="sm"
                            className="w-100 mt-2"
                            onClick={e => {
                              e.stopPropagation();
                              toggleFavorite(pokemon);
                            }}
                          >
                            {isFavorite(pokemon) ? '★' : '☆'}
                          </Button>
                        </div>
                      </Carousel.Item>
                    );
                  })}
                </Carousel>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default TeamBuilder; 