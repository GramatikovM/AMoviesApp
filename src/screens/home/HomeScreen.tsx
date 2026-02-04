import React, { useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '@/store/store';
import { fetchCategory } from '@/store/slices/moviesSlice';

import { HOME_SECTIONS } from '@/config/homeSections.config';
import MovieSection from '@/app/components/MovieSection';

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const dispatch = useDispatch<AppDispatch>();

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

  return (
    <View style={styles.container}>
      <FlatList
        data={HOME_SECTIONS}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <MovieSection
            title={item.title}
            category={item.category}
            query={item.query.s}
            layout={item.layout}
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
