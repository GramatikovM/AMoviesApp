import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { MovieDetails } from '@/types/movieTypes';
import { RootTabParamList } from '@/app/navigation/types';
import { useAppDispatch } from '@/store/hooks';
import { toggleLikeMovie, toggleMyListMovie } from '@/store/slices/moviesSlice';

import RemoveHint from '@/app/components/RemoveHint';
import MovieCard from '@/app/components/MovieCard';

interface Props {
  title: string;
  type?: string;
  movies: MovieDetails[];
  emptyCtaLabel?: string;
  onEmptyCtaPress?: () => void;
}

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
    const poster =
      item.Poster && item.Poster !== 'N/A' ? item.Poster : undefined;

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    padding: 16,
  },
  list: {
    paddingHorizontal: 8,
    paddingBottom: 16,
  },
  card: {
    flex: 1 / 3,
    margin: 8,
  },
  poster: {
    width: '100%',
    aspectRatio: 2 / 3,
    borderRadius: 6,
  },
  posterPlaceholder: {
    width: '100%',
    aspectRatio: 2 / 3,
    borderRadius: 6,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#aaa',
    fontSize: 12,
  },
  title: {
    color: '#fff',
    marginTop: 6,
    fontSize: 13,
    fontWeight: '600',
  },
  year: {
    color: '#aaa',
    fontSize: 12,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  emptyText: {
    color: '#aaa',
    fontSize: 14,
    textAlign: 'center',
  },
  ctaButton: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
    backgroundColor: '#e50914',
  },

  ctaText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default MovieCollectionScreen;
