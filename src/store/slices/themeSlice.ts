import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { ThemeMode } from '@/theme/theme';
import type { RootState } from '../rootReducer';

type ThemeState = {
  mode: ThemeMode;
};

const initialState: ThemeState = {
  mode: 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemeMode(state, action: PayloadAction<ThemeMode>) {
      state.mode = action.payload;
    },
  },
});

export const { setThemeMode } = themeSlice.actions;
export default themeSlice.reducer;

export const selectThemeMode = (state: RootState) => state.theme.mode;
