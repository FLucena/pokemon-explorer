import React, { useState } from 'react';
import { Card, Spinner } from 'react-bootstrap';
import PokemonModal from './PokemonModal';
import { getTypeColor, shadeColor } from '../utils/colors';
import pokeballPlaceholder from '../assets/pokeball.png';
import '../styles/pokemon-card.css';

function getCardGradient(types) {
  if (types.length === 1) {
    const base = getTypeColor(types[0].type.name);
    const light = shadeColor(base, 40);
    const dark = shadeColor(base, -30);
    return `linear-gradient(135deg, ${light} 0%, ${dark} 100%)`;
  }
  const color1 = getTypeColor(types[0].type.name);
  const color2 = getTypeColor(types[1].type.name);
  return `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`;
}

const sizeStyles = {
  sm: { card: { width: 160, minHeight: 140 }, img: { width: 80, height: 56 } },
  md: { card: { width: 220, minHeight: 220 }, img: { width: 140, height: 96 } },
  lg: { card: { width: 320, minHeight: 300 }, img: { width: 200, height: 140 } },
};

const PokemonCard = ({ pokemon, currentPokemon, onNext, onPrevious, isCurrent, onCardClick, layout, showModalOnClick = true }) => {
  const [showModal, setShowModal] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [imgLoading, setImgLoading] = useState(true);

  const handleNext = (e) => {
    if (e) e.stopPropagation();
    onNext();
  };

  const handlePrevious = (e) => {
    if (e) e.stopPropagation();
    onPrevious();
  };

  const handleCardClick = () => {
    onCardClick();
    if (showModalOnClick && layout !== 'list') setShowModal(true);
  };

  const handleImageLoad = () => {
    setImgLoading(false);
  };

  const handleImageError = () => {
    setImgError(true);
    setImgLoading(false);
  };

  const { img: imgStyle } = sizeStyles[layout] || sizeStyles['md'];

  const renderListContent = () => (
    <div className="pokemon-info">
      <span className="pokemon-number">#{String(pokemon.id).padStart(3, '0')}</span>
      <div className="pokemon-image-container">
        <img 
          src={imgError ? pokeballPlaceholder : pokemon.sprites.front_default} 
          alt={pokemon.name}
          className={`pokemon-image${imgError ? ' pokeball-placeholder' : ''}`}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      </div>
      <h3 className="card-title text-capitalize">{pokemon.name}</h3>
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
      <div className="pokemon-stats">
        <div className="stat-item">
          <div className="stat-label">HP</div>
          <div className="stat-value">{pokemon.stats[0].base_stat}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">ATK</div>
          <div className="stat-value">{pokemon.stats[1].base_stat}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">DEF</div>
          <div className="stat-value">{pokemon.stats[2].base_stat}</div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Card 
        className={`pokemon-card${isCurrent ? ' current' : ''}`}
        onClick={handleCardClick}
        style={layout !== 'list' ? { background: getCardGradient(pokemon.types) } : {}}
      >
        <Card.Body>
          {layout === 'list' ? renderListContent() : (
            <>
              <div className="pokemon-image-container">
                {imgLoading && (
                  <div className="image-loading">
                    <Spinner animation="border" size="sm" />
                  </div>
                )}
                <img 
                  src={imgError ? pokeballPlaceholder : pokemon.sprites.front_default} 
                  alt={pokemon.name}
                  className={`pokemon-image mb-3${imgError ? ' pokeball-placeholder' : ''}`}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                  style={{ display: imgLoading ? 'none' : 'block', ...imgStyle }}
                />
              </div>
              <Card.Title className="text-center text-capitalize mb-2">{pokemon.name}</Card.Title>
              <div className="d-flex gap-2">
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
            </>
          )}
        </Card.Body>
      </Card>

      {showModal && (
        <PokemonModal
          pokemon={currentPokemon}
          onClose={() => setShowModal(false)}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      )}
    </>
  );
};

export default PokemonCard; 