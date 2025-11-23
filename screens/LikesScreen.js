import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';

export default function LikesScreen({ navigation }) {
  const route = useRoute();
  const { favorites, dailyOffers, recommendedCafes, toggleFavorite } = route.params || { favorites: [], dailyOffers: [], recommendedCafes: [], toggleFavorite: () => {} };

  const [currentLikedProducts, setCurrentLikedProducts] = useState([]);

  useEffect(() => {
    const allProducts = [];
    const productIds = new Set();

    [...dailyOffers, ...recommendedCafes].forEach(product => {
      if (!productIds.has(product.id)) {
        allProducts.push(product);
        productIds.add(product.id);
      }
    });

    setCurrentLikedProducts(allProducts.filter(product => favorites.includes(product.id)));
  }, [favorites, dailyOffers, recommendedCafes]);

  const renderLikedProduct = ({ item }) => (
    <View style={styles.productCard}>
      <View style={styles.imageContainer}>
        {item.image && <Image source={{ uri: item.image }} style={styles.productImage} />}
        <View style={styles.imageBadge}>
          <Ionicons name="heart" size={16} color="#FF6B6B" />
        </View>
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
        {item.offer && (
          <View style={styles.offerBadge}>
            <Ionicons name="pricetag" size={12} color="#FF6B6B" />
            <Text style={styles.productOffer}>{item.offer}</Text>
          </View>
        )}
        {item.desc && <Text style={styles.productDescription} numberOfLines={2}>{item.desc}</Text>}
        <View style={styles.productMeta}>
          <View style={styles.distanceTag}>
            <Ionicons name="location-outline" size={14} color="#8B6F47" />
            <Text style={styles.productDistance}>{item.distance}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={() => toggleFavorite(item.id)} style={styles.removeButton}>
        <View style={styles.removeButtonInner}>
          <Ionicons name="trash-outline" size={20} color="#FF6B6B" />
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <View style={styles.backButtonInner}>
            <Ionicons name="arrow-back" size={24} color="#3A2A23" />
          </View>
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Mes Favoris</Text>
          {currentLikedProducts.length > 0 && (
            <View style={styles.countBadge}>
              <Text style={styles.countText}>{currentLikedProducts.length}</Text>
            </View>
          )}
        </View>
      </View>
      
      {currentLikedProducts.length > 0 ? (
        <FlatList
          data={currentLikedProducts}
          renderItem={renderLikedProduct}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          contentContainerStyle={styles.productList}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.content}>
          <View style={styles.emptyIconContainer}>
            <Ionicons name="heart-outline" size={80} color="#D4C4B0" />
            <View style={styles.emptyIconBg} />
          </View>
          <Text style={styles.message}>Aucun favori pour le moment</Text>
          <Text style={styles.subMessage}>
            Explorez nos cafés et ajoutez vos préférés ici en appuyant sur 
            <Ionicons name="heart" size={14} color="#FF6B6B" />
          </Text>
          <TouchableOpacity 
            style={styles.exploreButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.exploreButtonText}>Explorer les cafés</Text>
            <Ionicons name="arrow-forward" size={18} color="#FFF" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F5F0',
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#F9F5F0',
  },
  backButton: {
    marginRight: 15,
  },
  backButtonInner: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#3A2A23',
    letterSpacing: -0.5,
  },
  countBadge: {
    backgroundColor: '#8B6F47',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginLeft: 12,
  },
  countText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  emptyIconContainer: {
    position: 'relative',
    marginBottom: 25,
  },
  emptyIconBg: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#FFF',
    opacity: 0.6,
    top: -30,
    left: -30,
    zIndex: -1,
  },
  message: {
    fontSize: 22,
    color: '#3A2A23',
    marginTop: 10,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: -0.3,
  },
  subMessage: {
    fontSize: 15,
    color: '#8B6F47',
    marginTop: 12,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  exploreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8B6F47',
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 25,
    marginTop: 30,
    shadowColor: '#8B6F47',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    gap: 8,
  },
  exploreButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  productList: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  productCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 18,
    marginBottom: 14,
    shadowColor: '#3A2A23',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F0EBE3',
  },
  imageContainer: {
    position: 'relative',
  },
  productImage: {
    width: 90,
    height: 90,
    borderRadius: 14,
    backgroundColor: '#F0EBE3',
  },
  imageBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: '#FFF',
    borderRadius: 12,
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  productInfo: {
    flex: 1,
    marginLeft: 14,
    paddingRight: 8,
  },
  productName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#3A2A23',
    marginBottom: 6,
    letterSpacing: -0.2,
  },
  offerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFE8E8',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 6,
    gap: 4,
  },
  productOffer: {
    fontSize: 13,
    color: '#FF6B6B',
    fontWeight: '600',
  },
  productDescription: {
    fontSize: 13,
    color: '#8B6F47',
    lineHeight: 18,
    marginBottom: 8,
  },
  productMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distanceTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F5F0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  productDistance: {
    fontSize: 12,
    color: '#8B6F47',
    fontWeight: '600',
  },
  removeButton: {
    marginLeft: 8,
  },
  removeButtonInner: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFE8E8',
    justifyContent: 'center',
    alignItems: 'center',
  },
});