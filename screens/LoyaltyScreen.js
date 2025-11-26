import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';

export default function LoyaltyScreen({ navigation }) {
  const route = useRoute();
  const user = route?.params?.user || {};

  const [clientInfo] = useState({
    name: user.username || 'John Doe',
    points: user.points || 150,
    totalOrders: 8,
    totalSpent: 125.5,
  });

  const [pointsHistory] = useState([
    { id: 1, date: '2024-03-15', description: 'Commande #001 - Cappuccino & Burger', points: 50, type: 'earned', orderTotal: 13.5 },
    { id: 2, date: '2024-03-10', description: 'Commande #002 - Latte & Cookie', points: 30, type: 'earned', orderTotal: 8.5 },
    { id: 3, date: '2024-03-05', description: 'Bonus de bienvenue', points: 50, type: 'earned', orderTotal: 0 },
    { id: 4, date: '2024-02-28', description: 'Café offert', points: -25, type: 'redeemed', orderTotal: 0 },
  ]);

  const membershipLevels = [
    { level: 'Bronze', min: 0, perks: 'Accès aux offres hebdomadaires' },
    { level: 'Silver', min: 100, perks: '5% de réduction sur toutes les commandes' },
    { level: 'Gold', min: 250, perks: '10% + surprises mensuelles' },
    { level: 'Platinum', min: 500, perks: '15% + invitations privées' },
  ];

  const getMembershipLevel = (points) => {
    if (points >= 500) return { level: 'Platinum', color: '#E5E4E2', discount: 15 };
    if (points >= 250) return { level: 'Gold', color: '#FFD700', discount: 10 };
    if (points >= 100) return { level: 'Silver', color: '#C0C0C0', discount: 5 };
    return { level: 'Bronze', color: '#CD7F32', discount: 0 };
  };

  const renderPointsHistory = ({ item }) => (
    <View style={styles.pointsHistoryItem}>
      <View>
        <Text style={styles.pointsDescription}>{item.description}</Text>
        <Text style={styles.pointsDate}>{item.date}</Text>
        {item.orderTotal > 0 && <Text style={styles.orderTotal}>Commande: {item.orderTotal} DT</Text>}
      </View>
      <View style={[styles.pointsAmount, item.type === 'earned' ? styles.pointsEarned : styles.pointsRedeemed]}>
        <Text style={styles.pointsAmountText}>{item.points > 0 ? `+${item.points}` : item.points}</Text>
        <Text style={styles.pointsLabel}>points</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={styles.hero}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#3A2A23" />
        </TouchableOpacity>
        <Text style={styles.heroTitle}>Programme de fidélité</Text>
        <Text style={styles.heroSubtitle}>Cumulez des points et profitez de récompenses exclusives</Text>
      </View>

      <View style={styles.loyaltyCard}>
        <View style={styles.loyaltyHeader}>
          <View>
            <Text style={styles.cardTitle}>Statut actuel</Text>
            <Text style={styles.memberName}>{clientInfo.name}</Text>
          </View>
          <View style={[styles.membershipBadge, { backgroundColor: getMembershipLevel(clientInfo.points).color }]}>
            <Text style={styles.membershipText}>{getMembershipLevel(clientInfo.points).level}</Text>
          </View>
        </View>

        <View style={styles.pointsSummary}>
          <View>
            <Text style={styles.summaryLabel}>Points cumulés</Text>
            <Text style={styles.summaryValue}>{clientInfo.points}</Text>
          </View>
          <View>
            <Text style={styles.summaryLabel}>Réductions</Text>
            <Text style={styles.summaryValue}>{getMembershipLevel(clientInfo.points).discount}%</Text>
          </View>
          <View>
            <Text style={styles.summaryLabel}>Commandes</Text>
            <Text style={styles.summaryValue}>{clientInfo.totalOrders}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.ctaButton}>
          <Ionicons name="gift" size={18} color="#FFF" />
          <Text style={styles.ctaText}>Échanger mes points</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Comment gagner des points ?</Text>
        <View style={styles.loyaltyInfo}>
          <View style={styles.loyaltyInfoItem}>
            <Ionicons name="cart" size={20} color="#8B6F47" />
            <Text style={styles.loyaltyInfoText}>1 point pour chaque 0.16 DT dépensé</Text>
          </View>
          <View style={styles.loyaltyInfoItem}>
            <Ionicons name="calendar" size={20} color="#8B6F47" />
            <Text style={styles.loyaltyInfoText}>Bonus anniversaire: +25 points</Text>
          </View>
          <View style={styles.loyaltyInfoItem}>
            <Ionicons name="people" size={20} color="#8B6F47" />
            <Text style={styles.loyaltyInfoText}>Parrainez un ami: +100 points</Text>
          </View>
          <View style={styles.loyaltyInfoItem}>
            <Ionicons name="star" size={20} color="#FFD700" />
            <Text style={styles.loyaltyInfoText}>Défis hebdomadaires et mini jeux</Text>
          </View>
        </View>
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Niveaux & avantages</Text>
        {membershipLevels.map((level) => (
          <View key={level.level} style={styles.levelRow}>
            <View style={styles.levelIcon}>
              <Ionicons name="ribbon" size={18} color="#8B6F47" />
            </View>
            <View style={styles.levelInfo}>
              <Text style={styles.levelTitle}>{level.level}</Text>
              <Text style={styles.levelSubtitle}>{level.perks}</Text>
            </View>
            <Text style={styles.levelPoints}>{level.min}+ pts</Text>
          </View>
        ))}
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Historique des points</Text>
        {pointsHistory.length === 0 ? (
          <View style={styles.emptyHistory}>
            <Ionicons name="time-outline" size={48} color="#D3D3D3" />
            <Text style={styles.emptyHistoryText}>Aucune activité pour le moment</Text>
          </View>
        ) : (
          <FlatList
            data={pointsHistory}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderPointsHistory}
            scrollEnabled={false}
          />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F5F0',
  },
  hero: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 15,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#3A2A23',
    marginBottom: 6,
  },
  heroSubtitle: {
    fontSize: 14,
    color: '#6B4F33',
    lineHeight: 20,
  },
  loyaltyCard: {
    backgroundColor: '#FFF',
    marginHorizontal: 15,
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  loyaltyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#3A2A23',
  },
  memberName: {
    color: '#8B6F47',
    fontWeight: '600',
  },
  membershipBadge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 18,
  },
  membershipText: {
    color: '#FFF',
    fontWeight: '700',
  },
  pointsSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F9F3EB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#6B4F33',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3A2A23',
  },
  ctaButton: {
    backgroundColor: '#8B6F47',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  ctaText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 15,
  },
  sectionCard: {
    backgroundColor: '#FFF',
    marginHorizontal: 15,
    borderRadius: 18,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#3A2A23',
    marginBottom: 16,
  },
  loyaltyInfo: {
    gap: 12,
  },
  loyaltyInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  loyaltyInfoText: {
    flex: 1,
    fontSize: 15,
    color: '#6B4F33',
    lineHeight: 20,
  },
  levelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3E7DD',
  },
  levelIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F9F3EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  levelInfo: {
    flex: 1,
  },
  levelTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3A2A23',
  },
  levelSubtitle: {
    fontSize: 13,
    color: '#8B6F47',
  },
  levelPoints: {
    fontSize: 13,
    color: '#6B4F33',
    fontWeight: '600',
  },
  pointsHistoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1E8DF',
  },
  pointsDescription: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3A2A23',
  },
  pointsDate: {
    fontSize: 12,
    color: '#A1887F',
  },
  orderTotal: {
    fontSize: 12,
    color: '#8B6F47',
    marginTop: 2,
  },
  pointsAmount: {
    alignItems: 'center',
    minWidth: 80,
    paddingVertical: 6,
    borderRadius: 10,
  },
  pointsEarned: {
    backgroundColor: '#E7F6EA',
  },
  pointsRedeemed: {
    backgroundColor: '#FFECEC',
  },
  pointsAmountText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#3A2A23',
  },
  pointsLabel: {
    fontSize: 12,
    color: '#6B4F33',
  },
  emptyHistory: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  emptyHistoryText: {
    marginTop: 10,
    color: '#8B6F47',
    fontWeight: '600',
  },
});

