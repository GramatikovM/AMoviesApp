import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { HomeStackParamList } from './types';
import HomeScreen from '@/screens/home/HomeScreen';
import MovieDetailsScreen from '@/screens/movieDetails/MovieDetailsScreen';
import Header from '../layout/Header';
import { useTheme } from '@/theme/hooks';

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStack = () => {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.headerBackground },
        headerTintColor: colors.headerText,
        contentStyle: { backgroundColor: colors.screenBackground },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: () => <Header />,
        }}
      />
      <Stack.Screen
        name="MovieDetails"
        component={MovieDetailsScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
