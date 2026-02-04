import { useMemo } from 'react';

import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '@/app/navigation/types';
import { useTheme } from '@/theme/hooks';
import type { ThemeColors } from '@/theme/theme';

type AccountMenuRoute = Extract<
  keyof RootStackParamList,
  'LikedMovies' | 'Watchlist' | 'Settings'
>;

export type AccountMenuItem = {
  id: string;
  title: string;
  route?: AccountMenuRoute;
  color?: string;
};

const MyAccountScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const menuItems: AccountMenuItem[] = [
    { id: 'liked', title: 'Liked', route: 'LikedMovies' },
    { id: 'watchlist', title: 'Watchlist', route: 'Watchlist' },
    { id: 'settings', title: 'Settings', route: 'Settings' },
    { id: 'logout', title: 'Logout', color: colors.accent },
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
              onPress={() => {
                if (item.route) {
                  navigation.navigate(item.route);
                }
              }}
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

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.screenBackground,
    },
    content: {
      paddingBottom: 20,
    },
    header: {
      alignItems: 'center',
      paddingVertical: 40,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    avatarPlaceholder: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: colors.accent,
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
      color: colors.textPrimary,
    },
    userEmail: {
      fontSize: 14,
      color: colors.textSecondary,
      marginTop: 4,
    },
    menuSection: {
      marginTop: 20,
    },
    menuItem: {
      paddingVertical: 18,
      paddingHorizontal: 25,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    menuText: {
      fontSize: 16,
      color: colors.textPrimary,
      fontWeight: '500',
    },
  });

export default MyAccountScreen;
