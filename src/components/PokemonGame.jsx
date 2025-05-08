import { useState, useEffect, useRef } from 'react';
import { Card, Form, Button, Spinner } from 'react-bootstrap';
import Confetti from 'react-confetti';

const MAX_IMAGE_RETRIES = 3;

const PokemonGame = () => {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [revealProgress, setRevealProgress] = useState(0);
  const [isRevealing, setIsRevealing] = useState(false);
  const [showHighlight, setShowHighlight] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const gameContainerRef = useRef(null);
  const [containerDimensions, setContainerDimensions] = useState({
    width: 0,
    height: 0
  });

  useEffect(() => {
    if (gameContainerRef.current) {
      const updateDimensions = () => {
        const rect = gameContainerRef.current.getBoundingClientRect();
        setContainerDimensions({
          width: rect.width,
          height: rect.height
        });
      };

      updateDimensions();
      window.addEventListener('resize', updateDimensions);
      return () => window.removeEventListener('resize', updateDimensions);
    }
  }, []);

  const fetchRandomPokemon = async () => {
    try {
      setLoading(true);
      const randomId = Math.floor(Math.random() * 151) + 1;
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
      const data = await response.json();
      setPokemon(data);
      setLoading(false);
      setGuess('');
      setMessage('');
      setAttempts(0);
      setRevealProgress(0);
      setIsRevealing(false);
      setShowHighlight(false);
      setRetryCount(0);
    } catch (error) {
      console.error('Error fetching Pokemon:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomPokemon();
  }, []);

  useEffect(() => {
    let interval;
    if (isRevealing && revealProgress < 100) {
      interval = setInterval(() => {
        setRevealProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 1;
        });
      }, 30);
    }
    return () => clearInterval(interval);
  }, [isRevealing, revealProgress]);

  useEffect(() => {
    let timeout;
    if (message.includes('Correcto')) {
      timeout = setTimeout(() => setShowHighlight(true), 2000);
    } else {
      setShowHighlight(false);
    }
    return () => clearTimeout(timeout);
  }, [message]);

  function normalizeName(name) {
    return name
      .toLowerCase()
      .replace(/[-' .]/g, ''); // remove dashes, apostrophes, spaces, and periods
  }

  const handleGuess = (e) => {
    e.preventDefault();
    if (!pokemon) return;

    const userGuess = normalizeName(guess);
    const correctName = normalizeName(pokemon.name);

    setAttempts(prev => prev + 1);

    if (userGuess === correctName) {
      setMessage('Correcto! Has adivinado el Pokémon!');
      setIsRevealing(true);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    } else {
      setMessage('Incorrecto. Inténtalo de nuevo.');
    }
  };

  const handleImageError = () => {
    if (retryCount < MAX_IMAGE_RETRIES) {
      setRetryCount(retryCount + 1);
      fetchRandomPokemon();
    } else {
      setMessage('No se pudo cargar la imagen del Pokémon. Intenta con uno nuevo.');
    }
  };

  return (
    <div className="game-container p-4" ref={gameContainerRef}>
      <Card className="game-card position-relative">
        {showConfetti && (
          <Confetti
            width={containerDimensions.width}
            height={containerDimensions.height}
            recycle={false}
            numberOfPieces={200}
            gravity={0.3}
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
          />
        )}
        <Card.Header className="text-center">
          <h2>¿Quién es este Pokémon?</h2>
        </Card.Header>

        <Card.Body className="game-inner mx-auto">
          <div className="pokemon-image-container text-center mb-4" style={{ minHeight: 120 }}>
            {loading ? (
              <Spinner animation="border" role="status" className="mb-3">
                <span className="visually-hidden">Cargando...</span>
              </Spinner>
            ) : (
              <img 
                src={pokemon.sprites.front_default} 
                alt="Pokémon a adivinar" 
                className="pokemon-to-guess img-fluid"
                style={{ 
                  filter: `brightness(${revealProgress}%)`,
                  transition: isRevealing ? 'filter 0.1s ease' : 'none'
                }}
                onError={handleImageError}
              />
            )}
          </div>
          
          <Form onSubmit={handleGuess} className="mb-4 game-inner-form mx-auto">
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                placeholder="Pokemon..."
                disabled={isRevealing}
                className="mb-3"
              />
              <Button 
                type="submit" 
                variant="primary"
                disabled={isRevealing || guess.trim() === ""}
                className="game-inner-btn mx-auto"
              >
                Adivinar
              </Button>
            </Form.Group>
          </Form>

          <div className="game-status text-center mb-3" style={{ minHeight: 48 }}>
            <div className={`alert ${message ? (message.includes('Correcto') ? 'alert-success' : 'alert-danger') : 'alert-secondary'} mb-0`}>
              {message || "Intenta adivinar el nombre del Pokémon"}
            </div>
          </div>
          <p className="attempts mb-3">Intentos: {attempts}</p>
          
          <Button 
            variant={showHighlight ? "success" : "primary"}
            onClick={fetchRandomPokemon} 
            className="game-inner-btn mx-auto"
          >
            Nuevo Pokémon
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default PokemonGame; 