import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { GetPokemonSpeciesResponse } from "../types";

const GetSpecies = async (
  url: string,
): Promise<GetPokemonSpeciesResponse | undefined> => {
  const response = await axios.get(url);
  return response.data as GetPokemonSpeciesResponse;
};

const useGetSpecies = (url: string | undefined) => {
  return useQuery({
    queryKey: ["GetSpecies", url],
    queryFn: () => (url ? GetSpecies(url) : Promise.resolve(undefined)),
    enabled: !!url,
  });
};

export default useGetSpecies;
