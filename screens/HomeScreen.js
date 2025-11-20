import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions, ScrollView, TextInput, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const route = useRoute();
  const user = route?.params?.user || {};
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [unseenOffers, setUnseenOffers] = useState(2);
  
  // Animations
  const slideAnim = useRef(new Animated.Value(-width * 0.75)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const cardAnimations = useRef([...Array(8)].map(() => new Animated.Value(0))).current;
  const notificationPulse = useRef(new Animated.Value(1)).current;

  const lastVisited = "Café Latte Caramel";
  const dailyOffers = [
    { id: 1, name: "Café Royal", offer: "-20% sur le Cappuccino", visits: 128, distance: "0.5 km" },
    { id: 2, name: "Espresso House", offer: "1 Espresso acheté = 1 offert", visits: 94, distance: "1.2 km" },
    { id: 3, name: "Café Milano", offer: "-30% sur les boissons glacées", visits: 72, distance: "2.1 km" },
    { id: 4, name: "Coffee Corner", offer: "Pâtisserie offerte", visits: 156, distance: "0.8 km" },
  ];

  const recommendedCafes = [
    { id: 1, name: "Café Mocha", desc: "Un mélange doux et chocolaté", distance: "1.5 km" },
    { id: 2, name: "Espresso Royal", desc: "Un café fort pour bien démarrer", distance: "0.9 km" },
    { id: 3, name: "Cappuccino Nocciola", desc: "Cappuccino noisette crémeux", distance: "2.3 km" },
  ];

  const nearbyCafes = [
    { id: 1, name: "Café du Coin", distance: "0.3 km", rating: 4.5 },
    { id: 2, name: "Le Petit Bistro", distance: "0.7 km", rating: 4.8 },
    { id: 3, name: "Espresso Bar", distance: "1.1 km", rating: 4.2 },
  ];

  // Animation d'entrée des cartes
  useEffect(() => {
    const animations = cardAnimations.map((anim, index) =>
      Animated.timing(anim, {
        toValue: 1,
        duration: 600,
        delay: index * 100,
        useNativeDriver: true,
      })
    );
    Animated.stagger(100, animations).start();

    // Animation pulsation pour notification
    Animated.loop(
      Animated.sequence([
        Animated.timing(notificationPulse, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(notificationPulse, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // Toggle Sidebar
  const toggleSidebar = () => {
    console.log('toggleSidebar called. Current sidebarOpen:', sidebarOpen);
    const toValue = sidebarOpen ? -width * 0.75 : 0;
    const fadeValue = sidebarOpen ? 0 : 1;
    console.log('toValue:', toValue, 'fadeValue:', fadeValue);

    Animated.parallel([
      Animated.spring(slideAnim, {
        toValue,
        useNativeDriver: true,
        tension: 65,
        friction: 11,
      }),
      Animated.timing(fadeAnim, {
        toValue: fadeValue,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      console.log('Animation completed. New sidebarOpen state:', !sidebarOpen);
    });

    setSidebarOpen(!sidebarOpen);
  };

  // Toggle favoris
  const toggleFavorite = (cafeId) => {
    setFavorites(prev => 
      prev.includes(cafeId) 
        ? prev.filter(id => id !== cafeId)
        : [...prev, cafeId]
    );
  };

  // Filtrer les cafés
  const filteredCafes = recommendedCafes.filter(cafe =>
    cafe.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const CardWithAnimation = ({ children, index }) => {
    const scale = cardAnimations[index]?.interpolate({
      inputRange: [0, 1],
      outputRange: [0.8, 1],
    }) || 1;

    const opacity = cardAnimations[index] || 1;

    return (
      <Animated.View
        style={{
          transform: [{ scale }],
          opacity,
        }}
      >
        {children}
      </Animated.View>
    );
  };

  const renderOfferItem = ({ item }) => (
    <View style={styles.carouselCard}>
      <View style={styles.offerBadge}>
        <Text style={styles.offerBadgeText}>HOT</Text>
      </View>
      
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={() => toggleFavorite(item.id)}
      >
        <Ionicons 
          name={favorites.includes(item.id) ? "heart" : "heart-outline"} 
          size={24} 
          color={favorites.includes(item.id) ? "#FF6B6B" : "#8B6F47"} 
        />
      </TouchableOpacity>

      <View style={styles.carouselContent}>
        <Text style={styles.carouselCafeName}>{item.name}</Text>
        <Text style={styles.carouselOffer}>{item.offer}</Text>
        
        <View style={styles.carouselFooter}>
          <View style={styles.distanceContainer}>
            <Ionicons name="location-outline" size={14} color="#8B6F47" />
            <Text style={styles.distanceText}>{item.distance}</Text>
          </View>
          
          <View style={styles.visitsContainer}>
            <Ionicons name="eye-outline" size={14} color="#8B6F47" />
            <Text style={styles.visitsText}>{item.visits} vues</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.carouselButton}
          onPress={() => navigation.navigate("OfferDetails", { cafe: item })}
        >
          <Text style={styles.carouselButtonText}>Profiter maintenant</Text>
          <Ionicons name="arrow-forward" size={16} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Overlay sombre */}
      {sidebarOpen && (
        <Animated.View
          style={[styles.overlay, { opacity: fadeAnim }]}
        >
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            onPress={toggleSidebar}
            activeOpacity={1}
          />
        </Animated.View>
      )}

      {/* SIDEBAR */}
      <Animated.View
        style={[
          styles.sidebar,
          { transform: [{ translateX: slideAnim }] },
        ]}
      >
        <View style={styles.sidebarHeader}>
          <View style={styles.profileCircle}>
            <Ionicons name="person" size={50} color="#FFF" />
          </View>
          <Text style={styles.sidebarName}>{user.username || "Utilisateur"}</Text>
          <Text style={styles.sidebarEmail}>{user.email || "user@email.com"}</Text>
          
          <View style={styles.pointsBadge}>
            <Ionicons name="star" size={20} color="#FFD700" />
            <Text style={styles.pointsBadgeText}>{user.points || 120} points</Text>
          </View>

          {/* Badge offres non vues */}
          {unseenOffers > 0 && (
            <View style={styles.unseenBadge}>
              <Ionicons name="gift" size={16} color="#FFF" />
              <Text style={styles.unseenBadgeText}>
                {unseenOffers} nouvelle{unseenOffers > 1 ? 's' : ''} offre{unseenOffers > 1 ? 's' : ''}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.sidebarMenu}>
          <TouchableOpacity style={styles.menuItem} onPress={() => { toggleSidebar(); navigation.navigate('Profile', { user }); }}>
            <Ionicons name="person-outline" size={24} color="#3A2A23" />
            <Text style={styles.menuText}>Mon Profil</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => { toggleSidebar(); navigation.navigate('Menu'); }}>
            <Ionicons name="restaurant-outline" size={24} color="#3A2A23" />
            <Text style={styles.menuText}>Menu</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="heart-outline" size={24} color="#3A2A23" />
            <Text style={styles.menuText}>Mes Favoris</Text>
            {favorites.length > 0 && (
              <View style={styles.favoritesCountBadge}>
                <Text style={styles.favoritesCountText}>{favorites.length}</Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="gift-outline" size={24} color="#3A2A23" />
            <Text style={styles.menuText}>Mes Récompenses</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="time-outline" size={24} color="#3A2A23" />
            <Text style={styles.menuText}>Historique</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="settings-outline" size={24} color="#3A2A23" />
            <Text style={styles.menuText}>Paramètres</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuItem, styles.logoutItem]}>
            <Ionicons name="log-out-outline" size={24} color="#D32F2F" />
            <Text style={[styles.menuText, { color: '#D32F2F' }]}>Déconnexion</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* CONTENU PRINCIPAL */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* TOP BAR */}
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.menuButton} onPress={toggleSidebar}>
            <Ionicons name="menu" size={28} color="#3A2A23" />
            {favorites.length > 0 && (
              <View style={styles.favoritesIndicator}>
                <Text style={styles.favoritesIndicatorText}>{favorites.length}</Text>
              </View>
            )}
          </TouchableOpacity>

          <View style={styles.topBarRight}>
            <TouchableOpacity style={styles.notificationButton}>
              <Animated.View style={{ transform: [{ scale: unseenOffers > 0 ? notificationPulse : 1 }] }}>
                <Ionicons name="notifications" size={24} color="#3A2A23" />
              </Animated.View>
              {unseenOffers > 0 && (
                <View style={styles.notificationBadge}>
                  <Text style={styles.notificationBadgeText}>{unseenOffers}</Text>
                </View>
              )}
            </TouchableOpacity>

            <View style={styles.pointsContainer}>
              <Ionicons name="star" size={18} color="#FFD700" />
              <Text style={styles.pointsText}>{user.points || 120}</Text>
            </View>
          </View>
        </View>

        {/* TITRE ANIMÉ */}
        <CardWithAnimation index={0}>
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>Bonjour,</Text>
            <Text style={styles.userName}>{user.username || "Utilisateur"} ☕</Text>
          </View>
        </CardWithAnimation>

        {/* BARRE DE RECHERCHE */}
        <CardWithAnimation index={1}>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#8B6F47" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Rechercher un café..."
              placeholderTextColor="#B8A08D"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={20} color="#8B6F47" />
              </TouchableOpacity>
            )}
          </View>
        </CardWithAnimation>

        {/* CAROUSEL OFFRES DU JOUR */}
        <CardWithAnimation index={2}>
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>🎁 Offres du jour</Text>
              <Text style={styles.sectionSubtitle}>Profitez de nos promotions exclusives</Text>
            </View>

            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={dailyOffers}
              renderItem={renderOfferItem}
              keyExtractor={item => item.id.toString()}
              contentContainerStyle={styles.carouselContainer}
              snapToInterval={width * 0.75 + 12}
              decelerationRate="fast"
            />
          </View>
        </CardWithAnimation>

        {/* DERNIER CAFÉ VISITÉ */}
        <CardWithAnimation index={3}>
          <TouchableOpacity style={styles.lastVisitedCard}>
            <View style={styles.iconCircle}>
              <Ionicons name="time" size={24} color="#8B6F47" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.lastVisitedTitle}>Dernier café visité</Text>
              <Text style={styles.lastVisitedName}>{lastVisited}</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#8B6F47" />
          </TouchableOpacity>
        </CardWithAnimation>

        {/* CAFÉS À PROXIMITÉ */}
        <CardWithAnimation index={4}>
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleRow}>
                <Ionicons name="navigate" size={24} color="#8B6F47" />
                <Text style={styles.sectionTitle}>Cafés proches</Text>
              </View>
              <Text style={styles.sectionSubtitle}>Basé sur votre localisation</Text>
            </View>

            <View style={styles.nearbyContainer}>
              {nearbyCafes.map((cafe) => (
                <TouchableOpacity
                  key={cafe.id}
                  style={styles.nearbyCard}
                  activeOpacity={0.8}
                >
                  <View style={styles.nearbyIconCircle}>
                    <Ionicons name="location" size={20} color="#8B6F47" />
                  </View>
                  
                  <View style={styles.nearbyInfo}>
                    <Text style={styles.nearbyCafeName}>{cafe.name}</Text>
                    <View style={styles.nearbyMeta}>
                      <Ionicons name="walk" size={14} color="#8B6F47" />
                      <Text style={styles.nearbyDistance}>{cafe.distance}</Text>
                      <View style={styles.ratingContainer}>
                        <Ionicons name="star" size={14} color="#FFD700" />
                        <Text style={styles.ratingText}>{cafe.rating}</Text>
                      </View>
                    </View>
                  </View>

                  <TouchableOpacity
                    style={styles.nearbyDirectionsButton}
                    onPress={() => console.log('Navigation vers', cafe.name)}
                  >
                    <Ionicons name="navigate-circle" size={32} color="#8B6F47" />
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </CardWithAnimation>

        {/* CAFÉS RECOMMANDÉS */}
        <CardWithAnimation index={5}>
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>☕ Recommandés pour vous</Text>
              <Text style={styles.sectionSubtitle}>
                {searchQuery ? `${filteredCafes.length} résultat(s)` : 'Basé sur vos préférences'}
              </Text>
            </View>

            {filteredCafes.map((cafe) => (
              <TouchableOpacity
                key={cafe.id}
                style={styles.recommendedCard}
                onPress={() => navigation.navigate("CafeDetails", { cafe })}
                activeOpacity={0.8}
              >
                <View style={styles.cafeIconCircle}>
                  <Ionicons name="cafe" size={28} color="#8B6F47" />
                </View>
                
                <View style={styles.cafeInfo}>
                  <Text style={styles.cafeName}>{cafe.name}</Text>
                  <Text style={styles.cafeDescription}>{cafe.desc}</Text>
                  <View style={styles.cafeMetaRow}>
                    <Ionicons name="location-outline" size={14} color="#8B6F47" />
                    <Text style={styles.cafeDistance}>{cafe.distance}</Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.heartButton}
                  onPress={(e) => {
                    e.stopPropagation();
                    toggleFavorite(cafe.id);
                  }}
                >
                  <Ionicons 
                    name={favorites.includes(cafe.id) ? "heart" : "heart-outline"} 
                    size={24} 
                    color={favorites.includes(cafe.id) ? "#FF6B6B" : "#8B6F47"} 
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}

            {filteredCafes.length === 0 && (
              <View style={styles.noResultsContainer}>
                <Ionicons name="search-outline" size={48} color="#B8A08D" />
                <Text style={styles.noResultsText}>Aucun café trouvé</Text>
                <Text style={styles.noResultsSubtext}>Essayez une autre recherche</Text>
              </View>
            )}
          </View>
        </CardWithAnimation>

        {/* BOUTON MENU PRINCIPAL */}
        <CardWithAnimation index={6}>
          <TouchableOpacity
            style={styles.mainButton}
            onPress={() => navigation.navigate('Menu')}
            activeOpacity={0.9}
          >
            <Ionicons name="restaurant" size={24} color="#FFF" />
            <Text style={styles.mainButtonText}>Découvrir le Menu Complet</Text>
            <Ionicons name="arrow-forward" size={24} color="#FFF" />
          </TouchableOpacity>
        </CardWithAnimation>

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF5EF',
  },

  // SIDEBAR
  sidebar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: width * 0.75,
    backgroundColor: '#FFF',
    zIndex: 1000,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  sidebarHeader: {
    backgroundColor: '#8B6F47',
    padding: 30,
    paddingTop: 60,
    alignItems: 'center',
  },
  profileCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 3,
    borderColor: '#FFF',
  },
  sidebarName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 5,
  },
  sidebarEmail: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 15,
  },
  pointsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 5,
  },
  pointsBadgeText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  unseenBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    gap: 5,
    marginTop: 10,
  },
  unseenBadgeText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 12,
  },
  sidebarMenu: {
    flex: 1,
    paddingTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 25,
    gap: 15,
  },
  menuText: {
    fontSize: 16,
    color: '#3A2A23',
    fontWeight: '500',
    flex: 1,
  },
  favoritesCountBadge: {
    backgroundColor: '#FF6B6B',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoritesCountText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  logoutItem: {
    marginTop: 'auto',
    marginBottom: 30,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },

  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 999,
  },

  // TOP BAR
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 10,
  },
  menuButton: {
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  favoritesIndicator: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FF6B6B',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FAF5EF',
  },
  favoritesIndicatorText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  topBarRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  notificationButton: {
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FF6B6B',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FAF5EF',
  },
  notificationBadgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    gap: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pointsText: {
    fontWeight: 'bold',
    color: '#3A2A23',
    fontSize: 16,
  },

  // WELCOME
  welcomeContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  welcomeText: {
    fontSize: 18,
    color: '#6B4F33',
    marginBottom: 5,
  },
  userName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#3A2A23',
  },

  // SEARCH BAR
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    marginBottom: 20,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#3A2A23',
  },

  // SECTIONS
  sectionContainer: {
    marginBottom: 25,
  },
  sectionHeader: {
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3A2A23',
    marginBottom: 5,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#8B6F47',
  },

  // CAROUSEL
  carouselContainer: {
    paddingLeft: 20,
    paddingRight: 8,
  },
  carouselCard: {
    width: width * 0.75,
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
    borderLeftWidth: 5,
    borderLeftColor: '#D98825',
  },
  offerBadge: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  offerBadgeText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  favoriteButton: {
    position: 'absolute',
    top: 15,
    left: 15,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF5E6',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  carouselContent: {
    marginTop: 20,
  },
  carouselCafeName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3A2A23',
    marginBottom: 8,
  },
  carouselOffer: {
    fontSize: 15,
    color: '#6B4F33',
    marginBottom: 12,
    lineHeight: 22,
  },
  carouselFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  distanceText: {
    fontSize: 13,
    color: '#8B6F47',
    fontWeight: '600',
  },
  visitsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  visitsText: {
    fontSize: 13,
    color: '#8B6F47',
  },
  carouselButton: {
    flexDirection: 'row',
    backgroundColor: '#8B6F47',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  carouselButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 15,
  },

  // LAST VISITED
  lastVisitedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    marginBottom: 25,
    padding: 18,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    gap: 15,
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFF5E6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lastVisitedTitle: {
    fontSize: 13,
    color: '#8B6F47',
    marginBottom: 4,
  },
  lastVisitedName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#3A2A23',
  },

  // NEARBY CAFES
  nearbyContainer: {
    paddingHorizontal: 20,
  },
  nearbyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    gap: 12,
  },
  nearbyIconCircle: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: '#FFF5E6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nearbyInfo: {
    flex: 1,
  },
  nearbyCafeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3A2A23',
    marginBottom: 6,
  },
  nearbyMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  nearbyDistance: {
    fontSize: 13,
    color: '#8B6F47',
    marginRight: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#FFF5E6',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#8B6F47',
  },
  nearbyDirectionsButton: {
    padding: 5,
  },

  // RECOMMENDED CARD
  recommendedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    gap: 12,
  },
  cafeIconCircle: {
    width: 55,
    height: 55,
    borderRadius: 28,
    backgroundColor: '#FFF5E6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cafeInfo: {
    flex: 1,
  },
  cafeName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#3A2A23',
    marginBottom: 4,
  },
  cafeDescription: {
    fontSize: 13,
    color: '#8B6F47',
    marginBottom: 6,
  },
  cafeMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  cafeDistance: {
    fontSize: 12,
    color: '#8B6F47',
    fontWeight: '600',
  },
  heartButton: {
    padding: 8,
  },

  // NO RESULTS
  noResultsContainer: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3A2A23',
    marginTop: 15,
    marginBottom: 5,
  },
  noResultsSubtext: {
    fontSize: 14,
    color: '#8B6F47',
  },

  // MAIN BUTTON
  mainButton: {
    flexDirection: 'row',
    backgroundColor: '#8B6F47',
    marginHorizontal: 20,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    shadowColor: '#8B6F47',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  mainButtonText: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
});

export default HomeScreen;