export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string; // can be "N/A"
  Type: 'movie' | 'series' | 'episode';
}


export interface MovieCategories {
  trending: Movie[];
  action: Movie[];
  series: Movie[];
  [key: string]: Movie[];
}

export interface MovieDetails {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: 'movie' | 'series' | 'episode';
  DVD?: string;
  BoxOffice?: string;
  Production?: string;
  Website?: string;
  Response: string;
}