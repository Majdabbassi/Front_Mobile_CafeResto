import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
  TextInput,
  ScrollView,
  Modal,
  SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const CafeListScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCafe, setSelectedCafe] = useState(null);
  const [cafes, setCafes] = useState([]);
  const [filteredCafes, setFilteredCafes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'Tous', icon: 'grid-outline' },
    { id: 'favorites', label: 'Favoris', icon: 'heart' },
    { id: 'nearby', label: 'À proximité', icon: 'location' },
    { id: 'popular', label: 'Populaires', icon: 'trending-up' },
  ];

  // Données statiques des cafés
  const staticCafes = [
    {
      id: '1',
      name: 'Café Arabica',
      address: 'Avenue Habib Bourguiba, Sousse',
      rating: '4.8',
      imageUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=500',
      distance: '0.5',
      isPopular: true,
    },
    {
      id: '2',
      name: 'Espresso House',
      address: 'Rue de Paris, Centre Ville',
      rating: '4.5',
      imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=500',
      distance: '1.2',
      isPopular: false,
    },
    {
      id: '3',
      name: 'Coffee Corner',
      address: 'Port El Kantaoui',
      rating: '4.6',
      imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500',
      distance: '2.3',
      isPopular: true,
    },
    {
      id: '4',
      name: 'Le Parisien',
      address: 'Boulevard de la Corniche',
      rating: '4.7',
      imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500',
      distance: '0.8',
      isPopular: false,
    },
    {
      id: '5',
      name: 'Café Médina',
      address: 'Médina de Sousse',
      rating: '4.4',
      imageUrl: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=500',
      distance: '1.5',
      isPopular: true,
    },
    {
      id: '6',
      name: 'Starbucks',
      address: 'Mall of Sousse',
      rating: '4.3',
      imageUrl: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=500',
      distance: '3.1',
      isPopular: false,
    },
    {
      id: '7',
      name: 'Café des Arts',
      address: 'Place Farhat Hached',
      rating: '4.9',
      imageUrl: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=500',
      distance: '0.6',
      isPopular: true,
    },
    {
      id: '8',
      name: 'Costa Coffee',
      address: 'Avenue Hédi Chaker',
      rating: '4.2',
      imageUrl: 'https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?w=500',
      distance: '1.9',
      isPopular: false,
    },
  ];

  useEffect(() => {
    // Simuler un chargement
    setTimeout(() => {
      setCafes(staticCafes);
      setFilteredCafes(staticCafes);
      setLoading(false);
    }, 1000);
    loadFavorites();
  }, []);

  useEffect(() => {
    filterCafes();
  }, [searchQuery, selectedFilter, cafes, favorites]);

  const loadFavorites = async () => {
    try {
      const savedFavorites = await AsyncStorage.getItem('favorites');
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } catch (error) {
      console.error("Error loading favorites:", error);
    }
  };

  const toggleFavorite = async (cafeId) => {
    const newFavorites = favorites.includes(cafeId)
      ? favorites.filter(id => id !== cafeId)
      : [...favorites, cafeId];
    
    setFavorites(newFavorites);
    
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
    } catch (error) {
      console.error("Error saving favorites:", error);
    }
  };

  const filterCafes = () => {
    let filtered = [...cafes];

    // Filtrer par recherche
    if (searchQuery) {
      filtered = filtered.filter(cafe =>
        cafe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cafe.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filtrer par catégorie
    switch (selectedFilter) {
      case 'favorites':
        filtered = filtered.filter(cafe => favorites.includes(cafe.id));
        break;
      case 'nearby':
        filtered = filtered.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
        break;
      case 'popular':
        filtered = filtered.filter(cafe => cafe.isPopular);
        break;
      default:
        break;
    }

    setFilteredCafes(filtered);
  };

  const handleCafePress = (cafe) => {
    setSelectedCafe(cafe);
    setModalVisible(true);
  };

  const renderCafeCard = ({ item }) => (
    <TouchableOpacity
      style={styles.cafeCard}
      onPress={() => handleCafePress(item)}
      activeOpacity={0.7}
    >
      <Image
        source={{ uri: item.imageUrl }}
        style={styles.cafeImage}
      />
      
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={() => toggleFavorite(item.id)}
      >
        <Ionicons
          name={favorites.includes(item.id) ? 'heart' : 'heart-outline'}
          size={20}
          color={favorites.includes(item.id) ? '#D84315' : '#666'}
        />
      </TouchableOpacity>

      {item.isPopular && (
        <View style={styles.popularBadge}>
          <Ionicons name="trending-up" size={12} color="#FFF" />
          <Text style={styles.popularText}>Populaire</Text>
        </View>
      )}

      <View style={styles.cafeInfo}>
        <Text style={styles.cafeName} numberOfLines={1}>
          {item.name}
        </Text>
        
        <View style={styles.addressContainer}>
          <Ionicons name="location-outline" size={12} color="#666" />
          <Text style={styles.cafeAddress} numberOfLines={1}>
            {item.address}
          </Text>
        </View>

        <View style={styles.bottomInfo}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color="#FFB300" />
            <Text style={styles.cafeRating}>{item.rating}</Text>
          </View>
          
          <View style={styles.distanceContainer}>
            <Ionicons name="walk-outline" size={14} color="#666" />
            <Text style={styles.distanceText}>{item.distance} km</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#D84315" />
        <Text style={styles.loadingText}>Chargement des cafés...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#3A2A23" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cafés</Text>
        <View style={styles.headerRight}>
          <Text style={styles.cafeCount}>{filteredCafes.length}</Text>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher un café..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color="#666" />
          </TouchableOpacity>
        )}
      </View>

      {/* Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
        contentContainerStyle={styles.filtersContent}
      >
        {filters.map(filter => (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.filterButton,
              selectedFilter === filter.id && styles.filterButtonActive
            ]}
            onPress={() => setSelectedFilter(filter.id)}
          >
            <Ionicons
              name={filter.icon}
              size={18}
              color={selectedFilter === filter.id ? '#FFF' : '#666'}
            />
            <Text
              style={[
                styles.filterText,
                selectedFilter === filter.id && styles.filterTextActive
              ]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Cafe List */} 
      <View style={{ flex: 1 }}>
        {filteredCafes.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="cafe-outline" size={60} color="#CCC" />
            <Text style={styles.emptyText}>Aucun café trouvé</Text>
            <Text style={styles.emptySubText}>
              {searchQuery ? 'Essayez une autre recherche' : 'Modifiez vos filtres'}
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredCafes}
            renderItem={renderCafeCard}
            keyExtractor={item => item.id}
            numColumns={2}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>

      {/* Cafe Detail Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Ionicons name="close-circle" size={30} color="#3A2A23" />
            </TouchableOpacity>

            {selectedCafe && (
              <ScrollView 
                contentContainerStyle={styles.modalContent}
                showsVerticalScrollIndicator={false}
              >
                <Image source={{ uri: selectedCafe.imageUrl }} style={styles.modalImage} />
                <Text style={styles.modalCafeName}>{selectedCafe.name}</Text>
                
                <View style={styles.modalDetailRow}>
                  <Ionicons name="location-outline" size={18} color="#666" />
                  <Text style={styles.modalDetailText}>{selectedCafe.address}</Text>
                </View>
                
                <View style={styles.modalDetailRow}>
                  <Ionicons name="star" size={18} color="#FFB300" />
                  <Text style={styles.modalDetailText}>{selectedCafe.rating} • {selectedCafe.distance} km</Text>
                </View>

                {selectedCafe.isPopular && (
                  <View style={styles.modalPopularBadge}>
                    <Ionicons name="trending-up" size={14} color="#FFF" />
                    <Text style={styles.modalPopularText}>Populaire</Text>
                  </View>
                )}

                <Text style={styles.modalDescription}>
                  Un lieu chaleureux où vous pouvez déguster un excellent café dans une atmosphère conviviale. Parfait pour se détendre ou travailler.
                </Text>

                <View style={styles.modalButtonsContainer}>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => {
                      setModalVisible(false);
                      console.log('Navigating to MenuScreen with:', { cafeId: selectedCafe.id, cafeName: selectedCafe.name });
                      navigation.navigate('MenuScreen', { cafeId: selectedCafe.id, cafeName: selectedCafe.name });
                    }}
                  >
                    <Ionicons name="restaurant-outline" size={20} color="#FFF" />
                    <Text style={styles.actionButtonText}>Voir le Menu</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.actionButton, styles.reserveButton]}
                    onPress={() => {
                      setModalVisible(false);
                      navigation.navigate('EffectuerReservationScreen', { cafeId: selectedCafe.id, cafeName: selectedCafe.name });
                    }}
                  >
                    <Ionicons name="calendar-outline" size={20} color="#FFF" />
                    <Text style={styles.actionButtonText}>Réserver</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F5F0',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 10,
    marginBottom: 15,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3A2A23',
    flex: 1,
    marginLeft: 10,
  },
  headerRight: {
    backgroundColor: '#D84315',
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  cafeCount: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginHorizontal: 15,
    marginBottom: 15,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
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
  filtersContainer: {
    marginBottom: 8,
    paddingVertical: 0,
    flexGrow: 0,
  },
  filtersContent: {
    paddingHorizontal: 15,
    alignItems: 'center',
    paddingVertical: 0,
    columnGap: 6,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    width: 84,
    height: 30,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 14,
    marginRight: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  filterButtonActive: {
    backgroundColor: '#D84315',
  },
  filterText: {
    marginLeft: 6,
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  filterTextActive: {
    color: '#FFF',
  },
  listContent: {
    paddingHorizontal: 10,
    paddingTop: 5,
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  cafeCard: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    width: (width / 2) - 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
    overflow: 'hidden',
  },
  cafeImage: {
    width: '100%',
    height: 140,
    resizeMode: 'cover',
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 20,
    padding: 8,
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  popularBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#D84315',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 1,
  },
  popularText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  cafeInfo: {
    padding: 12,
  },
  cafeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3A2A23',
    marginBottom: 6,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cafeAddress: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
    flex: 1,
  },
  bottomInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cafeRating: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#3A2A23',
    marginLeft: 4,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distanceText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3A2A23',
    marginTop: 15,
  },
  emptySubText: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: '#666',
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContainer: {
    width: '90%',
    maxHeight: '85%',
    backgroundColor: '#FFF',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
    overflow: 'hidden',
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 10,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 20,
    padding: 2,
  },
  modalContent: {
    alignItems: 'center',
    paddingBottom: 25,
  },
  modalImage: {
    width: '100%',
    height: 220,
    resizeMode: 'cover',
  },
  modalCafeName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3A2A23',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  modalDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 20,
  },
  modalDetailText: {
    fontSize: 15,
    color: '#666',
    marginLeft: 8,
    flex: 1,
  },
  modalPopularBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D84315',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 10,
  },
  modalPopularText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  modalDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginVertical: 15,
    lineHeight: 20,
    paddingHorizontal: 25,
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 10,
    gap: 10,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D84315',
    paddingVertical: 14,
    borderRadius: 12,
    shadowColor: '#D84315',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  reserveButton: {
    backgroundColor: '#4CAF50',
    shadowColor: '#4CAF50',
  },
  actionButtonText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default CafeListScreen;