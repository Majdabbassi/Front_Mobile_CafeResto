import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import productService from '../api/productService';

export default function MenuScreen({ navigation, route }) {
  const user = route?.params?.user;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getAllProducts();
        setProducts(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <View style={menuStyles.container}>
        <Text>Chargement des produits...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={menuStyles.container}>
        <Text>Erreur lors du chargement des produits: {error.message}</Text>
      </View>
    );
  }

  const categories = [
    { id: 1, name: 'Café', icon: '☕', color: '#6F4E37' },
    { id: 2, name: 'Thé', icon: '🍵', color: '#8B6F47' },
    { id: 3, name: 'Pâtisseries', icon: '🥐', color: '#D4A574' },
    { id: 4, name: 'Snacks', icon: '🥪', color: '#A0826D' },
  ];

  return (
    <View style={menuStyles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#6F4E37', '#8B6F47']}
        style={menuStyles.header}
      >
        <View style={menuStyles.headerContent}>
          <View>
            <Text style={menuStyles.greeting}>Bonjour,</Text>
            <Text style={menuStyles.username}>{user?.username || 'Invité'} ☕</Text>
          </View>
          <TouchableOpacity style={menuStyles.profileButton}>
            <Text style={menuStyles.profileIcon}>👤</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={menuStyles.content} showsVerticalScrollIndicator={false}>
        {/* Section Bienvenue */}
        <View style={menuStyles.welcomeCard}>
          <Text style={menuStyles.welcomeTitle}>Bienvenue au CoffeeShop ! 🎉</Text>
          <Text style={menuStyles.welcomeText}>
            Découvrez nos délicieux produits et commandez en quelques clics
          </Text>
        </View>

        {/* Catégories */}
        <Text style={menuStyles.sectionTitle}>Nos Catégories</Text>
        <View style={menuStyles.categoriesGrid}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={menuStyles.categoryCard}
              onPress={() => alert(`Catégorie: ${category.name}`)}
              activeOpacity={0.8}
            >
              <View style={[menuStyles.categoryIconContainer, { backgroundColor: category.color }]}>
                <Text style={menuStyles.categoryIcon}>{category.icon}</Text>
              </View>
              <Text style={menuStyles.categoryName}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Actions rapides */}
        <Text style={menuStyles.sectionTitle}>Actions Rapides</Text>
        <View style={menuStyles.actionsContainer}>
          <TouchableOpacity
            style={menuStyles.actionButton}
            onPress={() => alert('Liste des produits')}
          >
            <LinearGradient
              colors={['#6F4E37', '#8B6F47']}
              style={menuStyles.actionGradient}
            >
              <Text style={menuStyles.actionIcon}>📋</Text>
              <Text style={menuStyles.actionText}>Tous les produits</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={menuStyles.actionButton}
            onPress={() => alert('Mes commandes')}
          >
            <LinearGradient
              colors={['#8B6F47', '#A0826D']}
              style={menuStyles.actionGradient}
            >
              <Text style={menuStyles.actionIcon}>🛍️</Text>
              <Text style={menuStyles.actionText}>Mes commandes</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Section Produits */}
        <Text style={menuStyles.sectionTitle}>Nos Produits</Text>
        <View style={menuStyles.productsGrid}>
          {products.map((product) => (
            <TouchableOpacity
              key={product.id}
              style={menuStyles.productCard}
              onPress={() => alert(`Produit: ${product.name}`)}
              activeOpacity={0.8}
            >
              <Image source={{ uri: product.imageUrl }} style={menuStyles.productImage} />
              <View style={menuStyles.productInfo}>
                <Text style={menuStyles.productName}>{product.name}</Text>
                <Text style={menuStyles.productPrice}>{product.price} €</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Offre du jour */}
        <View style={menuStyles.offerCard}>
          <View style={menuStyles.offerBadge}>
            <Text style={menuStyles.offerBadgeText}>🔥 OFFRE DU JOUR</Text>
          </View>
          <Text style={menuStyles.offerTitle}>Café Latte + Croissant</Text>
          <Text style={menuStyles.offerPrice}>Seulement 5.99 €</Text>
          <TouchableOpacity style={menuStyles.offerButton}>
            <Text style={menuStyles.offerButtonText}>Commander →</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const menuStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F5F0',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 16,
    color: '#FFD700',
    fontWeight: '500',
  },
  username: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
    marginTop: 4,
  },
  profileButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIcon: {
    fontSize: 24,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  welcomeCard: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3A2A23',
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 15,
    color: '#8B6F47',
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3A2A23',
    marginBottom: 16,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 32,
  },
  categoryCard: {
    backgroundColor: '#FFF',
    width: '48%',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  categoryIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryIcon: {
    fontSize: 32,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3A2A23',
  },
  actionsContainer: {
    gap: 12,
    marginBottom: 32,
  },
  actionButton: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  actionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    gap: 12,
  },
  actionIcon: {
    fontSize: 28,
  },
  actionText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#FFF',
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 32,
  },
  productCard: {
    backgroundColor: '#FFF',
    width: '48%',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3A2A23',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    color: '#6F4E37',
    fontWeight: '600',
  },
  offerCard: {
    backgroundColor: '#FFD700',
    padding: 24,
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  offerBadge: {
    backgroundColor: '#FF6347',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 12,
  },
  offerBadgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  offerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3A2A23',
    marginBottom: 8,
  },
  offerPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6F4E37',
    marginBottom: 16,
  },
  offerButton: {
    backgroundColor: '#3A2A23',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  offerButtonText: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
