import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function BestCafesScreen() {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const filters = [
    { id: 'wifi', label: 'WiFi Gratuit', icon: 'wifi' },
    { id: 'outlets', label: 'Prises Élec.', icon: 'flash' },
    { id: 'quiet', label: 'Calme/Étudier', icon: 'book' },
    { id: 'date', label: 'Idéal Date', icon: 'heart' },
    { id: 'heating', label: 'Chauffage', icon: 'flame' },
    { id: 'terrace', label: 'Terrasse', icon: 'sunny' },
    { id: 'coworking', label: 'Coworking', icon: 'people' },
    { id: 'vegan', label: 'Options Vegan', icon: 'leaf' },
    { id: 'parking', label: 'Parking', icon: 'car' },
    { id: 'petfriendly', label: 'Animaux OK', icon: 'paw' },
  ];

  const cafes = [
    {
      id: '1',
      name: 'Le Percolateur',
      address: '15 Rue de la République',
      rating: 4.8,
      reviews: 342,
      distance: '0.5 km',
      priceRange: '€€',
      tags: ['wifi', 'outlets', 'quiet'],
      image: 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?auto=format&fit=crop&q=80&w=2000',
      specialty: 'Café artisanal & espace de travail',
    },
    {
      id: '2',
      name: 'Café Romance',
      address: '8 Avenue des Amoureux',
      rating: 4.9,
      reviews: 567,
      distance: '0.8 km',
      priceRange: '€€€',
      tags: ['date', 'heating', 'quiet'],
      image: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&q=80&w=2000',
      specialty: 'Ambiance romantique & délices sucrés',
    },
    {
      id: '3',
      name: 'Study Brew',
      address: '23 Boulevard Universitaire',
      rating: 4.7,
      reviews: 289,
      distance: '1.2 km',
      priceRange: '€',
      tags: ['wifi', 'outlets', 'quiet', 'coworking'],
      image: 'https://images.unsplash.com/photo-1559496417-e7f25cb247f6?auto=format&fit=crop&q=80&w=2000',
      specialty: 'Parfait pour étudier & travailler',
    },
    {
      id: '4',
      name: 'Jardin Café',
      address: '45 Rue des Fleurs',
      rating: 4.6,
      reviews: 421,
      distance: '1.5 km',
      priceRange: '€€',
      tags: ['terrace', 'heating', 'petfriendly', 'vegan'],
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=2000',
      specialty: 'Terrasse fleurie & menu bio',
    },
    {
      id: '5',
      name: 'Tech Hub Café',
      address: '12 Rue Innovation',
      rating: 4.8,
      reviews: 198,
      distance: '0.9 km',
      priceRange: '€€',
      tags: ['wifi', 'outlets', 'coworking', 'parking'],
      image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&q=80&w=2000',
      specialty: 'Espace coworking moderne',
    },
    {
      id: '6',
      name: 'La Chaleur',
      address: '34 Avenue du Confort',
      rating: 4.5,
      reviews: 156,
      distance: '2.0 km',
      priceRange: '€€',
      tags: ['heating', 'quiet', 'date'],
      image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=2000',
      specialty: 'Ambiance cosy & cheminée',
    },
  ];

  const toggleFilter = (filterId) => {
    if (selectedFilters.includes(filterId)) {
      setSelectedFilters(selectedFilters.filter(f => f !== filterId));
    } else {
      setSelectedFilters([...selectedFilters, filterId]);
    }
  };

  const filteredCafes = cafes.filter(cafe => {
    const matchesSearch = cafe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         cafe.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilters = selectedFilters.length === 0 || 
                          selectedFilters.every(filter => cafe.tags.includes(filter));
    return matchesSearch && matchesFilters;
  });

  const clearFilters = () => {
    setSelectedFilters([]);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meilleurs Cafés</Text>
        <Text style={styles.headerSubtitle}>Découvrez les meilleurs spots ☕</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#6B4F33" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher un café..."
          placeholderTextColor="#A89584"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color="#6B4F33" />
          </TouchableOpacity>
        )}
      </View>

      {/* Filters */}
      <View style={styles.filtersSection}>
        <View style={styles.filtersHeader}>
          <Text style={styles.filtersTitle}>Filtres</Text>
          {selectedFilters.length > 0 && (
            <TouchableOpacity onPress={clearFilters} style={styles.clearButton}>
              <Text style={styles.clearButtonText}>Effacer tout</Text>
            </TouchableOpacity>
          )}
        </View>
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
                selectedFilters.includes(filter.id) && styles.filterChipActive
              ]}
              onPress={() => toggleFilter(filter.id)}
            >
              <Ionicons 
                name={filter.icon} 
                size={16} 
                color={selectedFilters.includes(filter.id) ? '#FFF' : '#6B4F33'} 
              />
              <Text style={[
                styles.filterText,
                selectedFilters.includes(filter.id) && styles.filterTextActive
              ]}>
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Results Count */}
      <View style={styles.resultsHeader}>
        <Text style={styles.resultsText}>
          {filteredCafes.length} café{filteredCafes.length > 1 ? 's' : ''} trouvé{filteredCafes.length > 1 ? 's' : ''}
        </Text>
      </View>

      {/* Cafes List */}
      <ScrollView 
        style={styles.cafesList}
        contentContainerStyle={styles.cafesListContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredCafes.map(cafe => (
          <TouchableOpacity key={cafe.id} style={styles.cafeCard}>
            <Image source={{ uri: cafe.image }} style={styles.cafeImage} />
            <View style={styles.cafeContent}>
              <View style={styles.cafeHeader}>
                <Text style={styles.cafeName}>{cafe.name}</Text>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={16} color="#FFB800" />
                  <Text style={styles.ratingText}>{cafe.rating}</Text>
                  <Text style={styles.reviewsText}>({cafe.reviews})</Text>
                </View>
              </View>
              
              <Text style={styles.cafeSpecialty}>{cafe.specialty}</Text>
              
              <View style={styles.cafeInfo}>
                <View style={styles.infoItem}>
                  <Ionicons name="location" size={14} color="#6B4F33" />
                  <Text style={styles.infoText}>{cafe.address}</Text>
                </View>
                <View style={styles.infoRow}>
                  <View style={styles.infoItem}>
                    <Ionicons name="navigate" size={14} color="#6B4F33" />
                    <Text style={styles.infoText}>{cafe.distance}</Text>
                  </View>
                  <Text style={styles.priceRange}>{cafe.priceRange}</Text>
                </View>
              </View>

              <View style={styles.tagsContainer}>
                {cafe.tags.slice(0, 3).map(tagId => {
                  const filter = filters.find(f => f.id === tagId);
                  return filter ? (
                    <View key={tagId} style={styles.tag}>
                      <Ionicons name={filter.icon} size={12} color="#6B4F33" />
                      <Text style={styles.tagText}>{filter.label}</Text>
                    </View>
                  ) : null;
                })}
                {cafe.tags.length > 3 && (
                  <View style={styles.tag}>
                    <Text style={styles.tagText}>+{cafe.tags.length - 3}</Text>
                  </View>
                )}
              </View>

              <View style={styles.cafeActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="call" size={18} color="#6B4F33" />
                  <Text style={styles.actionButtonText}>Appeler</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="navigate" size={18} color="#6B4F33" />
                  <Text style={styles.actionButtonText}>Itinéraire</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionButton, styles.primaryButton]}>
                  <Ionicons name="bookmark" size={18} color="#FFF" />
                  <Text style={[styles.actionButtonText, styles.primaryButtonText]}>Sauvegarder</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {filteredCafes.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="cafe-outline" size={80} color="#A89584" />
            <Text style={styles.emptyTitle}>Aucun café trouvé</Text>
            <Text style={styles.emptyText}>
              Essayez de modifier vos filtres ou votre recherche
            </Text>
            {selectedFilters.length > 0 && (
              <TouchableOpacity style={styles.resetButton} onPress={clearFilters}>
                <Text style={styles.resetButtonText}>Réinitialiser les filtres</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF5EF',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#FFF',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3A2A23',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#6B4F33',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    marginTop: 20,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#3A2A23',
  },
  filtersSection: {
    marginTop: 20,
  },
  filtersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  filtersTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3A2A23',
  },
  clearButton: {
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  clearButtonText: {
    fontSize: 14,
    color: '#6B4F33',
    fontWeight: '600',
  },
  filtersContainer: {
    paddingHorizontal: 20,
    paddingBottom: 5,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1.5,
    borderColor: '#F5E6D3',
  },
  filterChipActive: {
    backgroundColor: '#6B4F33',
    borderColor: '#6B4F33',
  },
  filterText: {
    fontSize: 13,
    color: '#6B4F33',
    marginLeft: 6,
    fontWeight: '600',
  },
  filterTextActive: {
    color: '#FFF',
  },
  resultsHeader: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  resultsText: {
    fontSize: 15,
    color: '#6B4F33',
    fontWeight: '600',
  },
  cafesList: {
    flex: 1,
  },
  cafesListContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  cafeCard: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  cafeImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  cafeContent: {
    padding: 16,
  },
  cafeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  cafeName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3A2A23',
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9E6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#3A2A23',
    marginLeft: 4,
  },
  reviewsText: {
    fontSize: 12,
    color: '#6B4F33',
    marginLeft: 3,
  },
  cafeSpecialty: {
    fontSize: 14,
    color: '#6B4F33',
    marginBottom: 12,
    fontStyle: 'italic',
  },
  cafeInfo: {
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoText: {
    fontSize: 13,
    color: '#6B4F33',
    marginLeft: 6,
  },
  priceRange: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6B4F33',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
    gap: 6,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5E6D3',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 11,
    color: '#6B4F33',
    marginLeft: 4,
    fontWeight: '600',
  },
  cafeActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5E6D3',
    paddingVertical: 10,
    borderRadius: 12,
  },
  primaryButton: {
    backgroundColor: '#6B4F33',
  },
  actionButtonText: {
    fontSize: 13,
    color: '#6B4F33',
    fontWeight: '600',
    marginLeft: 6,
  },
  primaryButtonText: {
    color: '#FFF',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3A2A23',
    marginTop: 20,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 15,
    color: '#6B4F33',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  resetButton: {
    marginTop: 20,
    backgroundColor: '#6B4F33',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  resetButtonText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '600',
  },
});