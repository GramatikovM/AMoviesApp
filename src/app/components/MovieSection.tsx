import React, { memo, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { AppDispatch } from '@/store/store';
import {
  fetchCategory,
  selectCategoryLoading,
  selectCategoryError,
  selectCategoryMovies,
} from '@/store/slices/moviesSlice';
import { useAppSelector } from '@/store/hooks';

import type { Movie } from '@/types/movieTypes';
import { RootStackParamList } from '@/app/navigation/types';

import MovieCard from './MovieCard';
import MovieCardSkeleton from './MovieCardSkeleton';
import { SKELETON_COUNT } from '@/shared/constants/constants';
import { useTheme } from '@/theme/hooks';
import type { ThemeColors } from '@/theme/theme';

type Props = {
  title: string;
  category: string;
  query: string;
  layout?: 'horizontal' | 'vertical';
};
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const MovieSection = memo(
  ({ title, category, query, layout = 'horizontal' }: Props) => {
    const navigation = useNavigation<NavigationProp>();
    const skeletonData = Array.from({ length: SKELETON_COUNT }).map(
      (_, index) => ({ id: `skeleton-${index}` }),
    );
    const isHorizontal = layout === 'horizontal';
    const currentPage = useAppSelector(
      state => state.movies.pagination[category],
    );
    const movies = useAppSelector(selectCategoryMovies(category));
    const loading = useAppSelector(selectCategoryLoading(category));
    const error = useAppSelector(selectCategoryError(category));
    const dispatch = useDispatch<AppDispatch>();
    const { colors } = useTheme();
    const styles = useMemo(() => createStyles(colors), [colors]);

    const isInitialLoading = loading && movies.length === 0;
    const data = isInitialLoading ? skeletonData : movies;

    const loadMore = useCallback(() => {
      if (!loading && movies.length > 0) {
        dispatch(
          fetchCategory({
            category: category,
            s: query,
            page: currentPage,
          }),
        );
      }
    }, [dispatch, loading, category, query, currentPage, movies.length]);

    const renderItem = useCallback(
      ({ item }: { item: Movie | { id: string } }) => {
        if ('id' in item) {
          return <MovieCardSkeleton />;
        }

        return (
          <MovieCard
            movie={item}
            onPress={() =>
              navigation.navigate('MovieDetails', {
                imdbID: item.imdbID,
                basicMovie: item,
              })
            }
          />
        );
      },
      [navigation],
    );

    if (error && movies.length === 0) {
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
          data={data}
          horizontal={isHorizontal}
          keyExtractor={item => ('id' in item ? item.id : item.imdbID)}
          renderItem={renderItem}
          onEndReached={!isInitialLoading ? loadMore : undefined}
          onEndReachedThreshold={0.5}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            isHorizontal ? styles.horizontalList : undefined
          }
          ListFooterComponent={
            loading ? <ActivityIndicator size="small" color={colors.accent} /> : null
          }
        />
      </View>
    );
  },
);

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      marginTop: 12,
      marginBottom: 8,
    },
    title: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.textPrimary,
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
