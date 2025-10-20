import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function MenuScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue au Menu CoffeeShop !</Text>
      <Button title="Voir les Produits" onPress={() => alert('Liste des produits')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, marginBottom: 20 },
});
