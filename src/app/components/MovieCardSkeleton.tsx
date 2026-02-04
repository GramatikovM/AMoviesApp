import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';

import { useTheme } from '@/theme/hooks';
import type { ThemeColors } from '@/theme/theme';

const MovieCardSkeleton = () => {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return <View style={styles.card} />;
};

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    card: {
      width: 120,
      height: 180,
      borderRadius: 8,
      backgroundColor: colors.skeleton,
      marginRight: 12,
    },
  });

export default MovieCardSkeleton;
