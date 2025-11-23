import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HistoryScreen({ navigation }) {
  const orderHistory = [
    { id: '1', date: '2023-10-26', items: ['Cappuccino', 'Croissant'], total: 8.50 },
    { id: '2', date: '2023-10-25', items: ['Latte', 'Muffin'], total: 9.00 },
    { id: '3', date: '2023-10-24', items: ['Espresso'], total: 4.00 },
    { id: '4', date: '2023-10-23', items: ['Mocha', 'Sandwich'], total: 12.00 },
  ];

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <Text style={styles.orderDate}>{item.date}</Text>
        <Text style={styles.orderTotal}>{item.total.toFixed(2)} DT</Text>
      </View>
      <View style={styles.orderDetails}>
        {item.items.map((food, index) => (
          <Text key={index} style={styles.orderItemText}>- {food}</Text>
        ))}
      </View>
      <TouchableOpacity style={styles.reorderButton}>
        <Text style={styles.reorderButtonText}>Commander à nouveau</Text>
        <Ionicons name="refresh-outline" size={18} color="#FFF" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#3A2A23" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Historique des Commandes</Text>
      </View>

      {orderHistory.length > 0 ? (
        <FlatList
          data={orderHistory}
          keyExtractor={(item) => item.id}
          renderItem={renderOrderItem}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="time-outline" size={80} color="#B8A08D" />
          <Text style={styles.emptyMessage}>Aucune commande passée pour le moment.</Text>
          <Text style={styles.emptySubMessage}>Passez votre première commande et retrouvez-la ici !</Text>
        </View>
      )}
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
  listContent: {
    paddingHorizontal: 15,
  },
  orderCard: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    paddingBottom: 10,
  },
  orderDate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3A2A23',
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8B6F47',
  },
  orderDetails: {
    marginBottom: 10,
  },
  orderItemText: {
    fontSize: 14,
    color: '#5A3E2B',
    marginBottom: 3,
  },
  reorderButton: {
    backgroundColor: '#8B6F47',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  reorderButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyMessage: {
    fontSize: 18,
    color: '#5A3E2B',
    marginTop: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  emptySubMessage: {
    fontSize: 14,
    color: '#8B6F47',
    marginTop: 10,
    textAlign: 'center',
  },
});