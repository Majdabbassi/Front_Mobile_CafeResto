import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

export default function MenuWebScreen({ route }) {
  const [products, setProducts] = useState([]);
  const caferestoId = route?.params?.caferestoId || 1;

  useEffect(() => {
    fetch(`http://192.168.1.77:8080/api/products/caferesto/${caferestoId}/visible`) // ton backend local
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Menu Café</Text>
      {products.map(p => (
        <View key={p.id} style={styles.card}>
          <Text style={styles.name}>{p.name}</Text>
          <Text style={styles.price}>{p.price} DT</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center' },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 30 },
  card: { padding: 15, margin: 10, borderWidth: 1, borderRadius: 8, width: 250 },
  name: { fontSize: 20, fontWeight: 'bold' },
  price: { fontSize: 18, marginTop: 5 }
});
