import React, { useEffect, useState } from 'react';
import { Modal, Tabs, Tab, Button } from 'react-bootstrap';
import ModalNavigation from './pokemon-modal/ModalNavigation';
import PokemonHeader from './pokemon-modal/PokemonHeader';
import StatsTab from './pokemon-modal/StatsTab';
import DetailsTab from './pokemon-modal/DetailsTab';
import MovesTab from './pokemon-modal/MovesTab';
import { getTypeColor, shadeColor } from '../utils/colors';

const PokemonModal = ({ pokemon, onClose, onNext, onPrevious }) => {
  const [activeTab, setActiveTab] = useState('stats');

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          onPrevious();
          break;
        case 'ArrowRight':
          onNext();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrevious]);

  if (!pokemon) return null;

  const getCardBackground = () => {
    if (pokemon.types.length === 1) {
      const base = getTypeColor(pokemon.types[0].type.name);
      const light = shadeColor(base, 40);
      const dark = shadeColor(base, -30);
      return {
        backgroundImage: `linear-gradient(135deg, ${light} 0%, ${dark} 100%)`
      };
    }
    const color1 = getTypeColor(pokemon.types[0].type.name);
    const color2 = getTypeColor(pokemon.types[1].type.name);
    return {
      backgroundImage: `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`
    };
  };

  return (
    <Modal
      show={true}
      onHide={onClose}
      size="lg"
      centered
      className="pokemon-modal"
      style={getCardBackground()}
    >
      <ModalNavigation onPrevious={onPrevious} onNext={onNext} />
      
      <Button 
        variant="light" 
        className="position-absolute top-0 end-0 m-3 rounded-circle"
        onClick={onClose}
        style={{ zIndex: 1 }}
      >
        <i className="bi bi-x-lg"></i>
      </Button>

      <Modal.Body className="p-0">
        <PokemonHeader pokemon={pokemon} />

        <Tabs
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
          className="mb-3 px-3"
          fill
        >
          <Tab eventKey="stats" title="Estadísticas">
            <div style={{ height: '400px', overflowY: 'auto' }}>
              <StatsTab stats={pokemon.stats} />
            </div>
          </Tab>
          <Tab eventKey="details" title="Detalles">
            <div style={{ height: '400px', overflowY: 'auto' }}>
              <DetailsTab pokemon={pokemon} />
            </div>
          </Tab>
          <Tab eventKey="moves" title="Movimientos">
            <div style={{ height: '400px', overflowY: 'auto' }}>
              <MovesTab moves={pokemon.moves} />
            </div>
          </Tab>
        </Tabs>
      </Modal.Body>
    </Modal>
  );
};

export default PokemonModal; 