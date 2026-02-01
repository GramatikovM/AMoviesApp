import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
} from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';

export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  release_date: string;
  vote_average: number;
}

interface MoviesState {
  trending: Movie[];
  popular: Movie[];
  topRated: Movie[];
  isLoading: boolean;
  error: string | null;
}

const initialState: MoviesState = {
  trending: [],
  popular: [],
  topRated: [],
  isLoading: false,
  error: null,
};

const API_KEY = 'YOUR_API_KEY';
const BASE_URL = 'https://api.themoviedb.org/3';

const fetchMovies = async (endpoint: string): Promise<Movie[]> => {
  const response = await fetch(
    `${BASE_URL}${endpoint}?api_key=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch movies');
  }

  const data = await response.json();
  return data.results;
};

export const fetchTrendingMovies = createAsyncThunk(
  'movies/fetchTrending',
  () => fetchMovies('/trending/movie/week')
);

export const fetchPopularMovies = createAsyncThunk(
  'movies/fetchPopular',
  () => fetchMovies('/movie/popular')
);

export const fetchTopRatedMovies = createAsyncThunk(
  'movies/fetchTopRated',
  () => fetchMovies('/movie/top_rated')
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    clearMoviesError(state) {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      // Trending
      .addCase(fetchTrendingMovies.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchTrendingMovies.fulfilled,
        (state, action: PayloadAction<Movie[]>) => {
          state.trending = action.payload;
          state.isLoading = false;
        }
      )
      .addCase(fetchTrendingMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Something went wrong';
      })

      // Popular
      .addCase(
        fetchPopularMovies.fulfilled,
        (state, action: PayloadAction<Movie[]>) => {
          state.popular = action.payload;
        }
      )

      // Top Rated
      .addCase(
        fetchTopRatedMovies.fulfilled,
        (state, action: PayloadAction<Movie[]>) => {
          state.topRated = action.payload;
        }
      );
  },
});

export const { clearMoviesError } = moviesSlice.actions;
export default moviesSlice.reducer;

export const selectTrendingMovies = (state: RootState) =>
  state.movies.trending;

export const selectPopularMovies = (state: RootState) =>
  state.movies.popular;

export const selectTopRatedMovies = (state: RootState) =>
  state.movies.topRated;

export const selectMoviesLoading = (state: RootState) =>
  state.movies.isLoading;

export const selectMoviesError = (state: RootState) =>
  state.movies.error;
