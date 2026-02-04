import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import moviesReducer from './slices/moviesSlice';

const moviesPersistConfig = {
  key: 'movies',
  storage: AsyncStorage,
  whitelist: ['likedMovies', 'myListMovies'],
};

export const rootReducer = combineReducers({
  movies: persistReducer(moviesPersistConfig, moviesReducer),
});

export type RootState = ReturnType<typeof rootReducer>;
