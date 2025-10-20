import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';

export default function App() {
  const handleStart = () => {
    Alert.alert('Bienvenue', 'Hello CoffeeShop !');
    // Ici plus tard, tu pourras naviguer vers le Menu
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue sur CoffeeShop App !</Text>
      <Button title="Commencer" onPress={handleStart} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,                 // prend tout l'écran
    justifyContent: 'center', // centre verticalement
    alignItems: 'center',    // centre horizontalement
    padding: 20,             // un peu de marge intérieure
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',      // texte en gras
    marginBottom: 20,
    textAlign: 'center',     // centré même si plusieurs lignes
  },
});
