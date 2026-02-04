import React from 'react';

import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '@/app/navigation/types';

export interface AccountMenuItem {
  id: string;
  title: string;
  route?: keyof RootStackParamList; 
  color?: string;
}

const MyAccountScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const menuItems: AccountMenuItem[] = [
    { id: 'liked', title: 'Liked', route: 'LikedMovies' },
    { id: 'watchlist', title: 'Watchlist', route: 'Watchlist' },
    { id: 'settings', title: 'Settings' },
    { id: 'logout', title: 'Logout', color: '#e50914' },
  ];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>Acc</Text>
          </View>
          <Text style={styles.userName}>My Account</Text>
          <Text style={styles.userEmail}>AMovies.com</Text>
        </View>

        <View style={styles.menuSection}>
          {menuItems.map(item => (
            <Pressable
              key={item.id}
              style={styles.menuItem}
              onPress={() => item.route && navigation.navigate(item.route as any)}
            >
              <Text
                style={[
                  styles.menuText,
                  item.color ? { color: item.color } : null,
                ]}
              >
                {item.title}
              </Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    paddingBottom: 20,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#e50914',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  menuSection: {
    marginTop: 20,
  },
  menuItem: {
    paddingVertical: 18,
    paddingHorizontal: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#f9f9f9',
  },
  menuText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
});

export default MyAccountScreen;
