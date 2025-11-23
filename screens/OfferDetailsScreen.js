import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function OfferDetailsScreen({ route, navigation }) {
  const { cafe } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Détails de l'offre</Text>
      </View>

      <Image source={{ uri: cafe.image }} style={styles.cafeImage} />

      <View style={styles.contentCard}>
        <Text style={styles.cafeName}>{cafe.name}</Text>
        <Text style={styles.offerText}>{cafe.offer}</Text>
        <Text style={styles.detailText}>Distance: {cafe.distance}</Text>
        <Text style={styles.detailText}>Visites: {cafe.visits}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F5F0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#8B6F47',
  },
  backButton: {
    marginRight: 15,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  cafeImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  contentCard: {
    backgroundColor: '#FFF',
    margin: 15,
    borderRadius: 15,
    padding: 20,
    marginTop: -50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  cafeName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3A2A23',
    marginBottom: 10,
  },
  offerText: {
    fontSize: 18,
    color: '#8B6F47',
    marginBottom: 15,
  },
  detailText: {
    fontSize: 16,
    color: '#6B4F33',
    marginBottom: 5,
  },
});