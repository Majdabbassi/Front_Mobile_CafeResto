import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function MenuScreen({ navigation }) {
  const [products, setProducts] = useState([
    { id: 1, name: 'Cappuccino', price: 5.5, liked: false },
    { id: 2, name: 'Latte', price: 6.0, liked: false },
    { id: 3, name: 'Espresso', price: 4.0, liked: false },
    { id: 4, name: 'Mocha', price: 6.5, liked: false },
    { id: 5, name: 'Macchiato', price: 5.0, liked: false },
    { id: 6, name: 'Americano', price: 4.5, liked: false },
    { id: 7, name: 'Flat White', price: 5.5, liked: false },
    { id: 8, name: 'Affogato', price: 6.0, liked: false },
    { id: 9, name: 'Irish Coffee', price: 7.0, liked: false },
    { id: 10, name: 'Cold Brew', price: 5.0, liked: false },
    { id: 11, name: 'Frappuccino', price: 6.5, liked: false },
    { id: 12, name: 'Doppio', price: 4.5, liked: false },
  ]);

  const [searchText, setSearchText] = useState('');

  const toggleLike = (id) => {
    setProducts(
      products.map((p) => (p.id === id ? { ...p, liked: !p.liked } : p))
    );
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderProduct = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.name}>{item.name}</Text>
        <TouchableOpacity onPress={() => toggleLike(item.id)}>
          <Ionicons
            name={item.liked ? 'heart' : 'heart-outline'}
            size={22}
            color={item.liked ? 'red' : '#555'}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.price}>{item.price} DT</Text>

      <TouchableOpacity
        style={styles.orderBtn}
        onPress={() => alert(`Order placed: ${item.name}`)}
      >
        <Text style={styles.orderText}>Order</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="#5A3E2B" />
        </TouchableOpacity>
        <Text style={styles.title}>Menu</Text>
        <TouchableOpacity>
          <Ionicons name="person-circle-outline" size={34} color="#5A3E2B" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#888" style={{ marginRight: 6 }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        renderItem={renderProduct}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F5F0',
    padding: 15,
    paddingTop: 45,
  },

  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#5A3E2B',
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  searchInput: {
    flex: 1,
    fontSize: 16,
  },

  card: {
    backgroundColor: '#fff',
    width: '48%',
    marginBottom: 15,
    borderRadius: 15,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },

  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },

  price: {
    fontSize: 14,
    color: '#8B4513',
    marginBottom: 10,
  },

  orderBtn: {
    backgroundColor: '#8B4513',
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: 'center',
  },

  orderText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
