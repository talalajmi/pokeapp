import axios from "axios";
import pokemonEndpoints from "../services/api";
import { useQuery } from "@tanstack/react-query";
import { Pokemon } from "../types";

const GetSearchedPokemon = async (
  query?: string,
): Promise<Pokemon | undefined> => {
  const response = await axios.get(pokemonEndpoints.getSearchPokemon(query));
  return response.data as Pokemon;
};

const useGetSearchedPokemon = (query: string | undefined) => {
  return useQuery({
    queryKey: ["pokemon", query],
    queryFn: () => GetSearchedPokemon(query),
    enabled: !!query,
  });
};

export default useGetSearchedPokemon;
