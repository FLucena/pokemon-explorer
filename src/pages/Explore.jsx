import { useState } from 'react'
import PokemonCard from '../components/PokemonCard'
import PokemonFilters from '../components/PokemonFilters'
import usePokemons from '../hooks/usePokemons'

const Explore = () => {
  const { pokemons, loading, error, refreshPokemons } = usePokemons();
  const [filters, setFilters] = useState({
    search: '',
    type: 'all',
    sortBy: 'id'
  });
  const [currentPokemonIndex, setCurrentPokemonIndex] = useState(0);
  const [layout, setLayout] = useState('grid');

  const filteredPokemons = pokemons
    .filter(pokemon => {
      const matchesSearch = pokemon.name.toLowerCase().includes(filters.search.toLowerCase());
      const matchesType = filters.type === 'all' || 
        pokemon.types.some(type => type.type.name === filters.type);
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'type':
          return a.types[0].type.name.localeCompare(b.types[0].type.name);
        default:
          return a.id - b.id;
      }
    });

  const handleNextPokemon = () => {
    setCurrentPokemonIndex((prevIndex) => 
      prevIndex === filteredPokemons.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePreviousPokemon = () => {
    setCurrentPokemonIndex((prevIndex) => 
      prevIndex === 0 ? filteredPokemons.length - 1 : prevIndex - 1
    );
  };

  const handleCardClick = (index) => {
    setCurrentPokemonIndex(index);
  };

  if (error) {
    return (
      <div className="error-container">
        <h2>Error loading Pokémon data</h2>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <>
      <PokemonFilters 
        filters={filters} 
        onFilterChange={setFilters}
        onRefresh={refreshPokemons}
        layout={layout}
        onLayoutChange={setLayout}
      />
      {error ? (
        <div className="error-container">
          <h2>Error</h2>
          <p>{error}</p>
        </div>
      ) : loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando Pokémon...</p>
        </div>
      ) : filteredPokemons.length === 0 ? (
        <div className="no-results-container">
          <i className="bi bi-emoji-frown"></i>
          <h3>No se encontraron Pokémon</h3>
          <p>Intenta con otros filtros o refresca la lista</p>
        </div>
      ) : (
        <div className={`pokemon-container ${layout}`}>
          {filteredPokemons.map((pokemon, index) => (
            <PokemonCard 
              key={`${pokemon.id}-${index}`}
              pokemon={pokemon}
              currentPokemon={filteredPokemons[currentPokemonIndex]}
              onNext={handleNextPokemon}
              onPrevious={handlePreviousPokemon}
              isCurrent={index === currentPokemonIndex}
              onCardClick={() => handleCardClick(index)}
              layout={layout}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Explore; 