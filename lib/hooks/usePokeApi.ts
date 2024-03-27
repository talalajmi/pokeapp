import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const PokeApi = async <T>(endpoint: string): Promise<T> => {
  const response = await axios.get<T>(endpoint);
  if (response.data === undefined) {
    throw new Error("API response data is undefined");
  }
  return response.data;
};

const usePokeApi = <T>(endpoint: string) => {
  return useQuery<T>({
    queryKey: ["PokeApi", endpoint],
    queryFn: () => PokeApi<T>(endpoint),
  });
};

export default usePokeApi;
