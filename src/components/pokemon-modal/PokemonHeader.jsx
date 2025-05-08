import React from 'react';
import { getTypeColor } from '../../utils/colors';

const PokemonHeader = ({ pokemon }) => {
  return (
    <div className="pokemon-header">
      <div className="pokemon-info">
        <div className="pokemon-title">
          <h2 className="pokemon-name">{pokemon.name}</h2>
          <span className="pokemon-number">#{String(pokemon.id).padStart(3, '0')}</span>
        </div>
        
        <div className="pokemon-types">
          {pokemon.types.map(type => (
            <span 
              key={type.type.name}
              className="type-badge"
              style={{ backgroundColor: getTypeColor(type.type.name) }}
            >
              {type.type.name}
            </span>
          ))}
        </div>
      </div>

      <div className="pokemon-image-container">
        <img 
          src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
          alt={pokemon.name}
          className="pokemon-image"
        />
      </div>
    </div>
  );
};

export default PokemonHeader; 