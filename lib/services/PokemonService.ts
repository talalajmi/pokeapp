import axios from "axios";
import { GetTypeResponse } from "../types";
import pokemonEndpoints from "./api";

export default class PokemoService {
  getPokemonsByAbility = async (
    abilityId: number,
  ): Promise<GetTypeResponse | undefined> => {
    try {
      const response = await axios.get(
        pokemonEndpoints.getPokemonsByAbility(abilityId),
      );

      if (response.status === 200) {
        return response.data as GetTypeResponse;
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
}
