import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function BestCafesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meilleurs Cafés</Text>
      {/* Future content for best cafes */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5E6D3',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3A2A23',
  },
});
