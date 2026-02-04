import { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useAppDispatch } from '@/store/hooks';
import { setThemeMode } from '@/store/slices/themeSlice';
import { useTheme } from '@/theme/hooks';
import type { ThemeColors, ThemeMode } from '@/theme/theme';

const THEME_OPTIONS: ThemeMode[] = ['light', 'dark'];

const SettingsScreen = () => {
  const dispatch = useAppDispatch();
  const { mode, colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Appearance</Text>
      <Text style={styles.subtitle}>
        Switch between light and dark themes.
      </Text>

      <View style={styles.buttonRow}>
        {THEME_OPTIONS.map(option => {
          const isActive = option === mode;
          return (
            <Pressable
              key={option}
              style={[
                styles.button,
                isActive && styles.buttonActive,
              ]}
              onPress={() => dispatch(setThemeMode(option))}
            >
              <Text
                style={[
                  styles.buttonText,
                  isActive && styles.buttonTextActive,
                ]}
              >
                {option === 'light' ? 'Light Theme' : 'Dark Theme'}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.screenBackground,
      padding: 24,
      gap: 12,
    },
    title: {
      fontSize: 22,
      fontWeight: '700',
      color: colors.textPrimary,
    },
    subtitle: {
      fontSize: 14,
      color: colors.textSecondary,
      marginBottom: 16,
    },
    buttonRow: {
      width: '100%',
    },
    button: {
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.border,
      paddingVertical: 12,
      paddingHorizontal: 16,
      backgroundColor: colors.cardBackground,
      marginBottom: 12,
    },
    buttonActive: {
      borderColor: colors.accent,
      backgroundColor: colors.accent,
    },
    buttonText: {
      color: colors.textPrimary,
      fontWeight: '600',
      textAlign: 'center',
    },
    buttonTextActive: {
      color: '#fff',
    },
  });

export default SettingsScreen;
