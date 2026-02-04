import React from 'react';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { HomeStackParamList } from './types';
import HomeScreen from '@/screens/home/HomeScreen';
import MovieDetailsScreen from '@/screens/movieDetails/MovieDetailsScreen';
import Header from '../layout/Header';

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: () => <Header />,
          headerStyle: styles.headerBg,
        }}
      />
      <Stack.Screen
        name="MovieDetails"
        component={MovieDetailsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center' },
  logo: { color: '#E50914', fontSize: 30, fontWeight: 'bold' },
  title: { color: '#fff', fontSize: 18, marginLeft: 8 },
  headerBg: { backgroundColor: '#000' },
});

export default HomeStack;
