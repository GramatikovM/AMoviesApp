import React, { memo } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import { Movie } from '@/types/movieTypes';
import MovieCard from './MovieCard';

type Props = {
  title: string;
  movies: Movie[];
  layout?: 'horizontal' | 'vertical';
  loading: boolean;
  error?: string;
};

const MovieSection = memo(
  ({ title, movies, layout = 'horizontal', loading, error }: Props) => {
    const isHorizontal = layout === 'horizontal';

    if (loading) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          <ActivityIndicator color="#fff" />
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.error}>{error}</Text>
        </View>
      );
    }

    if (!movies.length) {
      return null;
    }

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>

        <FlatList
          data={movies}
          horizontal={isHorizontal}
          keyExtractor={(item) => item.imdbID}
          renderItem={({ item }) => (
            <MovieCard movie={item} />
          )}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            isHorizontal ? styles.horizontalList : undefined
          }
        />
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  horizontalList: {
    paddingHorizontal: 16,
  },
  error: {
    color: '#ff6b6b',
    paddingHorizontal: 16,
  },
});

export default MovieSection;