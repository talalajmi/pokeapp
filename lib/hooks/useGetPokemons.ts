import axios from "axios";
import pokemonEndpoints from "../services/api";
import { useQuery } from "@tanstack/react-query";
import { GetPokemonsResponse, Pokemon } from "../types";

const GetPokemons = async (
  offset: number,
): Promise<GetPokemonsResponse | undefined> => {
  const response = await axios.get(pokemonEndpoints.getPokemons(offset));
  return response.data as GetPokemonsResponse;
};

const useGetPokemons = (offset: number) => {
  return useQuery({
    queryKey: ["GetPokemons", offset],
    queryFn: () => GetPokemons(offset),
  });
};

export default useGetPokemons;
