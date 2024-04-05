import axios from "axios";
import {
  Pokemon,
  GetTypeResponse,
  GetAbilitiesResponse,
  PokemonEvolutionChain,
  GetPokemonSpeciesResponse,
  PokemonEncounter,
  GetAbilityResponse,
} from "../types";
import pokemonEndpoints from "./api";

export default class PokemonService {
  getPokemon = async (pokemonName: string): Promise<Pokemon | undefined> => {
    try {
      const response = await axios.get(
        pokemonEndpoints.getPokemon(pokemonName),
      );

      if (response.status === 200) {
        return response.data as Pokemon;
      }

      return undefined;
    } catch (error) {
      console.log(error);
    }
  };

  getAbility = async (
    abilityName: string,
  ): Promise<GetAbilityResponse | undefined> => {
    try {
      const response = await axios.get(
        pokemonEndpoints.getAbility(abilityName),
      );

      if (response.status === 200) {
        return response.data as GetAbilityResponse;
      }

      return undefined;
    } catch (error) {
      console.log(error);
    }
  };

  getAbilities = async (
    limit?: number,
  ): Promise<GetAbilitiesResponse | undefined> => {
    try {
      const response = await axios.get(pokemonEndpoints.getAbilities);

      if (response.status === 200) {
        return response.data as GetAbilitiesResponse;
      }

      return undefined;
    } catch (error) {
      console.log(error);
    }
  };

  getType = async (typeName: string): Promise<GetTypeResponse | undefined> => {
    try {
      const response = await axios.get(pokemonEndpoints.getType(typeName));

      if (response.status === 200) {
        return response.data as GetTypeResponse;
      }

      return undefined;
    } catch (error) {
      console.log(error);
    }
  };

  getPokemonEvolution = async (
    evolutionId: string,
  ): Promise<PokemonEvolutionChain | undefined> => {
    try {
      const response = await axios.get(
        pokemonEndpoints.getPokemonEvolution(parseInt(evolutionId)),
      );

      if (response.status === 200) {
        return response.data as PokemonEvolutionChain;
      }

      return undefined;
    } catch (error) {
      console.log(error);
    }
  };

  getPokemonSpecies = async (
    speciesId: string,
  ): Promise<GetPokemonSpeciesResponse | undefined> => {
    try {
      const response = await axios.get(
        pokemonEndpoints.getSpecies(parseInt(speciesId)),
      );

      if (response.status === 200) {
        return response.data as GetPokemonSpeciesResponse;
      }

      return undefined;
    } catch (error) {
      console.log(error);
    }
  };

  getPokemonEncounters = async (
    pokemonId: string,
  ): Promise<PokemonEncounter[] | undefined> => {
    try {
      const response = await axios.get(
        pokemonEndpoints.getPokemonLocations(parseInt(pokemonId)),
      );

      if (response.status === 200) {
        return response.data as PokemonEncounter[];
      }

      return undefined;
    } catch (error) {
      console.log(error);
    }
  };
}
