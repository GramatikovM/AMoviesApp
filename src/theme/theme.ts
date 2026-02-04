export type ThemeMode = 'light' | 'dark';

export type ThemeColors = {
  screenBackground: string;
  cardBackground: string;
  textPrimary: string;
  textSecondary: string;
  headerBackground: string;
  headerText: string;
  footerBackground: string;
  footerText: string;
  accent: string;
  border: string;
  skeleton: string;
  placeholderBackground: string;
};

const ACCENT = '#E50914';

export const themeColors: Record<ThemeMode, ThemeColors> = {
  light: {
    screenBackground: '#FFFFFF',
    cardBackground: '#FFFFFF',
    textPrimary: '#111111',
    textSecondary: '#555555',
    headerBackground: '#000000',
    headerText: '#FFFFFF',
    footerBackground: '#000000',
    footerText: '#FFFFFF',
    accent: ACCENT,
    border: '#E0E0E0',
    skeleton: '#E0E0E0',
    placeholderBackground: '#F5F5F5',
  },
  dark: {
    screenBackground: '#000000',
    cardBackground: '#111111',
    textPrimary: '#FFFFFF',
    textSecondary: '#AAAAAA',
    headerBackground: '#FFFFFF',
    headerText: '#000000',
    footerBackground: '#FFFFFF',
    footerText: '#000000',
    accent: ACCENT,
    border: '#333333',
    skeleton: '#1F1F1F',
    placeholderBackground: '#222222',
  },
};

export const getThemeColors = (mode: ThemeMode) => themeColors[mode];
