import axios from "axios";
import pokemonEndpoints from "../services/api";
import { useQuery } from "@tanstack/react-query";
import { GetPokemonsResponse, Pokemon } from "../types";

const GetPokemons = async (): Promise<GetPokemonsResponse | undefined> => {
  const response = await axios.get(pokemonEndpoints.getPokemons);
  return response.data as GetPokemonsResponse;
};

const useGetPokemons = () => {
  return useQuery({
    queryKey: ["GetPokemons"],
    queryFn: GetPokemons,
  });
};

export default useGetPokemons;
