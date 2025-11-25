import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const initialOrders = [
  {
    id: 'CMD-1024',
    table: 'Table 3',
    area: 'Salle principale',
    items: ['Cappuccino', 'Pain au chocolat'],
    status: 'À préparer',
    time: '16:42',
  },
  {
    id: 'CMD-1025',
    table: 'Bar',
    area: 'Comptoir',
    items: ['Latte', 'Cheesecake'],
    status: 'En cours',
    time: '16:40',
  },
  {
    id: 'CMD-1026',
    table: 'Table 7',
    area: 'Terrasse',
    items: ['Thé vert', 'Cookie'],
    status: 'Servi',
    time: '16:35',
  },
];

const initialReservations = [
  {
    id: 'RES-210',
    name: 'Leila B.',
    guests: 2,
    area: 'Terrasse couverte',
    time: '17:00',
    status: 'Arrivée',
  },
  {
    id: 'RES-211',
    name: 'Karim D.',
    guests: 4,
    area: 'Salon privé',
    time: '17:30',
    status: 'En route',
  },
  {
    id: 'RES-212',
    name: 'Mouna R.',
    guests: 1,
    area: 'Bar',
    time: '18:00',
    status: 'Confirmée',
  },
];

const statusColors = {
  'À préparer': '#FFB74D',
  'En cours': '#29B6F6',
  'Servi': '#66BB6A',
  'Confirmée': '#8E24AA',
  'En route': '#FFA726',
  'Arrivée': '#43A047',
};

const ServeurScreen = ({ navigation }) => {
  const [selectedFilter, setSelectedFilter] = useState('orders');
  const [orders, setOrders] = useState(initialOrders);
  const [reservations, setReservations] = useState(initialReservations);
  const [lastSync, setLastSync] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setLastSync(new Date());
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const filters = [
    { id: 'orders', label: 'Commandes' },
    { id: 'reservations', label: 'Réservations' },
  ];

  const currentData = useMemo(
    () => (selectedFilter === 'orders' ? orders : reservations),
    [selectedFilter, orders, reservations]
  );

  const advanceOrderStatus = (orderId) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order;
        const nextStatus =
          order.status === 'À préparer'
            ? 'En cours'
            : order.status === 'En cours'
            ? 'Servi'
            : 'Servi';
        return { ...order, status: nextStatus };
      })
    );
  };

  const advanceReservationStatus = (reservationId) => {
    setReservations((prev) =>
      prev.map((reservation) => {
        if (reservation.id !== reservationId) return reservation;
        const nextStatus =
          reservation.status === 'En route'
            ? 'Arrivée'
            : reservation.status === 'Arrivée'
            ? 'Installée'
            : 'Confirmée';
        return { ...reservation, status: nextStatus };
      })
    );
  };

  const renderOrderCard = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.cardTitle}>{item.id}</Text>
          <Text style={styles.cardSubtitle}>
            {item.table} • {item.area}
          </Text>
        </View>
        <View style={[styles.statusPill, { backgroundColor: statusColors[item.status] || '#BDBDBD' }]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      <View style={styles.cardBody}>
        {item.items.map((line, index) => (
          <View key={index} style={styles.itemRow}>
            <Ionicons name="ellipse" size={6} color="#8B6F47" />
            <Text style={styles.itemText}>{line}</Text>
          </View>
        ))}
      </View>
      <View style={styles.cardFooter}>
        <View style={styles.timeBadge}>
          <Ionicons name="time-outline" size={16} color="#8B6F47" />
          <Text style={styles.timeText}>{item.time}</Text>
        </View>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => advanceOrderStatus(item.id)}
        >
          <Ionicons name="checkmark-circle" size={16} color="#FFF" />
          <Text style={styles.primaryButtonText}>Mettre à jour</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderReservationCard = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text style={styles.cardSubtitle}>
            {item.guests} pers. • {item.area}
          </Text>
        </View>
        <View style={[styles.statusPill, { backgroundColor: statusColors[item.status] || '#BDBDBD' }]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      <View style={styles.cardBody}>
        <View style={styles.metaRow}>
          <Ionicons name="calendar-outline" size={16} color="#8B6F47" />
          <Text style={styles.itemText}>{item.time}</Text>
        </View>
      </View>
      <View style={styles.cardFooter}>
        <View style={styles.timeBadge}>
          <Ionicons name="pricetag-outline" size={16} color="#8B6F47" />
          <Text style={styles.timeText}>{item.id}</Text>
        </View>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => advanceReservationStatus(item.id)}
        >
          <Ionicons name="checkmark-done" size={16} color="#FFF" />
          <Text style={styles.primaryButtonText}>Mettre à jour</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#3A2A23" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Espace Serveur</Text>
        <View style={styles.syncBadge}>
          <Ionicons name="refresh-outline" size={16} color="#3A2A23" />
          <Text style={styles.syncText}>
            Maj {lastSync.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </View>
      </View>

      <View style={styles.filters}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            style={[styles.filterChip, selectedFilter === filter.id && styles.filterChipActive]}
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
      </View>

      <FlatList
        data={currentData}
        keyExtractor={(item) => item.id}
        renderItem={selectedFilter === 'orders' ? renderOrderCard : renderReservationCard}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="wifi" size={40} color="#C5A688" />
            <Text style={styles.emptyTitle}>Aucune donnée</Text>
            <Text style={styles.emptySubtitle}>Tout est calme pour le moment dans cette zone.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F2EC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  backButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#3A2A23',
  },
  syncBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  syncText: {
    color: '#3A2A23',
    fontWeight: '600',
  },
  filters: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 10,
    marginBottom: 10,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 18,
    backgroundColor: '#EFE4D8',
  },
  filterChipActive: {
    backgroundColor: '#8B6F47',
  },
  filterChipText: {
    color: '#8B6F47',
    fontWeight: '600',
  },
  filterChipTextActive: {
    color: '#FFF',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    gap: 14,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 18,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F1E6DA',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#3A2A23',
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#8B6F47',
  },
  statusPill: {
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  statusText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 12,
  },
  cardBody: {
    marginBottom: 14,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  itemText: {
    color: '#3A2A23',
    fontSize: 15,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F5EBE0',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  timeText: {
    color: '#8B6F47',
    fontWeight: '600',
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#8B6F47',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
  },
  primaryButtonText: {
    color: '#FFF',
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 40,
    gap: 10,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#3A2A23',
  },
  emptySubtitle: {
    color: '#8B6F47',
    textAlign: 'center',
  },
});

export default ServeurScreen;

