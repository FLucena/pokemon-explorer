import { useState, useEffect, useCallback } from 'react';
import { fetchWithRetry } from '../utils/api';

const usePokemons = (count = 10) => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [availableTypes, setAvailableTypes] = useState([]);

  const fetchPokemon = async (id) => {
    try {
      const response = await fetchWithRetry(`https://pokeapi.co/api/v2/pokemon/${id}`);
      return response.json();
    } catch (error) {
      console.error(`Error fetching Pokémon ${id}:`, error);
      return null;
    }
  };

  const fetchRandomPokemons = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const randomIds = Array.from({ length: count }, () => 
        Math.floor(Math.random() * 898) + 1
      );
      
      // Fetch pokemon sequentially to avoid rate limiting
      const results = [];
      for (const id of randomIds) {
        const pokemon = await fetchPokemon(id);
        if (pokemon) results.push(pokemon);
      }
      
      if (results.length === 0) {
        throw new Error('No Pokémon could be fetched');
      }
      
      setPokemons(results);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [count]);

  const fetchTypes = async () => {
    try {
      const response = await fetchWithRetry('https://pokeapi.co/api/v2/type');
      const data = await response.json();
      setAvailableTypes(data.results.map(type => type.name));
    } catch (error) {
      console.error('Error fetching types:', error);
    }
  };

  useEffect(() => {
    fetchRandomPokemons();
    fetchTypes();
  }, [fetchRandomPokemons]);

  return {
    pokemons,
    loading,
    error,
    availableTypes,
    refreshPokemons: fetchRandomPokemons
  };
};

export default usePokemons; 