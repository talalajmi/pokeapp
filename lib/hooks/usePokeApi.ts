import axios from "axios";
import pokemonEndpoints from "../services/api";
import { useQuery } from "@tanstack/react-query";

const PokeApi = async (endpoint: string): Promise<any | undefined> => {
  const response = await axios.get(endpoint);
  return response.data as any;
};

const usePokeApi = (endpoint: string) => {
  return useQuery({
    queryKey: ["PokeApi", endpoint],
    queryFn: () => PokeApi(endpoint),
  });
};

export default usePokeApi;
