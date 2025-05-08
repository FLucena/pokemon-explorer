import PokemonGame from '../components/PokemonGame';
import './Game.css';

const Game = () => {
  return (
    <div className="game-page">
      <div className="container py-5">
        <h1 className="visually-hidden">Pokémon Guessing Game</h1>
        <PokemonGame />
      </div>
    </div>
  );
};

export default Game; 