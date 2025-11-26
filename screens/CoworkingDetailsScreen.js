import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function CoworkingDetailsScreen({ route, navigation }) {
  const { cafe } = route.params || {
    cafe: {
      name: 'Tech Hub Café',
      address: '12 Rue Innovation',
      rating: 4.8,
      reviews: 198,
      distance: '0.9 km',
      priceRange: '€€',
      image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&q=80&w=2000',
      coworking: {
        powerOutlets: 'Nombreuses (à chaque table)',
        wifiQuality: 'Excellent (100 Mbps)',
        quietZone: true,
        availableSeats: '25',
        openingHours: '07:00 - 22:00',
        pricePerHour: '3€',
        pricePerDay: '15€',
      }
    }
  };

  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState('hour');
  const [isFavorite, setIsFavorite] = useState(false);

  const features = [
    { id: 1, icon: 'flash', label: 'Prises électriques', value: cafe.coworking?.powerOutlets || 'Disponibles', color: '#FFB800' },
    { id: 2, icon: 'wifi', label: 'WiFi', value: cafe.coworking?.wifiQuality || 'Haut débit', color: '#4CAF50' },
    { id: 3, icon: 'volume-mute', label: 'Zone calme', value: cafe.coworking?.quietZone ? 'Oui' : 'Non', color: '#6B4F33' },
    { id: 4, icon: 'people', label: 'Places', value: cafe.coworking?.availableSeats || '20', color: '#FF6B6B' },
    { id: 5, icon: 'time', label: 'Horaires', value: cafe.coworking?.openingHours || '08:00 - 20:00', color: '#3A2A23' },
    { id: 6, icon: 'cafe', label: 'Café inclus', value: 'Illimité', color: '#8B6F47' },
  ];

  const amenities = [
    { icon: 'print', label: 'Imprimante', available: true },
    { icon: 'desktop', label: 'Écrans externes', available: true },
    { icon: 'headset', label: 'Salle de réunion', available: true },
    { icon: 'call', label: 'Cabines tél.', available: true },
    { icon: 'restaurant', label: 'Snacks', available: true },
    { icon: 'lock-closed', label: 'Casiers', available: true },
    { icon: 'snow', label: 'Climatisation', available: true },
    { icon: 'car', label: 'Parking', available: false },
  ];

  const pricingOptions = [
    { id: 'hour', label: 'À l\'heure', price: cafe.coworking?.pricePerHour || '3€', duration: '/h', popular: false },
    { id: 'halfday', label: 'Demi-journée', price: '10€', duration: '(4h)', popular: false },
    { id: 'day', label: 'Journée', price: cafe.coworking?.pricePerDay || '15€', duration: '(8h)', popular: true },
    { id: 'week', label: 'Semaine', price: '60€', duration: '(5 jours)', popular: false },
    { id: 'month', label: 'Mensuel', price: '200€', duration: '/mois', popular: false },
  ];

  const reviews = [
    { id: 1, name: 'Marie L.', rating: 5, comment: 'Parfait pour travailler ! WiFi rapide et ambiance calme.', date: 'Il y a 2 jours' },
    { id: 2, name: 'Thomas B.', rating: 5, comment: 'Excellent espace de coworking, café délicieux en plus !', date: 'Il y a 5 jours' },
    { id: 3, name: 'Sophie M.', rating: 4, comment: 'Très bien équipé, juste un peu bruyant en après-midi.', date: 'Il y a 1 semaine' },
  ];

  const gallery = [
    'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&q=80&w=2000',
    'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=2000',
    'https://images.unsplash.com/photo-1559496417-e7f25cb247f6?auto=format&fit=crop&q=80&w=2000',
    'https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&q=80&w=2000',
  ];

  return (
    <View style={styles.container}>
      {/* Header avec image */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: cafe.image }} style={styles.mainImage} />
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.favoriteButton}
            onPress={() => setIsFavorite(!isFavorite)}
          >
            <Ionicons 
              name={isFavorite ? "heart" : "heart-outline"} 
              size={24} 
              color={isFavorite ? "#FF6B6B" : "#FFF"} 
            />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {/* Info principale */}
          <View style={styles.mainInfo}>
            <View style={styles.titleRow}>
              <Text style={styles.cafeName}>{cafe.name}</Text>
              <View style={styles.ratingBadge}>
                <Ionicons name="star" size={16} color="#FFB800" />
                <Text style={styles.ratingText}>{cafe.rating}</Text>
              </View>
            </View>
            <View style={styles.locationRow}>
              <Ionicons name="location" size={16} color="#6B4F33" />
              <Text style={styles.address}>{cafe.address}</Text>
              <Text style={styles.distance}>• {cafe.distance}</Text>
            </View>
          </View>

          {/* Caractéristiques principales */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Caractéristiques</Text>
            <View style={styles.featuresGrid}>
              {features.map(feature => (
                <View key={feature.id} style={styles.featureCard}>
                  <View style={[styles.featureIcon, { backgroundColor: feature.color + '20' }]}>
                    <Ionicons name={feature.icon} size={24} color={feature.color} />
                  </View>
                  <Text style={styles.featureLabel}>{feature.label}</Text>
                  <Text style={styles.featureValue}>{feature.value}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Équipements */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Équipements disponibles</Text>
            <View style={styles.amenitiesGrid}>
              {amenities.map((amenity, index) => (
                <View key={index} style={styles.amenityItem}>
                  <View style={[
                    styles.amenityIcon,
                    { backgroundColor: amenity.available ? '#E8F5E9' : '#FFEBEE' }
                  ]}>
                    <Ionicons 
                      name={amenity.icon} 
                      size={20} 
                      color={amenity.available ? '#4CAF50' : '#FF6B6B'} 
                    />
                  </View>
                  <Text style={styles.amenityLabel}>{amenity.label}</Text>
                  {!amenity.available && (
                    <View style={styles.unavailableBadge}>
                      <Text style={styles.unavailableText}>N/A</Text>
                    </View>
                  )}
                </View>
              ))}
            </View>
          </View>

          {/* Tarifs */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tarifs</Text>
            <View style={styles.pricingContainer}>
              {pricingOptions.map(option => (
                <TouchableOpacity
                  key={option.id}
                  style={[
                    styles.pricingCard,
                    selectedDuration === option.id && styles.pricingCardSelected
                  ]}
                  onPress={() => setSelectedDuration(option.id)}
                >
                  {option.popular && (
                    <View style={styles.popularBadge}>
                      <Text style={styles.popularText}>POPULAIRE</Text>
                    </View>
                  )}
                  <Text style={styles.pricingLabel}>{option.label}</Text>
                  <Text style={styles.pricingPrice}>{option.price}</Text>
                  <Text style={styles.pricingDuration}>{option.duration}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Galerie photos */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Galerie photos</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.gallery}
            >
              {gallery.map((image, index) => (
                <Image key={index} source={{ uri: image }} style={styles.galleryImage} />
              ))}
            </ScrollView>
          </View>

          {/* Avis */}
          <View style={styles.section}>
            <View style={styles.reviewsHeader}>
              <Text style={styles.sectionTitle}>Avis clients</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>Voir tout ({cafe.reviews})</Text>
              </TouchableOpacity>
            </View>
            {reviews.map(review => (
              <View key={review.id} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <View style={styles.reviewAvatar}>
                    <Text style={styles.reviewAvatarText}>{review.name[0]}</Text>
                  </View>
                  <View style={styles.reviewInfo}>
                    <Text style={styles.reviewName}>{review.name}</Text>
                    <View style={styles.reviewRating}>
                      {[...Array(5)].map((_, i) => (
                        <Ionicons 
                          key={i} 
                          name={i < review.rating ? "star" : "star-outline"} 
                          size={14} 
                          color="#FFB800" 
                        />
                      ))}
                      <Text style={styles.reviewDate}> • {review.date}</Text>
                    </View>
                  </View>
                </View>
                <Text style={styles.reviewComment}>{review.comment}</Text>
              </View>
            ))}
          </View>

          {/* Informations pratiques */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Informations pratiques</Text>
            <View style={styles.practicalInfo}>
              <View style={styles.infoRow}>
                <Ionicons name="time" size={20} color="#6B4F33" />
                <Text style={styles.infoLabel}>Horaires d'ouverture</Text>
              </View>
              <Text style={styles.infoValue}>{cafe.coworking?.openingHours || '08:00 - 20:00'}</Text>
              <Text style={styles.infoSubtext}>Tous les jours</Text>
            </View>
            <View style={styles.practicalInfo}>
              <View style={styles.infoRow}>
                <Ionicons name="card" size={20} color="#6B4F33" />
                <Text style={styles.infoLabel}>Moyens de paiement</Text>
              </View>
              <Text style={styles.infoValue}>Espèces, Carte bancaire, Mobile</Text>
            </View>
            <View style={styles.practicalInfo}>
              <View style={styles.infoRow}>
                <Ionicons name="shield-checkmark" size={20} color="#6B4F33" />
                <Text style={styles.infoLabel}>Règlement</Text>
              </View>
              <Text style={styles.infoValue}>Silence demandé • Pas d'appels visio</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Footer avec actions */}
      <View style={styles.footer}>
        <View style={styles.priceInfo}>
          <Text style={styles.footerPrice}>
            {pricingOptions.find(p => p.id === selectedDuration)?.price}
          </Text>
          <Text style={styles.footerDuration}>
            {pricingOptions.find(p => p.id === selectedDuration)?.duration}
          </Text>
        </View>
        <TouchableOpacity 
          style={styles.bookButton}
          onPress={() => setShowBookingModal(true)}
        >
          <Ionicons name="calendar" size={20} color="#FFF" />
          <Text style={styles.bookButtonText}>Réserver</Text>
        </TouchableOpacity>
      </View>

      {/* Modal de réservation */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showBookingModal}
        onRequestClose={() => setShowBookingModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Confirmer la réservation</Text>
              <TouchableOpacity onPress={() => setShowBookingModal(false)}>
                <Ionicons name="close" size={28} color="#3A2A23" />
              </TouchableOpacity>
            </View>
            <View style={styles.modalBody}>
              <View style={styles.bookingSummary}>
                <Text style={styles.summaryLabel}>Café</Text>
                <Text style={styles.summaryValue}>{cafe.name}</Text>
              </View>
              <View style={styles.bookingSummary}>
                <Text style={styles.summaryLabel}>Formule</Text>
                <Text style={styles.summaryValue}>
                  {pricingOptions.find(p => p.id === selectedDuration)?.label}
                </Text>
              </View>
              <View style={styles.bookingSummary}>
                <Text style={styles.summaryLabel}>Prix</Text>
                <Text style={styles.summaryPrice}>
                  {pricingOptions.find(p => p.id === selectedDuration)?.price}
                </Text>
              </View>
              <View style={styles.benefitsContainer}>
                <Text style={styles.benefitsTitle}>Inclus :</Text>
                <View style={styles.benefitItem}>
                  <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                  <Text style={styles.benefitText}>Café/Thé illimité</Text>
                </View>
                <View style={styles.benefitItem}>
                  <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                  <Text style={styles.benefitText}>WiFi haut débit</Text>
                </View>
                <View style={styles.benefitItem}>
                  <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                  <Text style={styles.benefitText}>Accès aux équipements</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity 
              style={styles.confirmButton}
              onPress={() => {
                setShowBookingModal(false);
                // Navigation ou logique de réservation
              }}
            >
              <Text style={styles.confirmButtonText}>Confirmer la réservation</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF5EF',
  },
  imageContainer: {
    position: 'relative',
  },
  mainImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 15,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButton: {
    position: 'absolute',
    top: 50,
    right: 15,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 20,
  },
  mainInfo: {
    marginBottom: 25,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cafeName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#3A2A23',
    flex: 1,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9E6',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3A2A23',
    marginLeft: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  address: {
    fontSize: 14,
    color: '#6B4F33',
    marginLeft: 5,
  },
  distance: {
    fontSize: 14,
    color: '#A89584',
    marginLeft: 5,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3A2A23',
    marginBottom: 15,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  featureCard: {
    width: (width - 52) / 3,
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureLabel: {
    fontSize: 12,
    color: '#6B4F33',
    textAlign: 'center',
    marginBottom: 4,
  },
  featureValue: {
    fontSize: 11,
    color: '#A89584',
    textAlign: 'center',
    fontWeight: '600',
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  amenityItem: {
    width: (width - 50) / 2,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  amenityIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  amenityLabel: {
    fontSize: 13,
    color: '#3A2A23',
    fontWeight: '500',
    flex: 1,
  },
  unavailableBadge: {
    backgroundColor: '#FFEBEE',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  unavailableText: {
    fontSize: 10,
    color: '#FF6B6B',
    fontWeight: 'bold',
  },
  pricingContainer: {
    gap: 12,
  },
  pricingCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: '#F5E6D3',
    position: 'relative',
  },
  pricingCardSelected: {
    borderColor: '#6B4F33',
    backgroundColor: '#FFF9F5',
  },
  popularBadge: {
    position: 'absolute',
    top: -8,
    right: 15,
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  popularText: {
    fontSize: 10,
    color: '#FFF',
    fontWeight: 'bold',
  },
  pricingLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3A2A23',
    marginBottom: 4,
  },
  pricingPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6B4F33',
  },
  pricingDuration: {
    fontSize: 14,
    color: '#A89584',
  },
  gallery: {
    gap: 12,
  },
  galleryImage: {
    width: 200,
    height: 150,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  seeAllText: {
    fontSize: 14,
    color: '#6B4F33',
    fontWeight: '600',
  },
  reviewCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  reviewHeader: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  reviewAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#6B4F33',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  reviewAvatarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  reviewInfo: {
    flex: 1,
  },
  reviewName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#3A2A23',
    marginBottom: 4,
  },
  reviewRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewDate: {
    fontSize: 12,
    color: '#A89584',
  },
  reviewComment: {
    fontSize: 14,
    color: '#6B4F33',
    lineHeight: 20,
  },
  practicalInfo: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#3A2A23',
    marginLeft: 10,
  },
  infoValue: {
    fontSize: 14,
    color: '#6B4F33',
    marginBottom: 4,
  },
  infoSubtext: {
    fontSize: 12,
    color: '#A89584',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  priceInfo: {
    flex: 1,
  },
  footerPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3A2A23',
  },
  footerDuration: {
    fontSize: 14,
    color: '#6B4F33',
  },
  bookButton: {
    flexDirection: 'row',
    backgroundColor: '#6B4F33',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  bookButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3A2A23',
  },
  modalBody: {
    padding: 20,
  },
  bookingSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  summaryLabel: {
    fontSize: 15,
    color: '#6B4F33',
  },
  summaryValue: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#3A2A23',
  },
  summaryPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6B4F33',
  },
  benefitsContainer: {
    backgroundColor: '#F5E6D3',
    borderRadius: 12,
    padding: 15,
    marginTop: 20,
  },
  benefitsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3A2A23',
    marginBottom: 12,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  benefitText: {
    fontSize: 14,
    color: '#6B4F33',
    marginLeft: 10,
  },
  confirmButton: {
    backgroundColor: '#6B4F33',
    marginHorizontal: 20,
    marginVertical: 20,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
});