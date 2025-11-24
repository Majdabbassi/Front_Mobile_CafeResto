import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  Animated,
  Dimensions,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useRoute } from "@react-navigation/native";

export default function MenuScreen({ navigation }) {
  const { width } = Dimensions.get("window");
  const route = useRoute();
  const { cafeId, cafeName } = route.params || {};
  console.log('MenuScreen received params:', { cafeId, cafeName });

  // Products with category and images
  const [products, setProducts] = useState([
    // Coffee Section
    { id: 1, name: "Cappuccino", price: 5.5, liked: false, type: "Coffee", image: "☕" },
    { id: 2, name: "Latte", price: 6.0, liked: false, type: "Coffee", image: "☕" },
    { id: 3, name: "Espresso", price: 4.0, liked: false, type: "Coffee", image: "☕" },
    { id: 4, name: "Americano", price: 4.5, liked: false, type: "Coffee", image: "☕" },
    { id: 5, name: "Mocha", price: 6.5, liked: false, type: "Coffee", image: "☕" },
    { id: 6, name: "Macchiato", price: 5.0, liked: false, type: "Coffee", image: "☕" },
    { id: 7, name: "Flat White", price: 5.8, liked: false, type: "Coffee", image: "☕" },
    { id: 8, name: "Cold Brew", price: 5.2, liked: false, type: "Coffee", image: "☕" },

    // Drink Section
    { id: 9, name: "Orange Juice", price: 3.0, liked: false, type: "Drink", image: "🍊" },
    { id: 10, name: "Coke", price: 2.5, liked: false, type: "Drink", image: "🥤" },
    { id: 11, name: "Lemonade", price: 3.5, liked: false, type: "Drink", image: "🍋" },
    { id: 12, name: "Iced Tea", price: 3.2, liked: false, type: "Drink", image: "🍵" },
    { id: 13, name: "Smoothie", price: 4.5, liked: false, type: "Drink", image: "🥤" },
    { id: 14, name: "Mineral Water", price: 1.5, liked: false, type: "Drink", image: "💧" },
    { id: 15, name: "Sparkling Water", price: 2.0, liked: false, type: "Drink", image: "💧" },

    // Meals Section
    { id: 16, name: "Burger", price: 8.0, liked: false, type: "Meals", image: "🍔" },
    { id: 17, name: "Pizza", price: 9.5, liked: false, type: "Meals", image: "🍕" },
    { id: 18, name: "Sandwich", price: 6.5, liked: false, type: "Meals", image: "🥪" },
    { id: 19, name: "Salad", price: 7.0, liked: false, type: "Meals", image: "🥗" },
    { id: 20, name: "Pasta", price: 8.5, liked: false, type: "Meals", image: "🍝" },
    { id: 21, name: "Wrap", price: 6.0, liked: false, type: "Meals", image: "🌯" },
    { id: 22, name: "Quesadilla", price: 7.5, liked: false, type: "Meals", image: "🌮" },

    // Dessert Section
    { id: 23, name: "Cheesecake", price: 4.5, liked: false, type: "Dessert", image: "🍰" },
    { id: 24, name: "Brownie", price: 3.5, liked: false, type: "Dessert", image: "🍫" },
    { id: 25, name: "Ice Cream", price: 3.0, liked: false, type: "Dessert", image: "🍦" },
    { id: 26, name: "Muffin", price: 2.5, liked: false, type: "Dessert", image: "🧁" },
    { id: 27, name: "Cookie", price: 1.5, liked: false, type: "Dessert", image: "🍪" },
    { id: 28, name: "Donut", price: 2.0, liked: false, type: "Dessert", image: "🍩" },
    { id: 29, name: "Croissant", price: 2.8, liked: false, type: "Dessert", image: "🥐" },
  ]);

  // Promotions (subset of products for carousel)
  const [promotions, setPromotions] = useState([
    { id: 2, name: "Latte", price: 6.0, discount: 30, image: "☕" },
    { id: 16, name: "Burger", price: 8.0, discount: 25, image: "🍔" },
    { id: 23, name: "Cheesecake", price: 4.5, discount: 20, image: "🍰" },
    { id: 5, name: "Mocha", price: 6.5, discount: 15, image: "☕" },
    { id: 20, name: "Pasta", price: 8.5, discount: 18, image: "🍝" },
  ]);
  
  const promoIndex = useRef(0);
  const [currentPromo, setCurrentPromo] = useState(promotions[0]);
  const slideAnim = useRef(new Animated.Value(width)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Categories
  const categories = ["All", "Coffee", "Drink", "Meals", "Dessert"];

  // States
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [cartVisible, setCartVisible] = useState(false);
  const [cart, setCart] = useState([]);
  const [isGrid, setIsGrid] = useState(true);
  const [productModalVisible, setProductModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [favoritesVisible, setFavoritesVisible] = useState(false);
  const [profileVisible, setProfileVisible] = useState(false);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [checkoutVisible, setCheckoutVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const profileSlideAnim = useState(new Animated.Value(-300))[0];
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedFilter, setSelectedFilter] = useState({ type: null, maxPrice: null });

  // Checkout steps
  const checkoutSteps = [
    { title: "Processing your order", description: "We're preparing your items", icon: "⏳" },
    { title: "Cooking in progress", description: "Our chefs are working on your order", icon: "👨‍🍳" },
    { title: "Order ready", description: "Your order is prepared and waiting", icon: "✅" },
    { title: "Out for delivery", description: "Your order is on the way", icon: "🚗" },
    { title: "Order delivered", description: "Enjoy your meal!", icon: "🎉" }
  ];

  // ===== Checkout Process =====
  const startCheckout = () => {
    setCheckoutVisible(true);
    setCurrentStep(0);
    setCartVisible(false);
    
    // Simulate checkout process
    const timer = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= checkoutSteps.length - 1) {
          clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, 2000);
  };

  // ===== Enhanced Promotions Carousel with Animation =====
  const animatePromo = () => {
    slideAnim.setValue(width);
    fadeAnim.setValue(0);

    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    const changePromo = () => {
      promoIndex.current = (promoIndex.current + 1) % promotions.length;
      setCurrentPromo(promotions[promoIndex.current]);
      animatePromo();
    };

    animatePromo();
    const interval = setInterval(changePromo, 4000);
    return () => clearInterval(interval);
  }, []);

  const goToPromo = (index) => {
    promoIndex.current = index;
    setCurrentPromo(promotions[index]);
    animatePromo();
  };

  // ===== Profile Functions =====
  const toggleProfile = () => {
    if (profileVisible) {
      closeProfile();
    } else {
      setProfileVisible(true);
      Animated.timing(profileSlideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const closeProfile = () => {
    Animated.timing(profileSlideAnim, {
      toValue: -300,
      duration: 300,
      useNativeDriver: false,
    }).start(() => setProfileVisible(false));
  };

  // ===== Like/Cart Functions =====
  const toggleLike = (id) => {
    setProducts(products.map(p => p.id === id ? { ...p, liked: !p.liked } : p));
  };

  const addToCart = (item) => {
    const existing = cart.find(c => c.id === item.id);
    if (existing) {
      setCart(cart.map(c =>
        c.id === item.id ? { ...c, qty: c.qty + (item.qty || 1) } : c
      ));
    } else {
      setCart([...cart, { ...item, qty: item.qty || 1 }]);
    }
  };

  const removeFromCart = (index) => {
    const updated = [...cart];
    updated.splice(index, 1);
    setCart(updated);
  };

  const getTotalPrice = () => cart.reduce((sum, item) => sum + item.price * item.qty, 0).toFixed(2);

  // ===== Filters & Categories =====
  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === "All" || p.type === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchText.toLowerCase());
    const matchesFilterType = selectedFilter.type ? p.type === selectedFilter.type : true;
    const matchesFilterPrice = selectedFilter.maxPrice ? p.price <= selectedFilter.maxPrice : true;
    return matchesCategory && matchesSearch && matchesFilterType && matchesFilterPrice;
  });

  // ===== Product Details =====
  const openProductDetails = (item) => {
    setSelectedProduct({ ...item, qty: 1 });
    setProductModalVisible(true);
    closeProfile();
  };

  // ===== Render Product =====
  const renderCardProduct = ({ item }) => (
    <View style={[styles.card, { width: (width / 2) - 24 }]}>
      <TouchableOpacity 
        style={styles.heartBtn} 
        onPress={() => toggleLike(item.id)}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Ionicons 
          name={item.liked ? 'heart' : 'heart-outline'} 
          size={20} 
          color={item.liked ? '#FF6B6B' : '#666'} 
        />
      </TouchableOpacity>
      
      <View style={styles.productImageContainer}>
        <Text style={styles.productEmoji}>{item.image}</Text>
      </View>
      
      <TouchableOpacity onPress={() => openProductDetails(item)}>
        <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
      </TouchableOpacity>
      
      <Text style={styles.price}>{item.price} DT</Text>
      
      <TouchableOpacity 
        style={styles.orderBtn} 
        onPress={() => addToCart(item)}
      >
        <Text style={styles.orderText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );

  const renderListProduct = ({ item }) => (
    <TouchableOpacity 
      style={styles.listItem}
      onPress={() => openProductDetails(item)}
    >
      <View style={styles.listItemContent}>
        <View style={styles.productImageContainerSmall}>
          <Text style={styles.productEmojiSmall}>{item.image}</Text>
        </View>
        <View style={styles.listTextContainer}>
          <Text style={styles.listName}>{item.name}</Text>
          <Text style={styles.listType}>{item.type}</Text>
        </View>
      </View>
      <View style={styles.listRightContent}>
        <Text style={styles.listPrice}>{item.price} DT</Text>
        <TouchableOpacity 
          style={styles.listAddBtn}
          onPress={() => addToCart(item)}
        >
          <Ionicons name="add" size={16} color="#fff" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#F8F5F1" barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#5A3E2B" />
        </TouchableOpacity>
        <View>
          <Text style={styles.greeting}>Good Morning</Text>
          <Text style={styles.title}>{cafeName ? `${cafeName} Menu` : "Our Menu"}</Text>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => setSearchVisible(!searchVisible)}
          >
            <Ionicons name="search-outline" size={22} color="#5A3E2B" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => setIsGrid(!isGrid)}
          >
            <Ionicons name={isGrid ? 'list-outline' : 'grid-outline'} size={22} color="#5A3E2B" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => { closeProfile(); setCartVisible(true); }}
          >
            <Ionicons name="cart-outline" size={22} color="#5A3E2B" />
            {cart.length > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.badgeText}>{cart.length}</Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.iconButton}
            onPress={toggleProfile}
          >
            <Ionicons name="person-circle-outline" size={24} color="#5A3E2B" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      {searchVisible && (
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={18} color="#999" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for products..."
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor="#999"
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => setSearchText('')}>
              <Ionicons name="close-circle" size={18} color="#999" />
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Promotions Carousel */}
      <Animated.View 
        style={[
          styles.promoContainer,
          {
            transform: [{ translateX: slideAnim }],
            opacity: fadeAnim,
          }
        ]}
      >
        <View style={styles.promoContent}>
          <View style={styles.promoImageContainer}>
            <Text style={styles.promoEmoji}>{currentPromo.image}</Text>
          </View>
          <View style={styles.promoTextContainer}>
            <View style={styles.promoBadge}>
              <Text style={styles.promoBadgeText}>-{currentPromo.discount}% OFF</Text>
            </View>
            <Text style={styles.promoTitle}>Special Offer</Text>
            <Text style={styles.promoText}>{currentPromo.name}</Text>
            <View style={styles.promoPriceContainer}>
              <Text style={styles.promoOriginalPrice}>{currentPromo.price} DT</Text>
              <Text style={styles.promoDiscountedPrice}>
                {((currentPromo.price * (100 - currentPromo.discount)) / 100).toFixed(2)} DT
              </Text>
            </View>
          </View>
        </View>
        
        <View style={styles.promoIndicators}>
          {promotions.map((_, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.indicator,
                index === promoIndex.current && styles.activeIndicator
              ]}
              onPress={() => goToPromo(index)}
            />
          ))}
        </View>
      </Animated.View>

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <FlatList
          horizontal
          data={categories}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryBtn,
                selectedCategory === item && styles.categoryBtnActive,
              ]}
              onPress={() => setSelectedCategory(item)}
            >
              <Text style={[
                styles.categoryText,
                selectedCategory === item && styles.categoryTextActive
              ]}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      {/* Products Count */}
      <View style={styles.productsHeader}>
        <Text style={styles.productsCount}>
          {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
        </Text>
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => { closeProfile(); setFiltersVisible(true); }}
        >
          <Ionicons name="options-outline" size={18} color="#8B4513" />
          <Text style={styles.filterText}>Filters</Text>
        </TouchableOpacity>
      </View>

      {/* Product List */}
      <FlatList
        data={filteredProducts}
        key={isGrid ? "grid" : "list"}
        numColumns={isGrid ? 2 : 1}
        keyExtractor={(item) => item.id.toString()}
        renderItem={isGrid ? renderCardProduct : renderListProduct}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.productsList}
        style={styles.productsContainer}
      />

      {/* Product Details Modal */}
      <Modal visible={productModalVisible} transparent animationType="fade">
        <View style={styles.centerOverlay}>
          <View style={styles.productPopup}>
            {selectedProduct && (
              <>
                <TouchableOpacity
                  style={styles.detailsHeart}
                  onPress={() => toggleLike(selectedProduct.id)}
                >
                  <Ionicons
                    name={selectedProduct.liked ? 'heart' : 'heart-outline'}
                    size={24}
                    color={selectedProduct.liked ? '#FF6B6B' : '#666'}
                  />
                </TouchableOpacity>
                
                <View style={styles.productImageContainerLarge}>
                  <Text style={styles.productEmojiLarge}>{selectedProduct.image}</Text>
                </View>
                
                <Text style={styles.popupTitle}>{selectedProduct.name}</Text>
                <Text style={styles.popupType}>{selectedProduct.type}</Text>
                <Text style={styles.popupDescription}>
                  Enjoy our delicious {selectedProduct.name.toLowerCase()}. Made with premium ingredients and served fresh.
                </Text>
                
                <View style={styles.priceContainer}>
                  <Text style={styles.popupPrice}>{selectedProduct.price} DT</Text>
                </View>

                <View style={styles.quantityContainer}>
                  <Text style={styles.quantityLabel}>Quantity</Text>
                  <View style={styles.quantityRow}>
                    <TouchableOpacity
                      style={styles.qtyBtn}
                      onPress={() => setSelectedProduct({ ...selectedProduct, qty: Math.max(selectedProduct.qty - 1, 1) })}
                    >
                      <Text style={styles.qtyText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.qtyNumber}>{selectedProduct.qty}</Text>
                    <TouchableOpacity
                      style={styles.qtyBtn}
                      onPress={() => setSelectedProduct({ ...selectedProduct, qty: selectedProduct.qty + 1 })}
                    >
                      <Text style={styles.qtyText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.addToCartBtn}
                  onPress={() => {
                    addToCart(selectedProduct);
                    setProductModalVisible(false);
                  }}
                >
                  <Ionicons name="cart" size={18} color="#fff" style={{ marginRight: 8 }} />
                  <Text style={styles.addToCartText}>Add to Cart - {(selectedProduct.price * selectedProduct.qty).toFixed(2)} DT</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.closeBtn} 
                  onPress={() => setProductModalVisible(false)}
                >
                  <Text style={styles.closeText}>Maybe later</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Profile Panel - Only shows when profile button is clicked */}
      {profileVisible && (
        <TouchableOpacity 
          style={styles.overlay} 
          activeOpacity={1} 
          onPress={closeProfile} 
        />
      )}
      <Animated.View style={[styles.profilePanel, { right: profileSlideAnim }]}>
        <View style={styles.profileHeader}>
          <Text style={styles.profileTitle}>My Profile</Text>
          <TouchableOpacity onPress={closeProfile}>
            <Ionicons name="close" size={24} color="#5A3E2B" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.profileSection}>
          <TouchableOpacity
            style={styles.profileMenuItem}
            onPress={() => {
              setFavoritesVisible(true);
              closeProfile();
            }}
          >
            <Ionicons name="heart-outline" size={20} color="#8B4513" />
            <Text style={styles.profileMenuText}>My Favorites</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.profileMenuItem}>
            <Ionicons name="time-outline" size={20} color="#8B4513" />
            <Text style={styles.profileMenuText}>Order History</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.profileMenuItem}>
            <Ionicons name="settings-outline" size={20} color="#8B4513" />
            <Text style={styles.profileMenuText}>Settings</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.profileSection}>
          <Text style={styles.profileSectionTitle}>Our Cafes</Text>
          {products.filter(p => p.type === "Coffee").map(coffee => (
            <TouchableOpacity
              key={coffee.id}
              style={styles.profileMenuItem}
              onPress={() => {
                // Vous pouvez ajouter ici une navigation vers les détails du café ou une autre action
                console.log('Selected coffee:', coffee.name);
              }}
            >
              <Text style={styles.profileMenuText}>{coffee.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>

      {/* Favorites Modal */}
      <Modal visible={favoritesVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>My Favorites</Text>
              <TouchableOpacity onPress={() => setFavoritesVisible(false)}>
                <Ionicons name="close" size={24} color="#5A3E2B" />
              </TouchableOpacity>
            </View>
            
            {products.filter(p => p.liked).length === 0 ? (
              <View style={styles.emptyState}>
                <Ionicons name="heart-dislike" size={64} color="#D3D3D3" />
                <Text style={styles.emptyStateText}>No favorites yet</Text>
                <Text style={styles.emptyStateSubText}>Start adding products you love!</Text>
              </View>
            ) : (
              <FlatList
                data={products.filter(p => p.liked)}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                  <View style={styles.favoriteCard}>
                    <View style={styles.favoriteImageContainer}>
                      <Text style={styles.favoriteEmoji}>{item.image}</Text>
                    </View>
                    <View style={styles.favoriteInfo}>
                      <Text style={styles.favoriteName}>{item.name}</Text>
                      <Text style={styles.favoriteType}>{item.type}</Text>
                    </View>
                    <Text style={styles.favoritePrice}>{item.price} DT</Text>
                  </View>
                )}
                style={styles.favoritesList}
              />
            )}
          </View>
        </View>
      </Modal>

      {/* Cart Modal */}
      <Modal visible={cartVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>My Cart</Text>
              <TouchableOpacity onPress={() => setCartVisible(false)}>
                <Ionicons name="close" size={24} color="#5A3E2B" />
              </TouchableOpacity>
            </View>
            
            {cart.length === 0 ? (
              <View style={styles.emptyState}>
                <Ionicons name="cart-outline" size={64} color="#D3D3D3" />
                <Text style={styles.emptyStateText}>Your cart is empty</Text>
                <Text style={styles.emptyStateSubText}>Add some delicious items!</Text>
              </View>
            ) : (
              <>
                <FlatList
                  data={cart}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item, index }) => (
                    <View style={styles.cartItem}>
                      <View style={styles.cartImageContainer}>
                        <Text style={styles.cartEmoji}>{item.image}</Text>
                      </View>
                      <View style={styles.cartItemInfo}>
                        <Text style={styles.cartItemName}>{item.name}</Text>
                        <Text style={styles.cartItemPrice}>{item.price} DT x {item.qty}</Text>
                      </View>
                      <View style={styles.cartItemActions}>
                        <Text style={styles.cartItemTotal}>{(item.price * item.qty).toFixed(2)} DT</Text>
                        <TouchableOpacity 
                          onPress={() => removeFromCart(index)}
                          style={styles.removeBtn}
                        >
                          <Ionicons name="trash-outline" size={18} color="#FF6B6B" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                  style={styles.cartList}
                />
                <View style={styles.cartFooter}>
                  <View style={styles.totalContainer}>
                    <Text style={styles.totalLabel}>Total</Text>
                    <Text style={styles.totalPrice}>{getTotalPrice()} DT</Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.checkoutBtn}
                    onPress={startCheckout}
                  >
                    <Text style={styles.checkoutText}>Proceed to Checkout</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Checkout Process Modal */}
      <Modal visible={checkoutVisible} transparent animationType="fade">
        <View style={styles.centerOverlay}>
          <View style={styles.checkoutPopup}>
            <Text style={styles.checkoutTitle}>Order in Progress</Text>
            <Text style={styles.checkoutSubtitle}>Your order is being processed</Text>
            
            {/* Progress Steps */}
            <View style={styles.progressContainer}>
              {checkoutSteps.map((step, index) => (
                <View key={index} style={styles.stepContainer}>
                  <View style={styles.stepLine}>
                    {index > 0 && (
                      <View 
                        style={[
                          styles.line,
                          index <= currentStep && styles.lineActive
                        ]} 
                      />
                    )}
                  </View>
                  
                  <View style={styles.stepContent}>
                    <View 
                      style={[
                        styles.stepCircle,
                        index <= currentStep ? styles.stepCircleActive : styles.stepCircleInactive
                      ]}
                    >
                      <Text style={[
                        styles.stepIcon,
                        index <= currentStep ? styles.stepIconActive : styles.stepIconInactive
                      ]}>
                        {step.icon}
                      </Text>
                    </View>
                    
                    <View style={styles.stepText}>
                      <Text style={[
                        styles.stepTitle,
                        index <= currentStep ? styles.stepTitleActive : styles.stepTitleInactive
                      ]}>
                        {step.title}
                      </Text>
                      <Text style={styles.stepDescription}>
                        {step.description}
                      </Text>
                    </View>
                  </View>
                  
                  <View style={styles.stepLine}>
                    {index < checkoutSteps.length - 1 && (
                      <View 
                        style={[
                          styles.line,
                          index < currentStep && styles.lineActive
                        ]} 
                      />
                    )}
                  </View>
                </View>
              ))}
            </View>

            {/* Progress Indicator */}
            <View style={styles.progressBarContainer}>
              <Text style={styles.progressText}>
                Step {currentStep + 1} of {checkoutSteps.length}
              </Text>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill,
                    { width: `${((currentStep + 1) / checkoutSteps.length) * 100}%` }
                  ]} 
                />
              </View>
            </View>

            {currentStep >= checkoutSteps.length - 1 ? (
              <TouchableOpacity 
                style={styles.completeBtn}
                onPress={() => {
                  setCheckoutVisible(false);
                  setCart([]);
                }}
              >
                <Text style={styles.completeText}>Done</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity 
                style={styles.trackBtn}
                onPress={() => setCheckoutVisible(false)}
              >
                <Text style={styles.trackText}>Track Order</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>

      {/* Filters Modal */}
      <Modal visible={filtersVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filters</Text>
              <TouchableOpacity onPress={() => setFiltersVisible(false)}>
                <Ionicons name="close" size={24} color="#5A3E2B" />
              </TouchableOpacity>
            </View>

            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Category</Text>
              {["None", "Coffee", "Drink", "Meals", "Dessert"].map(type => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.filterOption,
                    selectedFilter.type === (type === "None" ? null : type) && styles.filterOptionActive
                  ]}
                  onPress={() => {
                    const newType = type === "None" ? null : type;
                    setSelectedFilter({ ...selectedFilter, type: newType });
                  }}
                >
                  <Text style={[
                    styles.filterOptionText,
                    selectedFilter.type === (type === "None" ? null : type) && styles.filterOptionTextActive
                  ]}>
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Max Price</Text>
              {["None", 5, 7, 10, 15].map(price => (
                <TouchableOpacity
                  key={price}
                  style={[
                    styles.filterOption,
                    selectedFilter.maxPrice === (price === "None" ? null : price) && styles.filterOptionActive
                  ]}
                  onPress={() =>
                    setSelectedFilter({ ...selectedFilter, maxPrice: price === "None" ? null : price })
                  }
                >
                  <Text style={[
                    styles.filterOptionText,
                    selectedFilter.maxPrice === (price === "None" ? null : price) && styles.filterOptionTextActive
                  ]}>
                    {price === "None" ? "No limit" : `Under ${price} DT`}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.filterActions}>
              <TouchableOpacity 
                style={styles.resetButton}
                onPress={() => {
                  setSelectedFilter({ type: null, maxPrice: null });
                  setSelectedCategory("All");
                }}
              >
                <Text style={styles.resetText}>Reset Filters</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.applyButton}
                onPress={() => setFiltersVisible(false)}
              >
                <Text style={styles.applyText}>Apply Filters</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F8F5F1', 
    paddingTop: 60 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    zIndex: 10,
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 20,
  },
  greeting: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2D2D2D',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 8,
    marginLeft: 12,
    position: 'relative',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#2D2D2D',
  },
  // Promotions Section with Brown Theme
  promoContainer: {
    backgroundColor: '#8B4513',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  promoContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  promoImageContainer: {
    width: 60,
    height: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  promoEmoji: {
    fontSize: 28,
  },
  promoTextContainer: {
    flex: 1,
  },
  promoBadge: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  promoBadgeText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  },
  promoTitle: {
    color: '#FFE4B5',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  promoText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  promoPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  promoOriginalPrice: {
    color: '#FFE4B5',
    fontSize: 14,
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  promoDiscountedPrice: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  promoIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  indicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    marginHorizontal: 3,
  },
  activeIndicator: {
    backgroundColor: '#fff',
    width: 20,
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  categoriesList: {
    paddingHorizontal: 20,
  },
  categoryBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 25,
    marginRight: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  categoryBtnActive: {
    backgroundColor: '#8B4513',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  categoryTextActive: {
    color: '#fff',
  },
  productsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  productsCount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D2D2D',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  filterText: {
    fontSize: 14,
    color: '#8B4513',
    marginLeft: 6,
    fontWeight: '500',
  },
  productsContainer: {
    flex: 1,
  },
  productsList: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  // Product Cards with Images
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    margin: 4,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  heartBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 1,
  },
  productImageContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#F8F5F1',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  productImageContainerSmall: {
    width: 50,
    height: 50,
    backgroundColor: '#F8F5F1',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImageContainerLarge: {
    width: 120,
    height: 120,
    backgroundColor: '#F8F5F1',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  productEmoji: {
    fontSize: 32,
  },
  productEmojiSmall: {
    fontSize: 20,
  },
  productEmojiLarge: {
    fontSize: 48,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D2D2D',
    marginBottom: 8,
    textAlign: 'center',
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#8B4513',
    marginBottom: 12,
  },
  orderBtn: {
    backgroundColor: '#8B4513',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  orderText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  listItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  listTextContainer: {
    marginLeft: 12,
  },
  listName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D2D2D',
    marginBottom: 4,
  },
  listType: {
    fontSize: 12,
    color: '#666',
  },
  listRightContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#8B4513',
    marginRight: 12,
  },
  listAddBtn: {
    backgroundColor: '#8B4513',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '85%',
    paddingBottom: 34,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2D2D2D',
  },
  centerOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  productPopup: {
    backgroundColor: '#fff',
    width: '90%',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
  },
  detailsHeart: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  popupTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2D2D2D',
    marginBottom: 4,
    textAlign: 'center',
  },
  popupType: {
    fontSize: 14,
    color: '#8B4513',
    fontWeight: '600',
    marginBottom: 16,
  },
  popupDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  priceContainer: {
    marginBottom: 20,
  },
  popupPrice: {
    fontSize: 28,
    fontWeight: '700',
    color: '#8B4513',
  },
  quantityContainer: {
    width: '100%',
    marginBottom: 24,
  },
  quantityLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D2D2D',
    marginBottom: 12,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyBtn: {
    backgroundColor: '#F8F5F1',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#8B4513',
  },
  qtyNumber: {
    marginHorizontal: 20,
    fontSize: 20,
    fontWeight: '600',
    color: '#2D2D2D',
    minWidth: 40,
    textAlign: 'center',
  },
  addToCartBtn: {
    backgroundColor: '#8B4513',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    width: '100%',
    marginBottom: 12,
  },
  addToCartText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  closeBtn: {
    paddingVertical: 8,
  },
  closeText: {
    color: '#666',
    fontWeight: '500',
  },
  // Profile Panel
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  profilePanel: {
    position: 'absolute',
    top: 0,
    width: 300,
    bottom: 0,
    backgroundColor: '#fff',
    elevation: 10,
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  profileTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2D2D2D',
  },
  profileSection: {
    padding: 24,
  },
  profileMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F8F5F1',
  },
  profileMenuText: {
    fontSize: 16,
    color: '#2D2D2D',
    marginLeft: 16,
    fontWeight: '500',
  },
  // Favorites & Cart with Images
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  favoriteCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#F8F5F1',
  },
  favoriteImageContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#F8F5F1',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  favoriteEmoji: {
    fontSize: 18,
  },
  favoriteInfo: {
    flex: 1,
  },
  favoriteName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D2D2D',
    marginBottom: 4,
  },
  favoriteType: {
    fontSize: 12,
    color: '#666',
  },
  favoritePrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#8B4513',
  },
  favoritesList: {
    maxHeight: 400,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#F8F5F1',
  },
  cartImageContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#F8F5F1',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cartEmoji: {
    fontSize: 18,
  },
  cartItemInfo: {
    flex: 1,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D2D2D',
    marginBottom: 4,
  },
  cartItemPrice: {
    fontSize: 14,
    color: '#666',
  },
  cartItemActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartItemTotal: {
    fontSize: 16,
    fontWeight: '700',
    color: '#8B4513',
    marginRight: 16,
  },
  removeBtn: {
    padding: 4,
  },
  cartList: {
    maxHeight: 400,
  },
  cartFooter: {
    paddingHorizontal: 24,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D2D2D',
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: '700',
    color: '#8B4513',
  },
  checkoutBtn: {
    backgroundColor: '#8B4513',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  checkoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  // Checkout Process Styles
  checkoutPopup: {
    backgroundColor: '#fff',
    width: '90%',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
  },
  checkoutTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2D2D2D',
    marginBottom: 8,
    textAlign: 'center',
  },
  checkoutSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  progressContainer: {
    width: '100%',
    marginBottom: 30,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  stepLine: {
    width: 20,
    alignItems: 'center',
  },
  line: {
    width: 2,
    height: 40,
    backgroundColor: '#E5E5E5',
  },
  lineActive: {
    backgroundColor: '#8B4513',
  },
  stepContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  stepCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  stepCircleActive: {
    backgroundColor: '#8B4513',
  },
  stepCircleInactive: {
    backgroundColor: '#F8F5F1',
    borderWidth: 2,
    borderColor: '#E5E5E5',
  },
  stepIcon: {
    fontSize: 18,
  },
  stepIconActive: {
    color: '#fff',
  },
  stepIconInactive: {
    color: '#999',
  },
  stepText: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  stepTitleActive: {
    color: '#2D2D2D',
  },
  stepTitleInactive: {
    color: '#999',
  },
  stepDescription: {
    fontSize: 12,
    color: '#666',
  },
  progressBarContainer: {
    width: '100%',
    marginBottom: 30,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    textAlign: 'center',
  },
  progressBar: {
    width: '100%',
    height: 6,
    backgroundColor: '#F0F0F0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#8B4513',
    borderRadius: 3,
  },
  completeBtn: {
    backgroundColor: '#8B4513',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  completeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  trackBtn: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  trackText: {
    color: '#8B4513',
    fontSize: 14,
    fontWeight: '500',
  },
  // Filters
  filterSection: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F8F5F1',
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D2D2D',
    marginBottom: 16,
  },
  filterOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#F8F5F1',
  },
  filterOptionActive: {
    backgroundColor: '#8B4513',
  },
  filterOptionText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  filterOptionTextActive: {
    color: '#fff',
  },
  filterActions: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  resetButton: {
    flex: 1,
    paddingVertical: 16,
    backgroundColor: '#F8F5F1',
    borderRadius: 12,
    alignItems: 'center',
    marginRight: 12,
  },
  resetText: {
    color: '#666',
    fontWeight: '600',
  },
  applyButton: {
    flex: 1,
    paddingVertical: 16,
    backgroundColor: '#8B4513',
    borderRadius: 12,
    alignItems: 'center',
    marginLeft: 12,
  },
  applyText: {
    color: '#fff',
    fontWeight: '600',
  },
  // Badge
  cartBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#FF6B6B',
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});