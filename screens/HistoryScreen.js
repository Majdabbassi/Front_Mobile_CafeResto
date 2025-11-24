import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HistoryScreen({ navigation }) {
  const orderHistory = [
    { id: '1', date: '2023-10-26', items: ['Cappuccino', 'Croissant'], total: 8.50, status: 'Livré' },
    { id: '2', date: '2023-10-25', items: ['Latte', 'Muffin'], total: 9.00, status: 'Livré' },
    { id: '3', date: '2023-10-24', items: ['Espresso'], total: 4.00, status: 'Livré' },
    { id: '4', date: '2023-10-23', items: ['Mocha', 'Sandwich'], total: 12.00, status: 'Livré' },
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('fr-FR', options);
  };

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderCard}>
      <View style={styles.orderHeaderContainer}>
        <View style={styles.dateContainer}>
          <View style={styles.dateIcon}>
            <Ionicons name="calendar" size={16} color="#8B6F47" />
          </View>
          <View>
            <Text style={styles.orderDate}>{formatDate(item.date)}</Text>
            <Text style={styles.orderStatus}>
              <Ionicons name="checkmark-circle" size={12} color="#4CAF50" /> {item.status}
            </Text>
          </View>
        </View>
        <View style={styles.totalBadge}>
          <Text style={styles.orderTotal}>{item.total.toFixed(2)} DT</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.orderDetails}>
        <Text style={styles.itemsLabel}>Articles commandés :</Text>
        {item.items.map((food, index) => (
          <View key={index} style={styles.itemRow}>
            <View style={styles.itemBullet} />
            <Text style={styles.orderItemText}>{food}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.reorderButton}>
        <Ionicons name="refresh-outline" size={20} color="#FFF" />
        <Text style={styles.reorderButtonText}>Commander à nouveau</Text>
        <Ionicons name="arrow-forward" size={16} color="#FFF" />
      </TouchableOpacity>
    </View>
  );

  const totalOrders = orderHistory.length;
  const totalSpent = orderHistory.reduce((sum, order) => sum + order.total, 0);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <View style={styles.backButtonInner}>
            <Ionicons name="arrow-back" size={24} color="#3A2A23" />
          </View>
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Historique</Text>
          {orderHistory.length > 0 && (
            <View style={styles.countBadge}>
              <Text style={styles.countText}>{totalOrders}</Text>
            </View>
          )}
        </View>
      </View>

      {orderHistory.length > 0 && (
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <Ionicons name="receipt-outline" size={24} color="#8B6F47" />
            </View>
            <View>
              <Text style={styles.statValue}>{totalOrders}</Text>
              <Text style={styles.statLabel}>Commandes</Text>
            </View>
          </View>
          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <Ionicons name="wallet-outline" size={24} color="#8B6F47" />
            </View>
            <View>
              <Text style={styles.statValue}>{totalSpent.toFixed(2)} DT</Text>
              <Text style={styles.statLabel}>Total dépensé</Text>
            </View>
          </View>
        </View>
      )}

      {orderHistory.length > 0 ? (
        <FlatList
          data={orderHistory}
          keyExtractor={(item) => item.id}
          renderItem={renderOrderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconContainer}>
            <Ionicons name="time-outline" size={80} color="#D4C4B0" />
            <View style={styles.emptyIconBg} />
          </View>
          <Text style={styles.emptyMessage}>Aucune commande pour le moment</Text>
          <Text style={styles.emptySubMessage}>
            Découvrez nos délicieux cafés et passez votre première commande !
          </Text>
          <TouchableOpacity 
            style={styles.exploreButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="cafe" size={20} color="#FFF" />
            <Text style={styles.exploreButtonText}>Découvrir le menu</Text>
          </TouchableOpacity>
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
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#F9F5F0',
  },
  backButton: {
    marginRight: 15,
  },
  backButtonInner: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#3A2A23',
    letterSpacing: -0.5,
  },
  countBadge: {
    backgroundColor: '#8B6F47',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginLeft: 12,
  },
  countText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#3A2A23',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    gap: 12,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F9F5F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#3A2A23',
    letterSpacing: -0.3,
  },
  statLabel: {
    fontSize: 12,
    color: '#8B6F47',
    marginTop: 2,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#3A2A23',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F0EBE3',
  },
  orderHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  dateIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F9F5F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderDate: {
    fontSize: 15,
    fontWeight: '700',
    color: '#3A2A23',
    letterSpacing: -0.2,
  },
  orderStatus: {
    fontSize: 12,
    color: '#4CAF50',
    marginTop: 4,
    fontWeight: '600',
  },
  totalBadge: {
    backgroundColor: '#8B6F47',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
    letterSpacing: -0.3,
  },
  divider: {
    height: 1,
    backgroundColor: '#F0EBE3',
    marginBottom: 16,
  },
  orderDetails: {
    marginBottom: 16,
  },
  itemsLabel: {
    fontSize: 13,
    color: '#8B6F47',
    fontWeight: '600',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 10,
  },
  itemBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#8B6F47',
  },
  orderItemText: {
    fontSize: 15,
    color: '#3A2A23',
    fontWeight: '500',
  },
  reorderButton: {
    backgroundColor: '#8B6F47',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    shadowColor: '#8B6F47',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    gap: 8,
  },
  reorderButtonText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  emptyIconContainer: {
    position: 'relative',
    marginBottom: 25,
  },
  emptyIconBg: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#FFF',
    opacity: 0.6,
    top: -30,
    left: -30,
    zIndex: -1,
  },
  emptyMessage: {
    fontSize: 22,
    color: '#3A2A23',
    marginTop: 10,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: -0.3,
  },
  emptySubMessage: {
    fontSize: 15,
    color: '#8B6F47',
    marginTop: 12,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  exploreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8B6F47',
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 25,
    marginTop: 30,
    shadowColor: '#8B6F47',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    gap: 10,
  },
  exploreButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});