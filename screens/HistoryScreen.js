import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HistoryScreen({ navigation }) {
  const orderHistory = [
    { id: '1', date: '2023-10-26', items: ['Cappuccino', 'Croissant'], total: 8.50, status: 'Livré' },
    { id: '2', date: '2023-10-25', items: ['Latte', 'Muffin'], total: 9.00, status: 'Livré' },
    { id: '3', date: '2023-10-24', items: ['Espresso'], total: 4.00, status: 'Livré' },
    { id: '4', date: '2023-10-23', items: ['Mocha', 'Sandwich'], total: 12.00, status: 'Livré' },
  ];

  const reservationHistory = [
    { id: 'R1', date: '2023-11-02', time: '19:30', guests: 2, place: 'Le Gourmet Café', status: 'Confirmée' },
    { id: 'R2', date: '2023-10-29', time: '13:00', guests: 4, place: 'Espresso House', status: 'Terminée' },
    { id: 'R3', date: '2023-10-24', time: '08:30', guests: 1, place: 'Coffee Corner', status: 'Terminée' },
  ];

  const [selectedFilter, setSelectedFilter] = useState('commandes');
  const [viewMode, setViewMode] = useState('card');

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('fr-FR', options);
  };

  const filters = [
    { id: 'commandes', label: 'Commandes' },
    { id: 'reservations_confirmees', label: 'Réservations confirmées' },
    { id: 'reservations_passees', label: 'Réservations passées' },
  ];

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

  const renderReservationCard = ({ item }) => (
    <View style={styles.orderCard}>
      <View style={styles.orderHeaderContainer}>
        <View style={styles.dateContainer}>
          <View style={[styles.dateIcon, styles.reservationIcon]}>
            <Ionicons name="calendar-outline" size={18} color="#8B6F47" />
          </View>
          <View>
            <Text style={styles.orderDate}>{formatDate(item.date)} • {item.time}</Text>
            <Text style={[styles.orderStatus, item.status === 'Confirmée' ? styles.statusSuccess : styles.statusMuted]}>
              {item.status}
            </Text>
          </View>
        </View>
        <View style={styles.totalBadge}>
          <Text style={styles.orderTotal}>{item.guests} pers.</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.orderDetails}>
        <Text style={styles.itemsLabel}>Lieu réservé :</Text>
        <View style={styles.itemRow}>
          <Ionicons name="location-outline" size={16} color="#8B6F47" />
          <Text style={styles.orderItemText}>{item.place}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.reorderButton}>
        <Ionicons name="create-outline" size={20} color="#FFF" />
        <Text style={styles.reorderButtonText}>
          {item.status === 'Confirmée' ? 'Gérer la réservation' : 'Réserver à nouveau'}
        </Text>
        <Ionicons name="arrow-forward" size={16} color="#FFF" />
      </TouchableOpacity>
    </View>
  );

  const renderListItem = ({ item }) => (
    <View style={styles.listItem}>
      <View style={styles.listItemLeft}>
        <View style={[styles.listItemIcon, item.type === 'commande' ? styles.listOrderIcon : styles.listReservationIcon]}>
          <Ionicons name={item.type === 'commande' ? 'fast-food-outline' : 'calendar-outline'} size={18} color={item.type === 'commande' ? '#8B6F47' : '#3A2A23'} />
        </View>
        <View>
          <Text style={styles.listItemTitle}>{item.type === 'commande' ? `Commande #${item.id}` : item.place}</Text>
          <Text style={styles.listItemSubtitle}>
            {formatDate(item.date)} {item.time ? `• ${item.time}` : ''}
          </Text>
        </View>
      </View>
      <View style={styles.listItemRight}>
        <Text style={styles.listItemAmount}>
          {item.type === 'commande' ? `${item.total.toFixed(2)} DT` : `${item.guests} pers.`}
        </Text>
        <Text style={[styles.listItemStatus, item.status === 'Confirmée' || item.status === 'Livré' ? styles.statusSuccess : styles.statusMuted]}>
          {item.status}
        </Text>
      </View>
    </View>
  );

  const totalOrders = orderHistory.length;
  const totalSpent = orderHistory.reduce((sum, order) => sum + order.total, 0);
  const totalReservations = reservationHistory.length;

  const statCards = [
    {
      id: 'orders',
      icon: 'receipt-outline',
      primary: totalOrders.toString(),
      secondary: 'Commandes',
    },
    {
      id: 'spent',
      icon: 'wallet-outline',
      primary: `${totalSpent.toFixed(2)} DT`,
      secondary: 'Total dépensé',
    },
    {
      id: 'reservations',
      icon: 'person-add-outline',
      primary: totalReservations.toString(),
      secondary: 'Réservations',
    },
  ];

  const filteredHistory = useMemo(() => {
    switch (selectedFilter) {
      case 'reservations_confirmees':
        return reservationHistory
          .filter(r => r.status === 'Confirmée')
          .map(r => ({ ...r, type: 'reservation' }));
      case 'reservations_passees':
        return reservationHistory
          .filter(r => r.status !== 'Confirmée')
          .map(r => ({ ...r, type: 'reservation' }));
      case 'commandes':
      default:
        return orderHistory.map(order => ({ ...order, type: 'commande' }));
    }
  }, [selectedFilter]);

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
          {statCards.map(card => (
            <View key={card.id} style={styles.statCard}>
              <View style={styles.statIcon}>
                <Ionicons name={card.icon} size={24} color="#8B6F47" />
              </View>
              <View style={styles.statTexts}>
                <Text style={styles.statValue}>{card.primary}</Text>
                <Text style={styles.statLabel}>{card.secondary}</Text>
              </View>
            </View>
          ))}
        </View>
      )}

      <View style={styles.filtersWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContainer}
        >
          {filters.map(filter => (
            <TouchableOpacity
              key={filter.id}
              style={[
                styles.filterChip,
                selectedFilter === filter.id && styles.filterChipActive,
              ]}
              onPress={() => setSelectedFilter(filter.id)}
            >
              <Text
                style={[
                  styles.filterChipText,
                  selectedFilter === filter.id && styles.filterChipTextActive,
                ]}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.viewToggle}>
          <TouchableOpacity
            style={[styles.viewToggleButton, viewMode === 'card' && styles.viewToggleButtonActive]}
            onPress={() => setViewMode('card')}
          >
            <Ionicons name="grid-outline" size={18} color={viewMode === 'card' ? '#FFF' : '#8B6F47'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.viewToggleButton, viewMode === 'list' && styles.viewToggleButtonActive]}
            onPress={() => setViewMode('list')}
          >
            <Ionicons name="list-outline" size={18} color={viewMode === 'list' ? '#FFF' : '#8B6F47'} />
          </TouchableOpacity>
        </View>
      </View>

      {filteredHistory.length > 0 ? (
        <FlatList
          data={filteredHistory}
          keyExtractor={(item) => item.id}
          renderItem={viewMode === 'card'
            ? (selectedFilter === 'commandes' ? renderOrderItem : renderReservationCard)
            : renderListItem}
          contentContainerStyle={viewMode === 'card' ? styles.listContent : styles.listContentCompact}
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
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  statCard: {
    flexBasis: '48%',
    flexGrow: 1,
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
  statTexts: {
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#3A2A23',
    letterSpacing: -0.3,
  },
  statLabel: {
    fontSize: 12,
    color: '#8B6F47',
    marginTop: 2,
  },
  filtersWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  filtersContainer: {
    gap: 10,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E2D8CF',
  },
  filterChipActive: {
    backgroundColor: '#8B6F47',
    borderColor: '#8B6F47',
  },
  filterChipText: {
    color: '#8B6F47',
    fontWeight: '600',
  },
  filterChipTextActive: {
    color: '#FFF',
  },
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2D8CF',
    overflow: 'hidden',
  },
  viewToggleButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  viewToggleButtonActive: {
    backgroundColor: '#8B6F47',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  listContentCompact: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 10,
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
  reservationIcon: {
    backgroundColor: '#FFF7F1',
  },
  statusSuccess: {
    color: '#4CAF50',
  },
  statusMuted: {
    color: '#B08A6C',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#EFE6DC',
  },
  listItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  listItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listOrderIcon: {
    backgroundColor: '#F5ECE3',
  },
  listReservationIcon: {
    backgroundColor: '#FFF6EE',
  },
  listItemTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#3A2A23',
  },
  listItemSubtitle: {
    fontSize: 12,
    color: '#8B6F47',
  },
  listItemRight: {
    alignItems: 'flex-end',
  },
  listItemAmount: {
    fontSize: 15,
    fontWeight: '700',
    color: '#3A2A23',
  },
  listItemStatus: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: '600',
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