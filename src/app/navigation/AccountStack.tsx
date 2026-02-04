import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList } from './types';

import MyAccountScreen from '@/screens/myAccount/MyAccountScreen';
import WatchlistScreen from '@/screens/myAccount/WatchlistScreen';
import LikedMoviesScreen from '@/screens/myAccount/LikedMoviesScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AccountStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#000' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen
        name="Account"
        component={MyAccountScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Watchlist"
        component={WatchlistScreen}
        options={{ title: 'My Watchlist' }}
      />
      <Stack.Screen
        name="LikedMovies"
        component={LikedMoviesScreen}
        options={{ title: 'Liked Movies' }}
      />
    </Stack.Navigator>
  );
};

export default AccountStack;
