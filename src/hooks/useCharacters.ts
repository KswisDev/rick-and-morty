import { useQuery } from "@tanstack/react-query";
import { Character } from "../types";
import { searchCharacters } from "../operations/queries";

type Result = {
  characters: Array<Character> | null;
  isLoading: boolean;
  error: boolean;
};

const useCharacters = (searchTerm: string): Result => {
  const { data, error, isLoading } = useQuery<Array<Character>>({
    queryKey: ["characterSearch", searchTerm],
    queryFn: () => searchCharacters(searchTerm),
  });

  return {
    isLoading,
    error,
    characters: data?.results || null,
  };
};

export { useCharacters };
