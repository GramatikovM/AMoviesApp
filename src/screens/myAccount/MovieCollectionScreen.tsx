import { useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { MovieDetails } from '@/types/movieTypes';
import { RootTabParamList } from '@/app/navigation/types';
import { useAppDispatch } from '@/store/hooks';
import { toggleLikeMovie, toggleMyListMovie } from '@/store/slices/moviesSlice';

import RemoveHint from '@/app/components/shared/RemoveHint';
import MovieCard from '@/app/components/movies/MovieCard';
import { useTheme } from '@/theme/hooks';
import type { ThemeColors } from '@/theme/theme';

type Props = {
  title: string;
  type?: string;
  movies: MovieDetails[];
  emptyCtaLabel?: string;
  onEmptyCtaPress?: () => void;
};

const MovieCollectionScreen: React.FC<Props> = ({
  title,
  type,
  movies,
  emptyCtaLabel,
  onEmptyCtaPress,
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootTabParamList>>();
  const dispatch = useAppDispatch();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const confirmRemove = (movie: MovieDetails) => {
    Alert.alert(
      'Remove movie',
      `Remove "${movie.Title}" from your ${
        type === 'liked' ? 'Liked movies' : 'Watchlist'
      }?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            type === 'liked'
              ? dispatch(toggleLikeMovie(movie))
              : dispatch(toggleMyListMovie(movie));
          },
        },
      ],
    );
  };

  const renderItem = ({ item }: { item: MovieDetails }) => {
    return (
      <MovieCard
        movie={item}
        onPress={() =>
          navigation.navigate('HomeStack', {
            screen: 'MovieDetails',
            params: {
              imdbID: item.imdbID,
              basicMovie: item,
            },
          })
        }
        onLongPress={() => confirmRemove(item)}
      />
    );
  };

  if (!movies.length) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>{title}</Text>
        <Text style={styles.emptyText}>Nothing here yet.</Text>

        {onEmptyCtaPress && (
          <Pressable style={styles.ctaButton} onPress={onEmptyCtaPress}>
            <Text style={styles.ctaText}>{emptyCtaLabel}</Text>
          </Pressable>
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <RemoveHint text="Tip: Long-press a movie to remove it from this list." />

      <FlatList
        data={movies}
        keyExtractor={item => item.imdbID}
        numColumns={3}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.screenBackground,
    },
    list: {
      paddingHorizontal: 8,
      paddingBottom: 16,
    },
    emptyContainer: {
      flex: 1,
      backgroundColor: colors.screenBackground,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 24,
    },
    emptyTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      color: colors.textPrimary,
      marginBottom: 8,
    },
    emptyText: {
      color: colors.textSecondary,
      fontSize: 14,
      textAlign: 'center',
    },
    ctaButton: {
      marginTop: 20,
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 6,
      backgroundColor: colors.accent,
    },

    ctaText: {
      color: '#fff',
      fontWeight: '600',
      fontSize: 14,
    },
  });

export default MovieCollectionScreen;
