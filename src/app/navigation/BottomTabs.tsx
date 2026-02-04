import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, User } from 'lucide-react-native';
import { StyleSheet } from 'react-native';

import type { RootTabParamList } from './types';
import HomeStack from './HomeStack';
import AccountStack from './AccountStack';

const Tab = createBottomTabNavigator<RootTabParamList>();

const TAB_ICONS = {
  HomeStack: Home,
  AccountStack: User,
};

const BottomTabs = () => {
  return (
    <Tab.Navigator 
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#E50914',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: styles.tabBar,
        tabBarIcon: ({ color, size }) => {
          const IconComponent = TAB_ICONS[route.name as keyof typeof TAB_ICONS];
          return <IconComponent color={color} size={size} />;
        },
      })}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{ title: 'Home' }}
      />
      <Tab.Screen
        name="AccountStack"
        component={AccountStack}
        options={{ title: 'My Account' }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#000',
    borderTopColor: '#333',
  }
});

export default BottomTabs;