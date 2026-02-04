import { NavigatorScreenParams } from '@react-navigation/native';

import { Movie } from '@/types/movieTypes';


export type HomeStackParamList = {
  Home: undefined;
  MovieDetails: { 
    imdbID: string; 
    basicMovie?: Movie 
  }
};

export type RootTabParamList = {
  HomeStack: NavigatorScreenParams<HomeStackParamList>;
  AccountStack: undefined;
};

export type RootStackParamList = {
  Home: undefined;
  Account: undefined;
  MovieDetails: {
    imdbID: string;
    basicMovie?: Movie;
  };
  LikedMovies: undefined;
  Watchlist: undefined;
  Settings: undefined;
};
