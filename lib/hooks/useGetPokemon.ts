import axios from "axios";
import { Pokemon } from "../types";
import pokemonEndpoints from "../services/api";
import { useQuery } from "@tanstack/react-query";

const GetPokemon = async (id: number): Promise<Pokemon | undefined> => {
  const response = await axios.get(pokemonEndpoints.getPokemon(id));
  return response.data as Pokemon;
};

const useGetPokemon = (id: number) => {
  return useQuery({
    queryKey: ["GetPokemon", id],
    queryFn: () => GetPokemon(id),
  });
};

export default useGetPokemon;
