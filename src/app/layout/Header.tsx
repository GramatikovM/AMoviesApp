import { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { useTheme } from '@/theme/hooks';
import type { ThemeColors } from '@/theme/theme';

const Header = () => {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>M</Text>
      <Text style={styles.title}>Home</Text>
    </View>
  );
};

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: { flexDirection: 'row', alignItems: 'center' },
    logo: { color: '#E50914', fontSize: 30, fontWeight: 'bold' },
    title: { color: colors.headerText, fontSize: 18, marginLeft: 8 },
  });

export default Header;
