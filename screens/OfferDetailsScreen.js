import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image, ScrollView, Dimensions, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function OfferDetailsScreen({ route, navigation }) {
  const { cafe } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);

  const heroImage =
    cafe.imageUrl ||
    cafe.image ||
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80';

  const handleAddToCart = () => {
    Alert.alert(
      'Ajouté au panier',
      `L'offre "${cafe.offer}" a été ajoutée à votre panier.`
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 32 }}>
      <ImageBackground source={{ uri: heroImage }} style={styles.heroImage}>
        <View style={styles.heroOverlay} />
        <View style={styles.heroTopBar}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.heroButton}>
            <Ionicons name="arrow-back" size={22} color="#3A2A23" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsFavorite(!isFavorite)}
            style={[styles.heroButton, isFavorite && styles.heroButtonActive]}
          >
            <Ionicons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={22}
              color={isFavorite ? '#FFF' : '#3A2A23'}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.heroContent}>
          <Text style={styles.heroSubtitle}>Offre exclusive</Text>
          <Text style={styles.heroTitle}>{cafe.name}</Text>
          <Text style={styles.heroOffer}>{cafe.offer}</Text>
          <View style={styles.heroStats}>
            <View style={styles.heroStatItem}>
              <Ionicons name="navigate" size={16} color="#FFF" />
              <Text style={styles.heroStatText}>{cafe.distance || '0.8 km'}</Text>
            </View>
            <View style={styles.heroStatItem}>
              <Ionicons name="eye" size={16} color="#FFF" />
              <Text style={styles.heroStatText}>{cafe.visits || 120} vues</Text>
            </View>
            <View style={styles.heroStatItem}>
              <Ionicons name="time" size={16} color="#FFF" />
              <Text style={styles.heroStatText}>Disponible aujourd'hui</Text>
            </View>
          </View>
        </View>
      </ImageBackground>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Pourquoi on l'adore</Text>
        <Text style={styles.cardText}>
          Profitez d'une ambiance chaleureuse et d'un service premium. Cette offre spéciale est
          idéale pour une pause gourmande ou un rendez-vous entre amis.
        </Text>
        <View style={styles.badgesRow}>
          <View style={styles.badge}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.badgeText}>Qualité vérifiée</Text>
          </View>
          <View style={styles.badge}>
            <Ionicons name="shield-checkmark" size={16} color="#4CAF50" />
            <Text style={styles.badgeText}>Paiement sécurisé</Text>
          </View>
        </View>
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Détails pratiques</Text>
        <View style={styles.detailRow}>
          <Ionicons name="location-outline" size={18} color="#8B6F47" />
          <Text style={styles.detailText}>À {cafe.distance || 'quelques pas'} de vous</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="cafe-outline" size={18} color="#8B6F47" />
          <Text style={styles.detailText}>Barista signature & viennoiseries fraîches</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="gift-outline" size={18} color="#8B6F47" />
          <Text style={styles.detailText}>Points fidélité bonus sur cette offre</Text>
        </View>
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>À accompagner avec</Text>
        <View style={styles.suggestionRow}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=400&q=80',
            }}
            style={styles.suggestionImage}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.suggestionName}>Croissant au beurre</Text>
            <Text style={styles.suggestionDesc}>Parfait pour équilibrer votre boisson</Text>
          </View>
          <Text style={styles.suggestionPrice}>2.80€</Text>
        </View>
      </View>

      <View style={styles.actionsCard}>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('MenuScreen', { cafeId: cafe.id, cafeName: cafe.name })}
        >
          <Ionicons name="restaurant" size={20} color="#8B6F47" />
          <Text style={styles.secondaryButtonText}>Voir le menu du café</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.primaryButton} onPress={handleAddToCart}>
          <Ionicons name="cart" size={20} color="#FFF" />
          <Text style={styles.primaryButtonText}>Ajouter au panier</Text>
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
  heroImage: {
    width,
    height: width * 0.8,
    justifyContent: 'flex-end',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  heroTopBar: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  heroButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroButtonActive: {
    backgroundColor: '#8B6F47',
  },
  heroContent: {
    padding: 20,
  },
  heroSubtitle: {
    color: '#FCEAD7',
    textTransform: 'uppercase',
    fontSize: 12,
    letterSpacing: 1,
  },
  heroTitle: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: '700',
    marginTop: 6,
  },
  heroOffer: {
    color: '#FFD79A',
    fontSize: 18,
    marginTop: 4,
  },
  heroStats: {
    flexDirection: 'row',
    marginTop: 18,
    gap: 14,
  },
  heroStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  heroStatText: {
    color: '#FFF',
    fontSize: 13,
  },
  card: {
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    borderRadius: 18,
    padding: 20,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#3A2A23',
    marginBottom: 10,
  },
  cardText: {
    color: '#6B4F33',
    lineHeight: 20,
  },
  badgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 16,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#F5EDE3',
    borderRadius: 20,
  },
  badgeText: {
    color: '#8B6F47',
    fontWeight: '600',
    fontSize: 12,
  },
  sectionCard: {
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    borderRadius: 18,
    padding: 20,
    marginTop: 16,
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
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  detailText: {
    color: '#6B4F33',
    fontSize: 14,
    flex: 1,
  },
  suggestionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  suggestionImage: {
    width: 56,
    height: 56,
    borderRadius: 16,
  },
  suggestionName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#3A2A23',
  },
  suggestionDesc: {
    color: '#8B6F47',
    fontSize: 13,
  },
  suggestionPrice: {
    fontWeight: '700',
    color: '#3A2A23',
  },
  actionsCard: {
    marginHorizontal: 16,
    marginTop: 20,
    gap: 12,
  },
  secondaryButton: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: '#E4D5C6',
  },
  secondaryButtonText: {
    color: '#8B6F47',
    fontWeight: '600',
    fontSize: 15,
  },
  primaryButton: {
    backgroundColor: '#8B6F47',
    borderRadius: 14,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  primaryButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});