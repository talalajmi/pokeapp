import axios from "axios";
import { PokemonEvolution } from "../types";
import pokemonEndpoints from "../services/api";
import { useQuery } from "@tanstack/react-query";

const GetPokemonEvolution = async (
  id: number
): Promise<PokemonEvolution | undefined> => {
  const response = await axios.get(pokemonEndpoints.getPokemonEvolution(id));
  return response.data as PokemonEvolution;
};

const useGetPokemonEvolution = (id: number) => {
  return useQuery({
    queryKey: ["GetPokemonEvolution", id],
    queryFn: () => GetPokemonEvolution(id),
  });
};

export default useGetPokemonEvolution;
