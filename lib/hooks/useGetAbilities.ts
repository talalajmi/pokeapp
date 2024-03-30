import axios from "axios";
import pokemonEndpoints from "../services/api";
import { useQuery } from "@tanstack/react-query";
import { GetAbilitiesResponse } from "../types";

const GetAbilities = async (): Promise<GetAbilitiesResponse | undefined> => {
  const response = await axios.get(pokemonEndpoints.getAbilities);
  return response.data as GetAbilitiesResponse;
};

const useGetAbilities = () => {
  return useQuery({
    queryKey: ["GetAbilities"],
    queryFn: GetAbilities,
  });
};

export default useGetAbilities;
