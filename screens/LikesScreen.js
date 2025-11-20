import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function LikesScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#3A2A23" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mes Favoris</Text>
      </View>
      <View style={styles.content}>
        <Ionicons name="heart-outline" size={80} color="#B8A08D" />
        <Text style={styles.message}>Vous n'avez pas encore de favoris.</Text>
        <Text style={styles.subMessage}>Ajoutez des cafés à vos favoris pour les retrouver ici !</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F5F0',
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3A2A23',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  message: {
    fontSize: 18,
    color: '#5A3E2B',
    marginTop: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subMessage: {
    fontSize: 14,
    color: '#8B6F47',
    marginTop: 10,
    textAlign: 'center',
  },
});