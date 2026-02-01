import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from '@/store/store';
import { useAppSelector } from '@/store/hooks';
import {
  selectTrendingMovies,
  selectPopularMovies,
  selectTopRatedMovies,
  selectMoviesLoading,
  selectMoviesError,
  fetchCategory,
} from '@/store/slices/moviesSlice';

import { HOME_SECTIONS } from '@/config/homeSections.config';
import MovieSection from '@/app/components/MovieSection';

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch<AppDispatch>();

  const categories = useAppSelector(state => state.movies.categories);
  const isLoading = useAppSelector(selectMoviesLoading);
  const error = useAppSelector(selectMoviesError);
  console.log("categories --- ", categories);


  useEffect(() => {
    HOME_SECTIONS.forEach(section => {
      dispatch(
        fetchCategory({
          category: section.category,
          s: section.query.s,
        }),
      );
    });
  }, []);

  if (isLoading) return <ActivityIndicator size="large" />;

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: 'red' }}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={HOME_SECTIONS}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <MovieSection
            title={item.title}
            layout={item.layout}
            movies={categories[item.category] ?? []}
            loading={isLoading}
            error={error ?? undefined}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingBottom: 24,
  },
});

export default HomeScreen;
