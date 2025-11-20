import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';

export default function ProfileScreen({ navigation }) {
  const route = useRoute();
  const user = route?.params?.user || {};

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mon Profil</Text>
      </View>

      <View style={styles.profileCard}>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: user.avatar || 'https://via.placeholder.com/100/8B6F47/FFFFFF?text=U' }}
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.editAvatarButton}>
            <Ionicons name="camera" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>
        <Text style={styles.userName}>{user.username || "Utilisateur"}</Text>
        <Text style={styles.userEmail}>{user.email || "user@example.com"}</Text>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{user.visits || 15}</Text>
            <Text style={styles.statLabel}>Visites</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{user.points || 120}</Text>
            <Text style={styles.statLabel}>Points</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{user.favorites || 5}</Text>
            <Text style={styles.statLabel}>Favoris</Text>
          </View>
        </View>
      </View>

      <View style={styles.detailsCard}>
        <Text style={styles.cardTitle}>Informations Personnelles</Text>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Nom d'utilisateur</Text>
          <Text style={styles.detailValue}>{user.username || "Non défini"}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Email</Text>
          <Text style={styles.detailValue}>{user.email || "Non défini"}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Téléphone</Text>
          <Text style={styles.detailValue}>{user.phone || "Non défini"}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Date de naissance</Text>
          <Text style={styles.detailValue}>{user.dob || "Non défini"}</Text>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Modifier les informations</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.detailsCard}>
        <Text style={styles.cardTitle}>Préférences</Text>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Boisson préférée</Text>
          <Text style={styles.detailValue}>{user.favoriteDrink || "Café Latte"}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Type de café</Text>
          <Text style={styles.detailValue}>{user.coffeeType || "Arabica"}</Text>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Modifier les préférences</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
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
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  profileCard: {
    backgroundColor: '#FFF',
    margin: 15,
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginTop: -50, // Overlap with header
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#8B6F47',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#8B6F47',
    borderRadius: 20,
    padding: 8,
    borderWidth: 2,
    borderColor: '#FFF',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3A2A23',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: '#8B6F47',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    paddingTop: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3A2A23',
  },
  statLabel: {
    fontSize: 14,
    color: '#8B6F47',
  },
  detailsCard: {
    backgroundColor: '#FFF',
    marginHorizontal: 15,
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3A2A23',
    marginBottom: 15,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  detailLabel: {
    fontSize: 16,
    color: '#5A3E2B',
  },
  detailValue: {
    fontSize: 16,
    color: '#3A2A23',
    fontWeight: '500',
  },
  editButton: {
    backgroundColor: '#8B6F47',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  editButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});