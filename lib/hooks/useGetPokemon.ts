import axios from "axios";
import { Pokemon } from "../types";
import pokemonEndpoints from "../services/api";
import { useQuery } from "@tanstack/react-query";

const GetPokemon = async (
  pokemonName: string,
): Promise<Pokemon | undefined> => {
  const response = await axios.get(pokemonEndpoints.getPokemon(pokemonName));
  return response.data as Pokemon;
};

const useGetPokemon = (pokemonName: string) => {
  return useQuery({
    queryKey: ["GetPokemon", pokemonName],
    queryFn: () => GetPokemon(pokemonName),
  });
};

export default useGetPokemon;
