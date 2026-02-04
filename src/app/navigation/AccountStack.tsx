import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList } from './types';

import MyAccountScreen from '@/screens/myAccount/MyAccountScreen';
import WatchlistScreen from '@/screens/myAccount/WatchlistScreen';
import LikedMoviesScreen from '@/screens/myAccount/LikedMoviesScreen';
import SettingsScreen from '@/screens/myAccount/SettingsScreen';
import { useTheme } from '@/theme/hooks';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AccountStack = () => {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.headerBackground },
        headerTintColor: colors.headerText,
        headerTitleStyle: { fontWeight: 'bold' },
        contentStyle: { backgroundColor: colors.screenBackground },
      }}
    >
      <Stack.Screen
        name="Account"
        component={MyAccountScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Watchlist"
        component={WatchlistScreen}
        options={{
          title: 'My Watchlist',
        }}
      />
      <Stack.Screen
        name="LikedMovies"
        component={LikedMoviesScreen}
        options={{
          title: 'Liked Movies',
        }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: 'Settings' }}
      />
    </Stack.Navigator>
  );
};

export default AccountStack;
