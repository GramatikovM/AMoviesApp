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
