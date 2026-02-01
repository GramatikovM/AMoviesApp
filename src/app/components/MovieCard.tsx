import React, { memo } from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Movie } from '@/types/movieTypes';
import { RootStackParamList } from '@/app/navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const MovieCard = memo(({ movie }: { movie: Movie }) => {
  const navigation = useNavigation<NavigationProp>();

  const hasPoster = movie.Poster && movie.Poster !== 'N/A';

  const onPress = () => {
    navigation.navigate('MovieDetails', {
      imdbID: movie.imdbID,
      basicMovie: movie,
    });
  };

  return (
    <Pressable onPress={onPress} style={styles.card}>
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

const styles = StyleSheet.create({
  card: {
    width: 120,
    marginRight: 12,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff'
  },
  poster: {
    width: '100%',
    height: 180,
    borderRadius: 8,
  },
  posterFallback: {
    flex: 1,
    backgroundColor: '#444',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  fallbackText: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
  },
  info: {
    marginTop: 4,
    minHeight: 24,
  },
  title: {
    color: '#000',
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 14,
  },
  year: {
    color: '#555',
    fontSize: 10,
  },
});

export default MovieCard;
