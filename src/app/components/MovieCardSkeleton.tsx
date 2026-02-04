import React from 'react';
import { View, StyleSheet } from 'react-native';

const MovieCardSkeleton = () => {
  return <View style={styles.card} />;
};

const styles = StyleSheet.create({
  card: {
    width: 120,
    height: 180,
    borderRadius: 8,
    backgroundColor: '#e0e0e0',
    marginRight: 12,
  },
});

export default MovieCardSkeleton;
