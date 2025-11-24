import React, { useState, useRef, useEffect } from 'react';
import SearchInput from '../components/SearchInput';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions, ScrollView, TextInput, FlatList, Image, Modal } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
console.log('Screen width:', width);

const HomeScreen = ({ navigation }) => {
  const route = useRoute();
  const user = route?.params?.user || {};
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [unseenOffers, setUnseenOffers] = useState(2);
  const [isNotificationModalVisible, setNotificationModalVisible] = useState(false);
  
  // Animations
  const slideAnim = useRef(new Animated.Value(-width * 0.75)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const cardAnimations = useRef([...Array(8)].map(() => new Animated.Value(0))).current;
  const notificationPulse = useRef(new Animated.Value(1)).current;

  const lastVisitedRestaurant = "Le Gourmet Café";

  const topFood = [
    { id: 1, name: "Croissant", description: "Pâtisserie française classique", price: "2.50€", imageUrl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwildwildwhisk.com%2Fhow-to-make-croissant%2F&psig=AOvVaw0sx9F_KlZQrXULhNPkXx-Y&ust=1764006709944000&source=images&opi=89978449' },
    { id: 2, name: "Muffin Myrtille", description: "Muffin moelleux aux myrtilles", price: "3.00€", imageUrl: 'https://odelices.ouest-france.fr/images/recettes/2013/muffins_aux_myrtilles.jpgs' },
    { id: 3, name: "Sandwich Poulet", description: "Sandwich frais au poulet grillé", price: "6.50€", imageUrl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.atelierdeschefs.fr%2Frecettes%2F30696%2Fsandwich-a-la-volaille-roquette-et-pomme-facon-hot-dog%2F&psig=AOvVaw1-8IC6_V80VbLqeuanFtBE&ust=1764006752909000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCLD6rf3diJEDFQAAAAAdAAAAABAE' },
  ];
  const dailyOffers = [
    { id: 1, name: "Café Royal", offer: "-20% sur le Cappuccino", visits: 128, distance: "0.5 km", imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 2, name: "Espresso House", offer: "1 Espresso acheté = 1 offert", visits: 94, distance: "1.2 km", imageUrl: 'https://images.unsplash.com/photo-1525610553908-0ff7c7d4421d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 3, name: "Café Milano", offer: "-30% sur les boissons glacées", visits: 72, distance: "2.1 km", imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 4, name: "Coffee Corner", offer: "Pâtisserie offerte", visits: 156, distance: "0.8 km", imageUrl: 'https://images.unsplash.com/photo-1517256064527-0fe794017e4a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  ];

  const renderFoodItem = ({ item }) => (
    <View style={styles.foodCard}>
      <Image source={{ uri: item.imageUrl }} style={styles.foodImage} />
      <View style={styles.foodInfo}>
        <Text style={styles.foodName}>{item.name}</Text>
        <Text style={styles.foodDescription}>{item.description}</Text>
        <Text style={styles.foodPrice}>{item.price}</Text>
      </View>
    </View>
  );
const topRestaurants = [
  { id: 1, name: "Le Gourmet", cuisine: "Cuisine française", rating: 4.9, price: "€€€", distance: "1.2 km", specialty: "Spécialité: Bœuf Bourguignon" },
  { id: 2, name: "Bella Italia", cuisine: "Cuisine italienne", rating: 4.7, price: "€€", distance: "0.8 km", specialty: "Spécialité: Pizza Napolitaine" },
  { id: 3, name: "Sushi Zen", cuisine: "Cuisine japonaise", rating: 4.8, price: "€€€", distance: "1.5 km", specialty: "Spécialité: Sashimi Premium" },
  { id: 4, name: "Le Tajine d'Or", cuisine: "Cuisine marocaine", rating: 4.6, price: "€€", distance: "2.0 km", specialty: "Spécialité: Couscous Royal" },
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
{/* TOP RESTAURANTS */}
<CardWithAnimation index={5}>
  <View style={styles.sectionContainer}>
    <View style={styles.sectionHeader}>
      <View style={styles.sectionTitleRow}>
        <Ionicons name="restaurant" size={24} color="#8B6F47" />
        <Text style={styles.sectionTitle}>Top Restaurants</Text>
      </View>
      <Text style={styles.sectionSubtitle}>Les mieux notés près de vous</Text>
    </View>

    <View style={styles.restaurantsContainer}>
      {topRestaurants.map((restaurant) => (
        <TouchableOpacity
          key={restaurant.id}
          style={styles.restaurantCard}
          onPress={() => navigation.navigate("RestaurantDetails", { restaurant })}
          activeOpacity={0.8}
        >
          <View style={styles.restaurantHeader}>
            <View style={styles.restaurantIconCircle}>
              <Ionicons name="restaurant" size={24} color="#8B6F47" />
            </View>
            
            <View style={styles.restaurantMainInfo}>
              <Text style={styles.restaurantName}>{restaurant.name}</Text>
              <Text style={styles.restaurantCuisine}>{restaurant.cuisine}</Text>
            </View>

            <TouchableOpacity
              style={styles.heartButton}
              onPress={(e) => {
                e.stopPropagation();
                toggleFavorite(`restaurant-${restaurant.id}`);
              }}
            >
              <Ionicons 
                name={favorites.includes(`restaurant-${restaurant.id}`) ? "heart" : "heart-outline"} 
                size={24} 
                color={favorites.includes(`restaurant-${restaurant.id}`) ? "#FF6B6B" : "#8B6F47"} 
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.restaurantSpecialty}>{restaurant.specialty}</Text>

          <View style={styles.restaurantFooter}>
            <View style={styles.restaurantMetaItem}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.restaurantMetaText}>{restaurant.rating}</Text>
            </View>

            <View style={styles.restaurantMetaItem}>
              <Ionicons name="cash-outline" size={16} color="#8B6F47" />
              <Text style={styles.restaurantMetaText}>{restaurant.price}</Text>
            </View>

            <View style={styles.restaurantMetaItem}>
              <Ionicons name="location-outline" size={16} color="#8B6F47" />
              <Text style={styles.restaurantMetaText}>{restaurant.distance}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.reserveButton}>
            <Text style={styles.reserveButtonText}>Réserver une table</Text>
            <Ionicons name="arrow-forward" size={16} color="#FFF" />
          </TouchableOpacity>
        </TouchableOpacity>
      ))}
    </View>
  </View>
</CardWithAnimation>
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

  // Toggle Notification Modal
  const toggleNotificationModal = () => {
    setNotificationModalVisible(!isNotificationModalVisible);
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
      <Image source={{ uri: 'https://www.cocktailmag.fr/media/k2/items/cache/e529a8dc22bd84a37f6f8ae6b8ce40d3_M.jpg' }} style={styles.carouselImage} />
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
      {/* Notification Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isNotificationModalVisible}
        onRequestClose={toggleNotificationModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Notifications</Text>
              <TouchableOpacity onPress={toggleNotificationModal} style={styles.modalCloseButton}>
                <Ionicons name="close" size={24} color="#3A2A23" />
              </TouchableOpacity>
            </View>
            <ScrollView>
              <View style={styles.notificationItem}>
                <Ionicons name="gift-outline" size={24} color="#8B6F47" />
                <View style={styles.notificationTextContent}>
                  <Text style={styles.notificationTitle}>Nouvelle offre disponible !</Text>
                  <Text style={styles.notificationTime}>Il y a 5 minutes</Text>
                </View>
              </View>
              <View style={styles.notificationItem}>
                <Ionicons name="star-outline" size={24} color="#8B6F47" />
                <View style={styles.notificationTextContent}>
                  <Text style={styles.notificationTitle}>Vous avez gagné 50 points !</Text>
                  <Text style={styles.notificationTime}>Il y a 1 heure</Text>
                </View>
              </View>
              <View style={styles.notificationItem}>
                <Ionicons name="cafe-outline" size={24} color="#8B6F47" />
                <View style={styles.notificationTextContent}>
                  <Text style={styles.notificationTitle}>Votre café préféré est en promotion.</Text>
                  <Text style={styles.notificationTime}>Hier</Text>
                </View>
              </View>
              <View style={styles.notificationItem}>
                <Ionicons name="calendar-outline" size={24} color="#8B6F47" />
                <View style={styles.notificationTextContent}>
                  <Text style={styles.notificationTitle}>Rendez-vous pour votre commande.</Text>
                  <Text style={styles.notificationTime}>2 jours auparavant</Text>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Overlay sombre */}
        <Animated.View
          style={[styles.overlay, { opacity: fadeAnim }]}
          pointerEvents={sidebarOpen ? 'auto' : 'none'}
        >
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            onPress={toggleSidebar}
            activeOpacity={1}
          />
        </Animated.View>


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

          <TouchableOpacity style={styles.menuItem} onPress={() => { toggleSidebar(); navigation.navigate('Likes', { favorites, dailyOffers, recommendedCafes, toggleFavorite }); }}>
            <Ionicons name="heart-outline" size={24} color="#3A2A23" />
            <Text style={styles.menuText}>Mes Favoris</Text>
            {favorites.length > 0 && (
              <View style={styles.favoritesCountBadge}>
                <Text style={styles.favoritesCountText}>{favorites.length}</Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => { toggleSidebar(); navigation.navigate('History'); }}>
            <Ionicons name="gift-outline" size={24} color="#3A2A23" />
            <Text style={styles.menuText}>Mes Récompenses</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => { toggleSidebar(); navigation.navigate('History'); }}>
            <Ionicons name="time-outline" size={24} color="#3A2A23" />
            <Text style={styles.menuText}>Historique</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => { toggleSidebar(); navigation.navigate('CafeList'); }}>
            <Ionicons name="cafe-outline" size={24} color="#3A2A23" />
            <Text style={styles.menuText}>Liste des Cafés</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => { toggleSidebar(); navigation.navigate('Settings'); }}>
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
            <TouchableOpacity onPress={() => navigation.navigate('QRScanner')} style={{ marginRight: 15 }}>
              <Ionicons name="qr-code-outline" size={28} color="#3A2A23" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.notificationButton} onPress={toggleNotificationModal}>
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
          <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
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
              <Text style={styles.lastVisitedName}>{lastVisitedRestaurant}</Text>
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

                {/* TOP FOODS */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionTitle}>Top Foods</Text>
            <TouchableOpacity>
              <Text style={styles.sectionSubtitle}>Voir tout</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={topFood}
            renderItem={renderFoodItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.carouselContainer}
          />
        </View>

        {/* DERNIER RESTAURANT VISITÉ */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Dernier restaurant visité</Text>
          <View style={styles.lastVisitedRestaurantCard}>
            <Text style={styles.lastVisitedRestaurantText}>{lastVisitedRestaurant}</Text>
            <TouchableOpacity style={styles.lastVisitedRestaurantButton}>
              <Text style={styles.lastVisitedRestaurantButtonText}>Commander à nouveau</Text>
            </TouchableOpacity>
          </View>
        </View>

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
// TOP RESTAURANTS
restaurantsContainer: {
  paddingHorizontal: 20,
},
restaurantCard: {
  backgroundColor: '#FFF',
  borderRadius: 16,
  padding: 18,
  marginBottom: 15,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.1,
  shadowRadius: 6,
  elevation: 3,
},
restaurantHeader: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 12,
  gap: 12,
},
restaurantIconCircle: {
  width: 50,
  height: 50,
  borderRadius: 25,
  backgroundColor: '#FFF5E6',
  justifyContent: 'center',
  alignItems: 'center',
},
restaurantMainInfo: {
  flex: 1,
},
restaurantName: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#3A2A23',
  marginBottom: 3,
},
restaurantCuisine: {
  fontSize: 13,
  color: '#8B6F47',
},
restaurantSpecialty: {
  fontSize: 14,
  color: '#6B4F33',
  fontStyle: 'italic',
  marginBottom: 12,
  paddingLeft: 5,
},
restaurantFooter: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 15,
  paddingHorizontal: 5,
},
restaurantMetaItem: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 4,
},
restaurantMetaText: {
  fontSize: 13,
  color: '#8B6F47',
  fontWeight: '600',
},
reserveButton: {
  backgroundColor: '#8B6F47',
  paddingVertical: 12,
  paddingHorizontal: 20,
  borderRadius: 12,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 8,
  shadowColor: '#8B6F47',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 4,
  elevation: 3,
},
reserveButtonText: {
  color: '#FFF',
  fontSize: 15,
  fontWeight: 'bold',
},
heartButton: {
  padding: 5,
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
    position: 'relative',
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

  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1001,
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
    borderRadius: 15,
    marginRight: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  carouselImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  offerBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    zIndex: 1,
  },
  offerBadgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 20,
    padding: 5,
    zIndex: 1,
  },
  carouselContent: {
    padding: 15,
  },
  carouselCafeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3A2A23',
    marginBottom: 5,
  },
  carouselOffer: {
    fontSize: 14,
    color: '#8B6F47',
    marginBottom: 10,
  },
  carouselFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  distanceText: {
    fontSize: 12,
    color: '#8B6F47',
  },
  visitsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  visitsText: {
    fontSize: 12,
    color: '#8B6F47',
  },
  carouselButton: {
    backgroundColor: '#8B6F47',
    paddingVertical: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  carouselButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
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
    color: '#666',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3A2A23',
  },
  modalCloseButton: {
    padding: 5,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  notificationTextContent: {
    marginLeft: 15,
    flex: 1,
  },
  foodCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginRight: 15,
    width: 180,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  foodImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  foodInfo: {
    padding: 10,
  },
  foodName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3A2A23',
    marginBottom: 5,
  },
  foodDescription: {
    fontSize: 12,
    color: '#8B6F47',
    marginBottom: 5,
  },
  foodPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#3A2A23',
  },
  lastVisitedRestaurantCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 20,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lastVisitedRestaurantText: {
    fontSize: 16,
    color: '#3A2A23',
    fontWeight: 'bold',
  },
  lastVisitedRestaurantButton: {
    backgroundColor: '#8B6F47',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  lastVisitedRestaurantButtonText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: 'bold',
  },
});
export default HomeScreen;
