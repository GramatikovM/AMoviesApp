import React from 'react';
import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import { useAppSelector } from '@/store/hooks';
import { selectLikedMovies } from '@/store/slices/moviesSlice';

import MovieCollectionScreen from './MovieCollectionScreen';
import { RootStackParamList, RootTabParamList } from '@/app/navigation/types';

type NavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<RootStackParamList>,
  BottomTabNavigationProp<RootTabParamList>
>;

const LikedMoviesScreen = () => {
  const movies = useAppSelector(selectLikedMovies);
  const navigation = useNavigation<NavigationProp>();

  return (
    <MovieCollectionScreen
      title="Liked Movies"
      type="liked"
      movies={movies}
      emptyCtaLabel="Browse movies"
      onEmptyCtaPress={() =>
        navigation.navigate('HomeStack', {
          screen: 'Home',
        })
      }
    />
  );
};

export default LikedMoviesScreen;
