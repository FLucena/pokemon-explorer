import React from 'react';
import { ProgressBar, ListGroup } from 'react-bootstrap';

const StatsTab = ({ stats }) => {
  const statNames = {
    hp: 'PS',
    attack: 'Ataque',
    defense: 'Defensa',
    'special-attack': 'Ataque Especial',
    'special-defense': 'Defensa Especial',
    speed: 'Velocidad'
  };

  const getStatColor = (statName) => {
    const colors = {
      hp: '#FF5959',
      attack: '#F5AC78',
      defense: '#FAE078',
      'special-attack': '#9DB7F5',
      'special-defense': '#A7DB8D',
      speed: '#FA92B2'
    };
    return colors[statName] || '#A8A878';
  };

  return (
    <ListGroup variant="flush" className="stats-container p-4">
      {stats.map((stat) => (
        <ListGroup.Item key={stat.stat.name} className="border-0 px-0">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="stat-name fw-bold">{statNames[stat.stat.name]}</span>
            <span className="stat-value">{stat.base_stat}</span>
          </div>
          <ProgressBar 
            now={(stat.base_stat / 255) * 100} 
            style={{ 
              backgroundColor: 'rgba(0,0,0,0.1)',
              height: '8px',
              borderRadius: '4px'
            }}
            variant="custom"
            className="stat-bar"
          >
            <ProgressBar 
              style={{ 
                backgroundColor: getStatColor(stat.stat.name),
                width: `${(stat.base_stat / 255) * 100}%`
              }} 
            />
          </ProgressBar>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default StatsTab; 