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
      {item.image && <Image source={{ uri: item.image }} style={styles.productImage} />}
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        {item.offer && <Text style={styles.productOffer}>{item.offer}</Text>}
        {item.desc && <Text style={styles.productDescription}>{item.desc}</Text>}
        <View style={styles.productMeta}>
          <Ionicons name="location-outline" size={14} color="#8B6F47" />
          <Text style={styles.productDistance}>{item.distance}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => toggleFavorite(item.id)} style={styles.removeButton}>
        <Ionicons name="close-circle" size={24} color="#FF6B6B" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#3A2A23" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mes Favoris</Text>
      </View>
      {currentLikedProducts.length > 0 ? (
        <FlatList
          data={currentLikedProducts}
          renderItem={renderLikedProduct}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          contentContainerStyle={styles.productList}
        />
      ) : (
        <View style={styles.content}>
          <Ionicons name="heart-outline" size={80} color="#B8A08D" />
          <Text style={styles.message}>Vous n'avez pas encore de favoris.</Text>
          <Text style={styles.subMessage}>Ajoutez des cafés à vos favoris pour les retrouver ici !</Text>
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
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3A2A23',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  message: {
    fontSize: 18,
    color: '#5A3E2B',
    marginTop: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subMessage: {
    fontSize: 14,
    color: '#8B6F47',
    marginTop: 10,
    textAlign: 'center',
  },
  productList: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  productCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productInfo: {
    flex: 1,
    marginLeft: 15,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3A2A23',
  },
  productOffer: {
    fontSize: 14,
    color: '#FF6B6B',
    marginTop: 2,
  },
  productDescription: {
    fontSize: 14,
    color: '#5A3E2B',
    marginTop: 2,
  },
  productMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    gap: 5,
  },
  productDistance: {
    fontSize: 13,
    color: '#8B6F47',
  },
  removeButton: {
    marginLeft: 10,
    padding: 5,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
});