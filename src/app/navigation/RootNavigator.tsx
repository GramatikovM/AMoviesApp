import { DefaultTheme, DarkTheme, NavigationContainer } from '@react-navigation/native';
import { useMemo } from 'react';

import BottomTabs from './BottomTabs';
import { useTheme } from '@/theme/hooks';

const RootNavigator = () => {
  const { mode, colors } = useTheme();

  const navigationTheme = useMemo(
    () => ({
      ...(mode === 'dark' ? DarkTheme : DefaultTheme),
      colors: {
        ...(mode === 'dark' ? DarkTheme.colors : DefaultTheme.colors),
        primary: colors.accent,
        background: colors.screenBackground,
        card: colors.headerBackground,
        border: colors.border,
        text: colors.textPrimary,
      },
    }),
    [mode, colors],
  );

  return (
    <NavigationContainer theme={navigationTheme}>
      <BottomTabs />
    </NavigationContainer>
  );
};

export default RootNavigator;
