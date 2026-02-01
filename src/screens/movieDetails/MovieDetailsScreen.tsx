import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

import { RootStackParamList } from '@/app/navigation/types';
import { omdbRequest } from '@/services/omdbClient';

type RouteProps = RouteProp<RootStackParamList, 'MovieDetails'>;

const MovieDetailsScreen = () => {
  const { params } = useRoute<RouteProps>();
  const { imdbID, basicMovie } = params;

  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  console.log('movie --- ', movie);

  useEffect(() => {
    const loadMovie = async () => {
      try {
        const data = await omdbRequest({
          i: imdbID,
          plot: 'full',
        });
        setMovie(data);
      } catch (e) {
        console.warn('Failed to load movie details', e);
      } finally {
        setLoading(false);
      }
    };

    loadMovie();
  }, [imdbID]);

  if (loading && !movie) {
    return <ActivityIndicator style={{ flex: 1 }} />;
  }

  const poster =
    movie?.Poster && movie.Poster !== 'N/A' ? movie.Poster : basicMovie?.Poster;

  return (
    <ScrollView style={styles.container}>
      {poster && <Image source={{ uri: poster }} style={styles.poster} resizeMode="contain" />}

      <View style={styles.content}>
        <Text style={styles.title}>{movie?.Title}</Text>
        <Text style={styles.meta}>
          {movie?.Year} • {movie?.Runtime} • {movie?.Rated}
        </Text>

        <Text style={styles.plot}>{movie?.Plot}</Text>

        <Text style={styles.section}>Details</Text>
        <View style={styles.detailsContainer}>
          <Text style={styles.detail}>
            <Text style={styles.label}>Genre: </Text>
            {movie?.Genre}
          </Text>
          <Text style={styles.detail}>
            <Text style={styles.label}>Director: </Text>
            {movie?.Director}
          </Text>
          <Text style={styles.detail}>
            <Text style={styles.label}>Actors: </Text>
            {movie?.Actors}
          </Text>
          <Text style={styles.detail}>
            <Text style={styles.label}>IMDb Rating: </Text>
            {movie?.imdbRating}
          </Text>
          <Text style={styles.detail}>
            <Text style={styles.label}>Runtime: </Text>
            {movie?.Runtime}
          </Text>
          <Text style={styles.detail}>
            <Text style={styles.label}>Released: </Text>
            {movie?.Released}
          </Text>
          <Text style={styles.detail}>
            <Text style={styles.label}>Language: </Text>
            {movie?.Language}
          </Text>
          <Text style={styles.detail}>
            <Text style={styles.label}>Awards: </Text>
            {movie?.Awards}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  poster: {
    width: '100%',
    height: 420,
  },
  content: {
    padding: 16,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  meta: {
    color: '#aaa',
    marginBottom: 12,
  },
  plot: {
    color: '#fff',
    lineHeight: 20,
    marginBottom: 16,
  },
  section: {
    alignSelf: "center",
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 12
  },
  detailsContainer: {
    paddingBottom: 24,
  },
  label: {
    fontWeight: 'bold',
    color: '#fff',
  },
  detail: {
    color: '#fff',
    marginBottom: 10,
  },
});

export default MovieDetailsScreen;
