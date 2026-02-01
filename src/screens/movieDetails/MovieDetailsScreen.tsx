import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const MovieDetailsScreen = ({ route, navigation }) => {
  const insets = useSafeAreaInsets();
  
  // We extract the params sent from the Home screen
  // If no params exist, we provide a fallback object
  const { title, id } = route.params || { title: 'Unknown Movie', id: 0 };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}>
        
        {/* Poster Placeholder */}
        <View style={[styles.posterPlaceholder, { height: 400 }]}>
          <Text style={styles.placeholderText}>Poster for {title}</Text>
        </View>

        <View style={styles.detailsContent}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.metadata}>2024 • Action, Sci-Fi • 2h 15m</Text>
          
          <TouchableOpacity style={styles.playButton}>
            <Text style={styles.playButtonText}>Play Now</Text>
          </TouchableOpacity>

          <Text style={styles.synopsisTitle}>Synopsis</Text>
          <Text style={styles.synopsisText}>
            This is where the movie description will go. Since you're building BMovies, 
            you'll likely fetch this data from an API using the ID: {id}.
          </Text>
        </View>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Movies usually look better on dark themes
  },
  posterPlaceholder: {
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#777',
    fontSize: 18,
  },
  detailsContent: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  metadata: {
    color: '#aaa',
    marginTop: 8,
    fontSize: 14,
  },
  playButton: {
    backgroundColor: '#e50914',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 20,
  },
  playButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  synopsisTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  synopsisText: {
    color: '#ccc',
    lineHeight: 22,
    fontSize: 15,
  },
});

export default MovieDetailsScreen;