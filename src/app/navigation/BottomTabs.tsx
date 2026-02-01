import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { RootTabParamList } from './types';

import HomeStack from './HomeStack';
import AccountScreen from '@/screens/myAccount/MyAccountScreen';

const Tab = createBottomTabNavigator<RootTabParamList>();

const BottomTabs = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{ title: 'Home' }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{ title: 'My Account' }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabs;