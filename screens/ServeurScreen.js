import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ScrollView,
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

const initialRequests = [
  {
    id: 'REQ-501',
    waiter: 'Ahmed K.',
    table: 'Table 6',
    area: 'Zone 2',
    type: 'Assistance',
    message: 'Besoin d\'aide pour servir un groupe',
    status: 'En attente',
    time: '16:45',
    priority: 'normale',
  },
  {
    id: 'REQ-502',
    waiter: 'Salma M.',
    table: 'Table 12',
    area: 'Terrasse',
    type: 'Nettoyage',
    message: 'Table à débarrasser rapidement',
    status: 'En attente',
    time: '16:43',
    priority: 'urgente',
  },
  {
    id: 'REQ-503',
    waiter: 'Youssef T.',
    table: 'Bar',
    area: 'Comptoir',
    type: 'Approvisionnement',
    message: 'Manque de serviettes',
    status: 'Traitée',
    time: '16:30',
    priority: 'normale',
  },
];

const statusColors = {
  'À préparer': '#FFB74D',
  'En cours': '#29B6F6',
  'Servi': '#66BB6A',
  'Confirmée': '#8E24AA',
  'En route': '#FFA726',
  'Arrivée': '#43A047',
  'En attente': '#FF7043',
  'Traitée': '#66BB6A',
};

const priorityColors = {
  'urgente': '#EF5350',
  'normale': '#FFB74D',
};

const ServeurScreen = ({ navigation }) => {
  const [selectedFilter, setSelectedFilter] = useState('orders');
  const [orders, setOrders] = useState(initialOrders);
  const [reservations, setReservations] = useState(initialReservations);
  const [requests, setRequests] = useState(initialRequests);
  const [lastSync, setLastSync] = useState(new Date());

  const pendingRequestsCount = useMemo(
    () => requests.filter((req) => req.status === 'En attente').length,
    [requests]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setLastSync(new Date());
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const filters = [
    { id: 'orders', label: 'Commandes' },
    { id: 'reservations', label: 'Réservations' },
    { id: 'requests', label: 'Demandes', badge: pendingRequestsCount },
  ];

  const currentData = useMemo(() => {
    if (selectedFilter === 'orders') return orders;
    if (selectedFilter === 'reservations') return reservations;
    return requests;
  }, [selectedFilter, orders, reservations, requests]);

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

  const handleRequest = (requestId, action) => {
    setRequests((prev) =>
      prev.map((request) => {
        if (request.id !== requestId) return request;
        return { 
          ...request, 
          status: action === 'accept' ? 'Traitée' : 'Refusée' 
        };
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

  const renderRequestCard = ({ item }) => (
    <View style={[styles.card, item.priority === 'urgente' && styles.urgentCard]}>
      {item.priority === 'urgente' && (
        <View style={styles.urgentBanner}>
          <Ionicons name="warning" size={16} color="#FFF" />
          <Text style={styles.urgentBannerText}>URGENT</Text>
        </View>
      )}
      <View style={styles.cardHeader}>
        <View style={{ flex: 1 }}>
          <Text style={styles.cardTitle}>{item.waiter}</Text>
          <Text style={styles.cardSubtitle}>
            {item.table} • {item.area}
          </Text>
        </View>
        <View style={[styles.statusPill, { backgroundColor: statusColors[item.status] || '#BDBDBD' }]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      
      <View style={styles.cardBody}>
        <View style={styles.requestTypeRow}>
          <Ionicons name="help-circle-outline" size={18} color="#8B6F47" />
          <Text style={styles.requestTypeText}>{item.type}</Text>
        </View>
        <Text style={styles.requestMessage}>{item.message}</Text>
      </View>

      <View style={styles.cardFooter}>
        <View style={styles.timeBadge}>
          <Ionicons name="time-outline" size={16} color="#8B6F47" />
          <Text style={styles.timeText}>{item.time}</Text>
        </View>
        {item.status === 'En attente' && (
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => handleRequest(item.id, 'reject')}
            >
              <Ionicons name="close-circle" size={16} color="#8B6F47" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => handleRequest(item.id, 'accept')}
            >
              <Ionicons name="checkmark-circle" size={16} color="#FFF" />
              <Text style={styles.primaryButtonText}>Accepter</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );

  const renderItem = ({ item }) => {
    if (selectedFilter === 'orders') return renderOrderCard({ item });
    if (selectedFilter === 'reservations') return renderReservationCard({ item });
    return renderRequestCard({ item });
  };

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

      {/* Notification Banner */}
      {pendingRequestsCount > 0 && selectedFilter !== 'requests' && (
        <TouchableOpacity 
          style={styles.notificationBanner}
          onPress={() => setSelectedFilter('requests')}
        >
          <View style={styles.notificationContent}>
            <Ionicons name="notifications" size={20} color="#FFF" />
            <Text style={styles.notificationText}>
              {pendingRequestsCount} nouvelle{pendingRequestsCount > 1 ? 's' : ''} demande{pendingRequestsCount > 1 ? 's' : ''} en attente
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#FFF" />
        </TouchableOpacity>
      )}

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersContainer}>
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
              {filter.badge > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{filter.badge}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <FlatList
        data={currentData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
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
    fontSize: 12,
  },
  notificationBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FF7043',
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 5,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  notificationContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  notificationText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 14,
  },
  filtersContainer: {
    maxHeight: 60,
  },
  filters: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 10,
    marginBottom: 10,
    marginTop: 5,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 18,
    backgroundColor: '#EFE4D8',
    gap: 8,
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
  badge: {
    backgroundColor: '#EF5350',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
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
  urgentCard: {
    borderColor: '#EF5350',
    borderWidth: 2,
  },
  urgentBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EF5350',
    marginTop: -16,
    marginHorizontal: -16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    gap: 6,
    marginBottom: 12,
  },
  urgentBannerText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 12,
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
    marginTop: 2,
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
  requestTypeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  requestTypeText: {
    color: '#8B6F47',
    fontWeight: '600',
    fontSize: 14,
  },
  requestMessage: {
    color: '#3A2A23',
    fontSize: 15,
    lineHeight: 22,
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
    fontSize: 13,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
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
  secondaryButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5EBE0',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
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