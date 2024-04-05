// ** This file is used to store all the endpoints of the API

// ** The baseUrl is the base URL of the API, which is stored in the .env file
export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// ** The pokemonEndpoints object stores all the endpoints of the API
const pokemonEndpoints = {
  getTypes: `${baseUrl}type`,
  getPokemons: `${baseUrl}pokemon`,
  getAbilities: `${baseUrl}ability?limit=400`,
  getType: (typeName: string) => `${baseUrl}type/${typeName}`,
  getSpecies: (id: number) => `${baseUrl}pokemon-species/${id}`,
  getSearchPokemon: (query?: string) => `${baseUrl}pokemon/${query}`,
  getPokemonEvolution: (id: number) => `${baseUrl}evolution-chain/${id}`,
  getAbility: (abilityName: string) => `${baseUrl}ability/${abilityName}`,
  getPokemonLocations: (id: number) => `${baseUrl}pokemon/${id}/encounters`,
  getPokemon: (pokemonString: string) => `${baseUrl}pokemon/${pokemonString}`,
};

export default pokemonEndpoints;
