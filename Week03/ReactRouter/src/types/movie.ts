export type MovieResponse = {
  page: number;
  dates: DateRange;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export type Movie = {
  id: number;
  title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  count: number;
  backdrop_path: string;
  original_title: string;
  vote_average: number;
};

export type DateRange = {
  maximum: string;
  minimum: string;
};

export type MovieDetail = {
  id: number;
  title: string;
  original_title: string;
  homepage: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  runtime: number;
  vote_average: number;
  backdrop_path: string;
};

export type Credits = {
  id: number;
  cast: Cast[];
};

export type Cast = {
  id: number;
  name: string;
  original_name: string;
  character: string;
  cast_id: number;
  profile_path: string;
  credit_id: string;
  order: number;
};
