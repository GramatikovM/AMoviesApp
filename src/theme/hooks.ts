import { useMemo } from 'react';

import { useAppSelector } from '@/store/hooks';
import { selectThemeMode } from '@/store/slices/themeSlice';

import { getThemeColors } from './theme';

export const useTheme = () => {
  const mode = useAppSelector(selectThemeMode);

  const colors = useMemo(() => getThemeColors(mode), [mode]);

  return { mode, colors };
};
