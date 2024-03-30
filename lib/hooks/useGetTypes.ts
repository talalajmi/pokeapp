import axios from "axios";
import { GetTypesResponse } from "../types";
import pokemonEndpoints from "../services/api";
import { useQuery } from "@tanstack/react-query";

const GetTypes = async (): Promise<GetTypesResponse | undefined> => {
  const response = await axios.get(pokemonEndpoints.getTypes);
  return response.data as GetTypesResponse;
};

const useGetTypes = () => {
  return useQuery({
    queryKey: ["GetTypes"],
    queryFn: GetTypes,
  });
};

export default useGetTypes;
