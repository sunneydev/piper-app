import axios from "axios";
import { useDebouncedValue } from "./useDebouncedValue";
import { useEffect, useState } from "react";
import { SearchResult } from "../../typings";

const searchQuery = (query: string) =>
  axios
    .get<SearchResult[]>("/search", {
      params: { q: query },
    })
    .then(({ data }) => data);

const useImovies = (search?: string) => {
  const [debounced] = useDebouncedValue(search, 500);
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (!debounced) return;

    searchQuery(debounced).then(setResults);

    return () => {
      setResults([]);
    };
  }, [debounced]);

  return results;
};

export default useImovies;
