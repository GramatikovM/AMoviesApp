import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';
import { omdbRequest } from '@/services/omdbClient';
import { OmdbSearchResponse } from '@/services/omdb.types';
import { MovieCategories } from '@/types/movieTypes';

interface MoviesState {
  categories: MovieCategories;
  loading: boolean;
  error: string | null;
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
  loading: false,
  error: null,
};

export const fetchCategory = createAsyncThunk(
  'movies/fetchCategory',
  async (params: ReqParams, { rejectWithValue }) => {
    try {
      const data = await omdbRequest<any>({
        ...params,
      });

      return {
        category: params.category,
        movies: data.Search || [],
      };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
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
      .addCase(fetchCategory.pending, state => {
        state.loading = true;
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.loading = false;
        const { category, movies } = action.payload;
        // Dynamically update the specific category list
        state.categories[category] = movies;
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMoviesError } = moviesSlice.actions;
export default moviesSlice.reducer;

export const selectTrendingMovies = (state: RootState) =>
  state.movies.categories.trending;
export const selectPopularMovies = (state: RootState) =>
  state.movies.categories.action;
export const selectTopRatedMovies = (state: RootState) =>
  state.movies.categories.series;
export const selectMoviesLoading = (state: RootState) => state.movies.loading;
export const selectMoviesError = (state: RootState) => state.movies.error;
