import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import TeamDisplay from './TeamDisplay';
import AvailablePokemon from './AvailablePokemon';
import LoadingSpinner from './LoadingSpinner';
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

  return (
    <div className="team-builder p-4">
      <h2 className="mb-4">Constructor de Equipo</h2>
      <p className="team-builder-subtitle mb-4">Haz clic en un Pokémon para añadirlo a tu equipo</p>
      
      <Row className="g-4">
        <Col lg={4}>
          <TeamDisplay
            team={team}
            onRemoveFromTeam={removeFromTeam}
            onToggleFavorite={toggleFavorite}
            isFavorite={isFavorite}
            teamImgErrors={teamImgErrors}
            setTeamImgErrors={setTeamImgErrors}
            onResetTeam={resetTeam}
          />
        </Col>

        <Col lg={8}>
          <AvailablePokemon
            displayedPokemon={displayedPokemon}
            team={team}
            showOnlyFavorites={showOnlyFavorites}
            setShowOnlyFavorites={setShowOnlyFavorites}
            onLoadRandomPokemon={loadRandomPokemon}
            onAddToTeam={addToTeam}
            onToggleFavorite={toggleFavorite}
            isFavorite={isFavorite}
            loading={loading}
          />
        </Col>
      </Row>
    </div>
  );
};

export default TeamBuilder; 