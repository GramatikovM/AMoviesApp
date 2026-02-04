import { memo, useMemo } from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';

import { Movie } from '@/types/movieTypes';
import { useTheme } from '@/theme/hooks';
import type { ThemeColors } from '@/theme/theme';

type Props = {
  movie: Movie;
  onPress: () => void;
  onLongPress?: () => void;
};

const MovieCard = memo(({ movie, onPress, onLongPress }: Props) => {
  const hasPoster = movie.Poster && movie.Poster !== 'N/A';
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <Pressable
      style={styles.card}
      onPress={onPress}
      onLongPress={onLongPress}
      delayLongPress={800}
      android_ripple={{ color: colors.border }}
    >
      {hasPoster ? (
        <Image
          source={{ uri: movie.Poster }}
          style={styles.poster}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.posterFallback}>
          <Text style={styles.fallbackText}>{movie.Title}</Text>
        </View>
      )}

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {movie.Title}
        </Text>
        <Text style={styles.year}>{movie.Year}</Text>
      </View>
    </Pressable>
  );
});

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    card: {
      width: 120,
      marginTop: 4,
      marginRight: 12,
      borderRadius: 8,
      overflow: 'hidden',
      backgroundColor: colors.cardBackground,
    },
    poster: {
      width: '100%',
      height: 180,
      borderRadius: 8,
    },
    posterFallback: {
      flex: 1,
      backgroundColor: colors.placeholderBackground,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 8,
    },
    fallbackText: {
      color: colors.textSecondary,
      fontSize: 12,
      textAlign: 'center',
    },
    info: {
      marginTop: 4,
      paddingLeft: 4,
      minHeight: 24,
    },
    title: {
      color: colors.textPrimary,
      fontSize: 12,
      fontWeight: '600',
      lineHeight: 14,
    },
    year: {
      color: colors.textSecondary,
      fontSize: 10,
    },
  });

export default MovieCard;
