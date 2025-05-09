import { Card, Button, Form, Carousel, Spinner } from 'react-bootstrap';
import PokemonCard from './PokemonCard';

const AvailablePokemon = ({ 
  displayedPokemon, 
  team, 
  showOnlyFavorites, 
  setShowOnlyFavorites, 
  onLoadRandomPokemon, 
  onAddToTeam, 
  onToggleFavorite, 
  isFavorite, 
  loading 
}) => {
  // Filter out Pokémon that are already in the team
  const availablePokemon = displayedPokemon.filter(pokemon => 
    !team.some(slot => slot && slot.id === pokemon.id)
  );

  return (
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
            onClick={onLoadRandomPokemon}
            className="d-flex align-items-center gap-2"
            size="sm"
          >
            <i className="bi bi-plus-lg"></i>
            Cargar otros
          </Button>
        </div>
      </Card.Header>
      <Card.Body className="py-2 d-flex align-items-center justify-content-center" style={{ height: '100%' }}>
        {loading ? (
          <div className="d-flex justify-content-center align-items-center w-100" style={{ minHeight: 220 }}>
            <Spinner animation="border" size="lg" />
          </div>
        ) : availablePokemon.length === 0 ? (
          <div className="text-center text-muted">No hay Pokémon para mostrar.</div>
        ) : (
          <Carousel
            indicators={availablePokemon.length > 1}
            controls={availablePokemon.length > 1}
            interval={null}
            className="pokemon-carousel w-100 h-100"
            style={{ display: 'flex', alignItems: 'center', overflow: 'visible' }}
          >
            {availablePokemon.map((pokemon, index) => (
              <Carousel.Item
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 0, overflow: 'visible' }}
              >
                <div style={{ width: 200, overflow: 'visible', margin: 0, paddingTop: 24 }}>
                  <PokemonCard
                    pokemon={pokemon}
                    currentPokemon={availablePokemon[index]}
                    onNext={() => {
                      if (index < availablePokemon.length - 1) {
                        const nextPokemon = availablePokemon[index + 1];
                        const emptySlotIndex = team.findIndex(slot => slot === null);
                        if (emptySlotIndex !== -1) {
                          onAddToTeam(nextPokemon, emptySlotIndex);
                        }
                      }
                    }}
                    onPrevious={() => {
                      if (index > 0) {
                        const prevPokemon = availablePokemon[index - 1];
                        const emptySlotIndex = team.findIndex(slot => slot === null);
                        if (emptySlotIndex !== -1) {
                          onAddToTeam(prevPokemon, emptySlotIndex);
                        }
                      }
                    }}
                    isCurrent={true}
                    onCardClick={() => {
                      const emptySlotIndex = team.findIndex(slot => slot === null);
                      if (emptySlotIndex !== -1) {
                        onAddToTeam(pokemon, emptySlotIndex);
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
                      onToggleFavorite(pokemon);
                    }}
                  >
                    {isFavorite(pokemon) ? '★' : '☆'}
                  </Button>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        )}
      </Card.Body>
    </Card>
  );
};

export default AvailablePokemon; 