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
  Modal // Added Modal import
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const CafeListScreen = ({ navigation }) => {
  const [cafes, setCafes] = useState([]);
  const [filteredCafes, setFilteredCafes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCafe, setSelectedCafe] = useState(null);

  const filters = [
    { id: 'all', label: 'Tous', icon: 'grid-outline' },
    { id: 'favorites', label: 'Favoris', icon: 'heart' },
    { id: 'nearby', label: 'À proximité', icon: 'location' },
    { id: 'popular', label: 'Populaires', icon: 'trending-up' },
  ];

  useEffect(() => {
    const fetchCafes = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');
        const response = await fetch(`${API_URL}`, {
          headers: {
            'Authorization': `Bearer ${userToken}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Mapping product data to cafe structure
        const mappedCafes = data.map(item => ({
          id: item._id,
          name: item.name,
          address: item.description || 'Adresse non spécifiée', // Using description as address
          rating: item.rating || '4.0', // Assuming a rating field or default
          imageUrl: item.image || 'https://via.placeholder.com/150', // Assuming an image field or placeholder
          distance: '0.0', // Placeholder for distance
          isPopular: false, // Placeholder for popularity
        }));
        setCafes(mappedCafes);
        setFilteredCafes(mappedCafes);
      } catch (error) {
        console.error("Error fetching cafes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCafes();
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
    setIsModalVisible(true);
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
    <View style={styles.container}>
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
              style={{ flexShrink: 0 }}
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

      {/* Cafe Details Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(!isModalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {selectedCafe && (
              <>
                <Image source={{ uri: selectedCafe.imageUrl }} style={styles.modalImage} />
                <Text style={styles.modalCafeName}>{selectedCafe.name}</Text>
                <Text style={styles.modalCafeAddress}>{selectedCafe.address}</Text>
                <View style={styles.modalRatingContainer}>
                  <Ionicons name="star" size={20} color="#FFB300" />
                  <Text style={styles.modalCafeRating}>{selectedCafe.rating}</Text>
                </View>
                <TouchableOpacity
                  style={styles.modalCloseButton}
                  onPress={() => setIsModalVisible(!isModalVisible)}
                >
                  <Text style={styles.modalCloseButtonText}>Fermer</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F5F0',
    paddingTop: 50,
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
    paddingVertical: 6,
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
    paddingVertical: 10,
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
    marginBottom: 15,
  },
  filtersContent: {
    paddingHorizontal: 15,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    width: (width - 60) / 4, // Calculate fixed width for 4 buttons with margins
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
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
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    flexShrink: 1,
    numberOfLines: 1,
  },
  filterTextActive: {
    color: '#FFF',
  },
  listContent: {
    paddingHorizontal: 10,
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)', // Semi-transparent background
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
  },
  modalImage: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 15,
    resizeMode: 'cover',
  },
  modalCafeName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#3A2A23',
    textAlign: 'center',
  },
  modalCafeAddress: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalCafeRating: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3A2A23',
    marginLeft: 8,
  },
  modalCloseButton: {
    backgroundColor: '#D84315',
    borderRadius: 10,
    padding: 12,
    elevation: 2,
  },
  modalCloseButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default CafeListScreen;