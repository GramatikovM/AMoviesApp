import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import moviesReducer from './slices/moviesSlice';
import themeReducer from './slices/themeSlice';

const moviesPersistConfig = {
  key: 'movies',
  storage: AsyncStorage,
  whitelist: ['likedMovies', 'myListMovies'],
};

const themePersistConfig = {
  key: 'theme',
  storage: AsyncStorage,
};

export const rootReducer = combineReducers({
  movies: persistReducer(moviesPersistConfig, moviesReducer),
  theme: persistReducer(themePersistConfig, themeReducer),
});

export type RootState = ReturnType<typeof rootReducer>;
