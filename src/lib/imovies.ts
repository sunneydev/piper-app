import axios from "axios";

export interface ImoviesSearchResponse {
  data: SearchResult[];
}

export interface SearchResult {
  id: number;
  adjaraId: number | null;
  originalName: string;
  primaryName: string;
  secondaryName: string;
  tertiaryName: string;
  primaryDescription: string;
  secondaryDescription: string;
  tertiaryDescription: string;
  poster: string;
  isTvShow: boolean;
  isAdult: boolean;
  isFree: boolean;
  year: number;
  weight: number;
  rating: Rating;
  _score: number;
  _explain: any[];
}

export interface Rating {
  imdb: Imdb;
  imovies: Imdb;
}

export interface Imdb {
  score: number;
  voters: number;
}

export interface Links {
  next: string;
}

export const search = (query: string) =>
  axios
    .get<ImoviesSearchResponse>(
      `https://api.imovies.cc/api/v1/multi-search?keywords=bers&filters%5Btype%5D=movie%2Ccast&page=1&per_page=10`,
      {
        params: {
          keywords: query,
          ["filters[type]"]: "movie",
          page: 1,
          per_page: 10,
        },
      }
    )
    .then(({ data }) => data.data);
