import axios from "axios";
import {
  Pokemon,
  GetTypeResponse,
  GetAbilitiesResponse,
  PokemonEvolutionChain,
  GetPokemonSpeciesResponse,
  PokemonEncounter,
} from "../types";
import pokemonEndpoints from "./api";

export default class PokemonService {
  getPokemon = async (pokemonId: string): Promise<Pokemon | undefined> => {
    try {
      const response = await axios.get(
        pokemonEndpoints.getPokemon(parseInt(pokemonId)),
      );

      if (response.status === 200) {
        return response.data as Pokemon;
      }

      return undefined;
    } catch (error) {
      console.log(error);
    }
  };

  getPokemonsByAbility = async (
    abilityId: number,
  ): Promise<GetAbilitiesResponse | undefined> => {
    try {
      const response = await axios.get(
        pokemonEndpoints.getPokemonsByAbility(abilityId),
      );

      if (response.status === 200) {
        return response.data as GetAbilitiesResponse;
      }

      return undefined;
    } catch (error) {
      console.log(error);
    }
  };

  getPokemonsByType = async (
    typeId: number,
  ): Promise<GetTypeResponse | undefined> => {
    try {
      const response = await axios.get(
        pokemonEndpoints.getPokemonsByType(typeId),
      );

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
