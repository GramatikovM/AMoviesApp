import { Movie } from '@/types/movieTypes';

export type HomeStackParamList = {
  Home: undefined;
  MovieDetails: { movieId: number };
};

export type RootTabParamList = {
  HomeStack: undefined;
  Account: undefined;
};

export type RootStackParamList = {
  Home: undefined;
  MovieDetails: {
    imdbID: string;
    basicMovie?: Movie;
  };
};