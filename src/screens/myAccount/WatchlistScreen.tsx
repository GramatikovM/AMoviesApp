import React from 'react';
import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import { useAppSelector } from '@/store/hooks';
import { selectMyListMovies } from '@/store/slices/moviesSlice';

import MovieCollectionScreen from './MovieCollectionScreen';
import { RootStackParamList, RootTabParamList } from '@/app/navigation/types';

type NavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<RootStackParamList>,
  BottomTabNavigationProp<RootTabParamList>
>;

const WatchlistScreen = () => {
  const movies = useAppSelector(selectMyListMovies);
  const navigation = useNavigation<NavigationProp>();

  return (
    <MovieCollectionScreen
      title="My Watchlist"
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

export default WatchlistScreen;
