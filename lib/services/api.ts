// ** This file is used to store all the endpoints of the API

// ** The baseUrl is the base URL of the API, which is stored in the .env file
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// ** The pokemonEndpoints object stores all the endpoints of the API
const pokemonEndpoints = {
  getTypes: `${baseUrl}type`,
  getAbilities: `${baseUrl}ability`,
  getPokemons: (offset: number) =>
    `${baseUrl}pokemon?limit=20&offset=${offset}`,
  getPokemon: (id: number) => `${baseUrl}pokemon/${id}`,
  getSpecies: (id: number) => `${baseUrl}pokemon-species/${id}`,
  getPokemonEvolution: (id: number) => `${baseUrl}evolution-chain/${id}`,
};

export default pokemonEndpoints;
