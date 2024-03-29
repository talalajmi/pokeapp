import axios from "axios";
import pokemonEndpoints from "../services/api";
import { useQuery } from "@tanstack/react-query";

interface GetTypesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
}

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
