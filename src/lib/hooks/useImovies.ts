import axios from "axios";
import { useEffect, useState } from "react";
import { Season } from "../../typings";

const getMovie = (movieId: string) =>
  axios.get<Season[]>(`/movie/${movieId}`).then(({ data }) => data);

const useImovies = (movieId?: string) => {
  const [movie, setMovie] = useState<Season[]>();

  useEffect(() => {
    if (!movieId) return;

    getMovie(movieId).then(setMovie);
  }, [movieId]);

  return movie;
};

export default useImovies;
