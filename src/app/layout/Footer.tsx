import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Footer = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]} />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    height: 8,
  },
});

export default Footer;
