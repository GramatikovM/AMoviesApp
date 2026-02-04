import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  createSelector,
} from '@reduxjs/toolkit';

import { RootState } from '../rootReducer';
import { omdbRequest } from '@/services/omdbClient';
import { MovieCategories, MovieDetails } from '@/types/movieTypes';

interface MoviesState {
  // state could be Normalized on a later stage
  categories: MovieCategories;
  pagination: {
    [key: string]: number; // Tracks current page per category: { trending: 1, action: 2 }
  };
  loadingStates: { [key: string]: boolean };
  errors: { [key: string]: string | null };
  movieDetails: MovieDetails | null;
  movieDetailsLoading: boolean;
  movieDetailsError: string | null;
  likedMovies: { [imdbID: string]: MovieDetails };
  myListMovies: { [imdbID: string]: MovieDetails };
}

interface ReqParams {
  category: string;
  s: string; // Search
  t?: string; // Title
  i?: string; // ID
  type?: 'movie' | 'series' | 'episode';
  y?: string | number;
  page?: number;
  plot?: 'short' | 'full';
  apikey?: string;
}

const initialState: MoviesState = {
  categories: {
    trending: [], // Result of s=2025
    action: [], // Result of s=Action
    series: [], // Result of s=Life&type=series
  },
  pagination: { trending: 1, action: 1, series: 1 },
  loadingStates: {},
  errors: {},

  movieDetails: null,
  movieDetailsLoading: false,
  movieDetailsError: null,

  likedMovies: {},
  myListMovies: {},
};

export const fetchCategory = createAsyncThunk<
  { category: string; movies: any[] },
  ReqParams,
  { rejectValue: string }
>(
  'movies/fetchCategory',
  async (params, { rejectWithValue }) => {
    try {
      const data = await omdbRequest<any>({ ...params });
      return {
        category: params.category,
        movies: data.Search || [],
      };
    } catch (error) {
      return rejectWithValue(`Failed to load ${params.category} movies.`);
    }
  },
  {
    // Prevent double-fetching if this category is already loading
    condition: (params, { getState }) => {
      const { movies } = getState() as RootState;
      if (movies.loadingStates[params.category]) return false;
    },
  },
);

export const fetchMovieDetails = createAsyncThunk<
  MovieDetails,
  string,
  { rejectValue: string }
>('movies/fetchMovieDetails', async (imdbID, { rejectWithValue }) => {
  try {
    const data: MovieDetails = await omdbRequest({
      i: imdbID,
      plot: 'full',
    });

    return data;
  } catch (error) {
    return rejectWithValue('Failed to load movie details');
  }
});

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    clearMovieDetails(state) {
      state.movieDetails = null;
      state.movieDetailsError = null;
      state.movieDetailsLoading = false;
    },
    toggleLikeMovie(state, action: PayloadAction<MovieDetails>) {
      const movie = action.payload;
      const imdbID = movie.imdbID;

      if (state.likedMovies[imdbID]) {
        delete state.likedMovies[imdbID];
      } else {
        state.likedMovies[imdbID] = movie;
      }
    },
    toggleMyListMovie(state, action: PayloadAction<MovieDetails>) {
      const movie = action.payload;
      const imdbID = movie.imdbID;

      if (state.myListMovies[imdbID]) {
        delete state.myListMovies[imdbID];
      } else {
        state.myListMovies[imdbID] = movie;
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCategory.pending, (state, action) => {
        const category = action.meta.arg.category;
        state.loadingStates[category] = true;
        state.errors[category] = null;
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        const { category, movies } = action.payload;
        state.loadingStates[category] = false;

        // Append & Deduplicate by imdbID
        const existing = state.categories[category] || [];
        const combined = [...existing, ...movies];
        state.categories[category] = Array.from(
          new Map(combined.map(item => [item.imdbID, item])).values(),
        );

        state.pagination[category] = (state.pagination[category] || 1) + 1;
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        const category = action.meta.arg.category;
        state.loadingStates[category] = false;
        state.errors[category] = action.payload as string;
      })

      .addCase(fetchMovieDetails.pending, state => {
        state.movieDetailsLoading = true;
        state.movieDetailsError = null;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.movieDetailsLoading = false;
        state.movieDetails = action.payload;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.movieDetailsLoading = false;
        state.movieDetailsError =
          (action.payload as string) ?? 'Failed to load movie details';
      });
  },
});

export const { clearMovieDetails, toggleLikeMovie, toggleMyListMovie } =
  moviesSlice.actions;
export default moviesSlice.reducer;

const EMPTY_ARRAY: any[] = [];
export const selectCategoryMovies = (category: string) => (state: RootState) =>
  state.movies.categories[category] ?? EMPTY_ARRAY;
export const selectCategoryLoading = (category: string) => (state: RootState) =>
  !!state.movies.loadingStates[category];
export const selectCategoryError = (category: string) => (state: RootState) =>
  state.movies.errors[category];

export const selectMovieDetails = (state: RootState) =>
  state.movies.movieDetails;
export const selectMovieDetailsLoading = (state: RootState) =>
  state.movies.movieDetailsLoading;
export const selectMovieDetailsError = (state: RootState) =>
  state.movies.movieDetailsError;

const selectLikedMoviesMap = (state: RootState) => state.movies.likedMovies;
const selectMyListMoviesMap = (state: RootState) => state.movies.myListMovies;
export const selectLikedMovies = createSelector(
  [selectLikedMoviesMap],
  likedMovies => Object.values(likedMovies),
);
export const selectMyListMovies = createSelector(
  [selectMyListMoviesMap],
  myListMovies => Object.values(myListMovies),
);
export const selectIsMovieLiked = (state: RootState, imdbID: string) =>
  !!state.movies.likedMovies[imdbID];
export const selectIsMovieInMyList = (state: RootState, imdbID: string) =>
  !!state.movies.myListMovies[imdbID];
