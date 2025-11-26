import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CoworkingDetailsScreen({ route, navigation }) {
  const { cafe } = route.params;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#3A2A23" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Espace Coworking</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cafeName}>{cafe.name}</Text>
          <Text style={styles.sectionTitle}>Informations Coworking</Text>

          <View style={styles.infoItem}>
            <Ionicons name="flash-outline" size={20} color="#8B6F47" />
            <Text style={styles.infoText}>Prises électriques: {cafe.coworking?.powerOutlets || 'Non spécifié'}</Text>
          </View>

          <View style={styles.infoItem}>
            <Ionicons name="wifi-outline" size={20} color="#8B6F47" />
            <Text style={styles.infoText}>Qualité WiFi: {cafe.coworking?.wifiQuality || 'Non spécifié'}</Text>
          </View>

          <View style={styles.infoItem}>
            <Ionicons name="volume-mute-outline" size={20} color="#8B6F47" />
            <Text style={styles.infoText}>Zone calme: {cafe.coworking?.quietZone ? 'Oui' : 'Non'}</Text>
          </View>

          <View style={styles.infoItem}>
            <Ionicons name="chair-outline" size={20} color="#8B6F47" />
            <Text style={styles.infoText}>Sièges disponibles: {cafe.coworking?.availableSeats || 'Non spécifié'}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5E6D3',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#FFF',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3A2A23',
  },
  card: {
    backgroundColor: '#FFF',
    margin: 15,
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  cafeName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3A2A23',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3A2A23',
    marginTop: 10,
    marginBottom: 10,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#6B4F33',
  },
});
