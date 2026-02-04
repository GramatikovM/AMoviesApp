import { useEffect, useMemo, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Pressable,
  Animated,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { ThumbsUp, Plus, Check } from 'lucide-react-native';

import { RootStackParamList } from '@/app/navigation/types';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchMovieDetails,
  selectMovieDetails,
  selectMovieDetailsLoading,
  clearMovieDetails,
  toggleLikeMovie,
  toggleMyListMovie,
  selectIsMovieLiked,
  selectIsMovieInMyList,
} from '@/store/slices/moviesSlice';
import { useTheme } from '@/theme/hooks';
import type { ThemeColors } from '@/theme/theme';

type RouteProps = RouteProp<RootStackParamList, 'MovieDetails'>;

const MovieDetailsScreen = () => {
  const { params } = useRoute<RouteProps>();
  const { imdbID, basicMovie } = params;

  const dispatch = useAppDispatch();

  const movie = useAppSelector(selectMovieDetails);
  const loading = useAppSelector(selectMovieDetailsLoading);
  const isLiked = useAppSelector(state => selectIsMovieLiked(state, imdbID));
  const isInMyList = useAppSelector(state =>
    selectIsMovieInMyList(state, imdbID),
  );

  const likeScale = useRef(new Animated.Value(1)).current;
  const likeRotation = useRef(new Animated.Value(0)).current;
  
  const listScale = useRef(new Animated.Value(1)).current;
  const listRotation = useRef(new Animated.Value(0)).current;
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const animateButton = (
    scaleValue: Animated.Value,
    rotationValue: Animated.Value,
  ) => {
    Animated.parallel([
      Animated.sequence([
        Animated.spring(scaleValue, {
          toValue: 1.4,
          useNativeDriver: true,
          speed: 40,
          bounciness: 18,
        }),
        Animated.spring(scaleValue, {
          toValue: 1,
          useNativeDriver: true,
          speed: 40,
          bounciness: 18,
        }),
      ]),
      Animated.sequence([
        Animated.timing(rotationValue, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(rotationValue, {
          toValue: -1,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(rotationValue, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  };

  const likeRotate = likeRotation.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ['-15deg', '0deg', '15deg'],
  });

  const listRotate = listRotation.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ['-15deg', '0deg', '15deg'],
  });

  useEffect(() => {
    dispatch(fetchMovieDetails(imdbID));

    return () => {
      dispatch(clearMovieDetails());
    };
  }, [imdbID]);

  const handleLike = () => {
    if (movie) {
      animateButton(likeScale, likeRotation);
      dispatch(toggleLikeMovie(movie));
    }
  };

  const handleAddToList = () => {
    if (movie) {
      animateButton(listScale, listRotation);
      dispatch(toggleMyListMovie(movie));
    }
  };
  

  if (loading && !movie) {
    return <ActivityIndicator style={{ flex: 1 }} color={colors.accent} />;
  }

  const poster =
    movie?.Poster && movie.Poster !== 'N/A' ? movie.Poster : basicMovie?.Poster;

  return (
    <ScrollView style={styles.container}>
      {poster && (
        <Image
          source={{ uri: poster }}
          style={styles.poster}
          resizeMode="contain"
        />
      )}

      <View style={styles.content}>
        <Text style={styles.title}>{movie?.Title}</Text>
        <Text style={styles.meta}>
          {movie?.Year} • {movie?.Runtime} • {movie?.Rated}
        </Text>

        <Text style={styles.plot}>{movie?.Plot}</Text>

        <View style={styles.actions}>
          <Pressable style={styles.actionButton} onPress={handleLike}>
            <Animated.View
              style={{
                transform: [{ scale: likeScale }, { rotate: likeRotate }],
              }}>
              <ThumbsUp
                size={20}
                color={colors.textPrimary}
                fill={isLiked ? colors.textPrimary : 'transparent'}
                strokeWidth={2}
              />
            </Animated.View>
            <Text style={styles.actionText}>{isLiked ? 'Liked' : 'Like'}</Text>
          </Pressable>

          <Pressable style={styles.actionButton} onPress={handleAddToList}>
            <Animated.View
              style={{
                transform: [{ scale: listScale }, { rotate: listRotate }],
              }}>
              {isInMyList ? (
                <Check size={20} color={colors.textPrimary} strokeWidth={3} />
              ) : (
                <Plus size={20} color={colors.textPrimary} strokeWidth={2} />
              )}
            </Animated.View>
            <Text style={styles.actionText}>
              {isInMyList ? 'In My List' : 'My List'}
            </Text>
          </Pressable>
        </View>

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

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.screenBackground,
    },
    poster: {
      width: '100%',
      height: 420,
    },
    content: {
      padding: 16,
    },
    title: {
      color: colors.textPrimary,
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    meta: {
      color: colors.textSecondary,
      marginBottom: 12,
    },
    plot: {
      color: colors.textPrimary,
      lineHeight: 20,
      marginBottom: 16,
    },
    section: {
      alignSelf: 'center',
      color: colors.textPrimary,
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 16,
      marginBottom: 12,
    },
    detailsContainer: {
      paddingBottom: 24,
    },
    label: {
      fontWeight: 'bold',
      color: colors.textPrimary,
    },
    detail: {
      color: colors.textPrimary,
      marginBottom: 10,
    },
    actions: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 20,
    },

    actionButton: {
      flexDirection: 'column',
      alignItems: 'center',
      gap: 8,
    },
    actionText: {
      color: colors.textPrimary,
      fontWeight: '600',
    },
  });

export default MovieDetailsScreen;
