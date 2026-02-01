export interface OmdbMovieShort {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type: string;
}

export interface OmdbSearchResponse {
  Search: OmdbMovieShort[];
  totalResults: string;
}
