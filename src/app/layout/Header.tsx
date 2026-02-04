import { View, Text, StyleSheet } from 'react-native';

const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>M</Text>
      <Text style={styles.title}>Home</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center' },
  logo: { color: '#E50914', fontSize: 30, fontWeight: 'bold' },
  title: { color: '#fff', fontSize: 18, marginLeft: 8 },
});

export default Header;
