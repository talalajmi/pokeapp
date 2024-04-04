// ** This file is used to store all the endpoints of the API

// ** The baseUrl is the base URL of the API, which is stored in the .env file
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// ** The pokemonEndpoints object stores all the endpoints of the API
const pokemonEndpoints = {
  getTypes: `${baseUrl}type`,
  getPokemons: `${baseUrl}pokemon`,
  getAbilities: `${baseUrl}ability?limit=20`,
  getPokemon: (id: number) => `${baseUrl}pokemon/${id}`,
  getPokemonsByType: (id: number) => `${baseUrl}type/${id}`,
  getSpecies: (id: number) => `${baseUrl}pokemon-species/${id}`,
  getPokemonsByAbility: (id: number) => `${baseUrl}ability/${id}`,
  getSearchPokemon: (query?: string) => `${baseUrl}pokemon/${query}`,
  getPokemonEvolution: (id: number) => `${baseUrl}evolution-chain/${id}`,
};

export default pokemonEndpoints;
