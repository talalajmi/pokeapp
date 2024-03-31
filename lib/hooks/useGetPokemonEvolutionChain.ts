import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { GetPokemonSpeciesResponse, PokemonEvolutionChain } from "../types";

const GetPokemonEvolutionChain = async (
  species: GetPokemonSpeciesResponse | undefined,
): Promise<PokemonEvolutionChain | undefined> => {
  const response = species
    ? await axios.get(species.evolution_chain.url)
    : undefined;
  return response?.data;
};

const useGetPokemonEvolutionChain = (
  species: GetPokemonSpeciesResponse | undefined,
) => {
  return useQuery({
    queryKey: ["GetPokemonEvolution", species?.id],
    queryFn: () => GetPokemonEvolutionChain(species),
    enabled: !!species,
  });
};

export default useGetPokemonEvolutionChain;
