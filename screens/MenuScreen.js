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
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function MenuScreen() {
  const { width } = Dimensions.get("window");

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
  const [reservationVisible, setReservationVisible] = useState(false);
  const [reclamationVisible, setReclamationVisible] = useState(false);
  const [profileModalVisible, setProfileModalVisible] = useState(false);

  // Fidelity points states
  const [clientInfo, setClientInfo] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+216 12 345 678",
    points: 150,
    memberSince: "2024-01-15",
    membershipLevel: "Gold",
    totalOrders: 8,
    totalSpent: 125.50
  });

  const [pointsHistory, setPointsHistory] = useState([
    { id: 1, date: "2024-03-15", description: "Order #001 - Cappuccino & Burger", points: 50, type: "earned", orderTotal: 13.5 },
    { id: 2, date: "2024-03-10", description: "Order #002 - Latte & Cookie", points: 30, type: "earned", orderTotal: 8.5 },
    { id: 3, date: "2024-03-05", description: "Welcome Bonus", points: 50, type: "earned", orderTotal: 0 },
    { id: 4, date: "2024-02-28", description: "Redeemed - Free Coffee", points: -25, type: "redeemed", orderTotal: 0 },
    { id: 5, date: "2024-02-20", description: "Order #003 - Pizza & Coke", points: 45, type: "earned", orderTotal: 12.0 },
    { id: 6, date: "2024-02-15", description: "Order #004 - Americano & Sandwich", points: 35, type: "earned", orderTotal: 11.0 },
    { id: 7, date: "2024-02-10", description: "Birthday Bonus", points: 25, type: "earned", orderTotal: 0 },
  ]);

  // Reservation states
  const [reservationData, setReservationData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    guests: "2",
    specialRequests: "",
    tableType: "indoor"
  });

  // Reclamation states
  const [reclamationData, setReclamationData] = useState({
    name: "",
    email: "",
    phone: "",
    orderNumber: "",
    reclamationType: "product_quality",
    subject: "",
    description: "",
    urgency: "medium",
    attachments: [],
    preferredContact: "email"
  });

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

  // ===== Fidelity Points Functions =====
  const calculatePoints = (totalAmount) => {
    // 1 point for every 0.16 DT spent (approximately 6.25 DT = 100 points)
    const points = Math.floor(totalAmount / 0.16);
    return points;
  };

  const addPointsFromOrder = (orderTotal) => {
    const earnedPoints = calculatePoints(orderTotal);
    const newHistory = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      description: `Order #${Math.floor(Math.random() * 1000)} - ${cart.map(item => item.name).join(', ')}`,
      points: earnedPoints,
      type: "earned",
      orderTotal: orderTotal
    };
    
    setPointsHistory(prev => [newHistory, ...prev]);
    setClientInfo(prev => ({
      ...prev,
      points: prev.points + earnedPoints,
      totalOrders: prev.totalOrders + 1,
      totalSpent: prev.totalSpent + orderTotal
    }));
    
    return earnedPoints;
  };

  const getMembershipLevel = (points) => {
    if (points >= 500) return { level: "Platinum", color: "#E5E4E2", discount: 15 };
    if (points >= 250) return { level: "Gold", color: "#FFD700", discount: 10 };
    if (points >= 100) return { level: "Silver", color: "#C0C0C0", discount: 5 };
    return { level: "Bronze", color: "#CD7F32", discount: 0 };
  };

  // ===== Reclamation Functions =====
  const handleReclamationSubmit = () => {
    console.log("Reclamation submitted:", reclamationData);
    alert(`Reclamation submitted successfully!\n\nWe have received your complaint and will get back to you within 24 hours.\n\nReference Number: #${Math.random().toString(36).substr(2, 9).toUpperCase()}`);
    setReclamationVisible(false);
    setReclamationData({
      name: "",
      email: "",
      phone: "",
      orderNumber: "",
      reclamationType: "product_quality",
      subject: "",
      description: "",
      urgency: "medium",
      attachments: [],
      preferredContact: "email"
    });
  };

  // ===== Reservation Functions =====
  const handleReservationSubmit = () => {
    console.log("Reservation submitted:", reservationData);
    alert(`Reservation confirmed!\n\nName: ${reservationData.name}\nDate: ${reservationData.date}\nTime: ${reservationData.time}\nGuests: ${reservationData.guests}\nTable: ${reservationData.tableType}`);
    setReservationVisible(false);
    setReservationData({
      name: "",
      phone: "",
      email: "",
      date: "",
      time: "",
      guests: "2",
      specialRequests: "",
      tableType: "indoor"
    });
  };

  // ===== Checkout Process =====
  const startCheckout = () => {
    const totalAmount = parseFloat(getTotalPrice());
    const earnedPoints = addPointsFromOrder(totalAmount);
    
    setCheckoutVisible(true);
    setCurrentStep(0);
    setCartVisible(false);
    
    // Show points earned alert
    setTimeout(() => {
      alert(`🎉 Congratulations!\nYou earned ${earnedPoints} fidelity points from this order!\nTotal spent: ${totalAmount} DT`);
    }, 1000);
    
    // Simulate checkout process
    const timer = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= checkoutSteps.length - 1) {
          clearInterval(timer);
          // Clear cart after successful checkout
          setTimeout(() => {
            setCart([]);
          }, 1000);
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

  // ===== Render Points History Item =====
  const renderPointsHistory = ({ item }) => (
    <View style={styles.pointsHistoryItem}>
      <View style={styles.pointsHistoryLeft}>
        <Text style={styles.pointsDescription}>{item.description}</Text>
        <Text style={styles.pointsDate}>{item.date}</Text>
        {item.orderTotal > 0 && (
          <Text style={styles.orderTotal}>Order: {item.orderTotal} DT</Text>
        )}
      </View>
      <View style={[
        styles.pointsAmount,
        item.type === 'earned' ? styles.pointsEarned : styles.pointsRedeemed
      ]}>
        <Text style={styles.pointsAmountText}>
          {item.type === 'earned' ? '+' : ''}{item.points}
        </Text>
        <Text style={styles.pointsLabel}>points</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#F8F5F1" barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good Morning</Text>
          <Text style={styles.title}>Our Menu</Text>
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
          {/* Profile Info Menu Item */}
          <TouchableOpacity 
            style={styles.profileMenuItem}
            onPress={() => {
              setProfileModalVisible(true);
              closeProfile();
            }}
          >
            <Ionicons name="person-outline" size={20} color="#8B4513" />
            <Text style={styles.profileMenuText}>My Profile & Points</Text>
            <View style={styles.pointsBadge}>
              <Text style={styles.pointsBadgeText}>{clientInfo.points}</Text>
            </View>
          </TouchableOpacity>
          
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
          
          <TouchableOpacity 
            style={styles.profileMenuItem}
            onPress={() => {
              setReservationVisible(true);
              closeProfile();
            }}
          >
            <Ionicons name="calendar-outline" size={20} color="#8B4513" />
            <Text style={styles.profileMenuText}>Table Reservation</Text>
          </TouchableOpacity>

          {/* Reclamation Menu Item */}
          <TouchableOpacity 
            style={styles.profileMenuItem}
            onPress={() => {
              setReclamationVisible(true);
              closeProfile();
            }}
          >
            <Ionicons name="warning-outline" size={20} color="#8B4513" />
            <Text style={styles.profileMenuText}>Submit Reclamation</Text>
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
      </Animated.View>

      {/* Profile & Points Modal */}
      <Modal visible={profileModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, styles.profilePointsModal]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>My Profile & Points</Text>
              <TouchableOpacity onPress={() => setProfileModalVisible(false)}>
                <Ionicons name="close" size={24} color="#5A3E2B" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.profilePointsContent} showsVerticalScrollIndicator={false}>
              {/* Client Information */}
              <View style={styles.clientInfoSection}>
                <View style={styles.clientHeader}>
                  <View style={styles.avatarContainer}>
                    <Text style={styles.avatarText}>{clientInfo.name.split(' ').map(n => n[0]).join('')}</Text>
                  </View>
                  <View style={styles.clientBasicInfo}>
                    <Text style={styles.clientName}>{clientInfo.name}</Text>
                    <Text style={styles.clientEmail}>{clientInfo.email}</Text>
                    <Text style={styles.clientPhone}>{clientInfo.phone}</Text>
                  </View>
                </View>
                
                <View style={styles.clientStats}>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{clientInfo.totalOrders}</Text>
                    <Text style={styles.statLabel}>Total Orders</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{clientInfo.totalSpent} DT</Text>
                    <Text style={styles.statLabel}>Total Spent</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{clientInfo.memberSince}</Text>
                    <Text style={styles.statLabel}>Member Since</Text>
                  </View>
                </View>
              </View>

              {/* Points Summary */}
              <View style={styles.pointsSummary}>
                <View style={styles.pointsHeader}>
                  <Text style={styles.pointsTitle}>Fidelity Points</Text>
                  <View style={[
                    styles.membershipBadge,
                    { backgroundColor: getMembershipLevel(clientInfo.points).color }
                  ]}>
                    <Text style={styles.membershipText}>{getMembershipLevel(clientInfo.points).level}</Text>
                  </View>
                </View>
                
                <View style={styles.pointsDisplay}>
                  <Text style={styles.totalPoints}>{clientInfo.points}</Text>
                  <Text style={styles.pointsLabel}>Total Points</Text>
                </View>
                
                <View style={styles.pointsInfo}>
                  <View style={styles.pointsInfoItem}>
                    <Ionicons name="star" size={16} color="#FFD700" />
                    <Text style={styles.pointsInfoText}>
                      {getMembershipLevel(clientInfo.points).discount}% discount on all orders
                    </Text>
                  </View>
                  <View style={styles.pointsInfoItem}>
                    <Ionicons name="gift" size={16} color="#8B4513" />
                    <Text style={styles.pointsInfoText}>
                      100 points = Free coffee | 250 points = Free meal
                    </Text>
                  </View>
                  <View style={styles.pointsInfoItem}>
                    <Ionicons name="calculator" size={16} color="#4CAF50" />
                    <Text style={styles.pointsInfoText}>
                      Earn 1 point for every 0.16 DT spent
                    </Text>
                  </View>
                </View>
              </View>

              {/* Points History */}
              <View style={styles.pointsHistorySection}>
                <Text style={styles.sectionTitle}>Points History</Text>
                {pointsHistory.length === 0 ? (
                  <View style={styles.emptyHistory}>
                    <Ionicons name="time-outline" size={48} color="#D3D3D3" />
                    <Text style={styles.emptyHistoryText}>No points history yet</Text>
                    <Text style={styles.emptyHistorySubText}>Make your first order to start earning points!</Text>
                  </View>
                ) : (
                  <FlatList
                    data={pointsHistory}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderPointsHistory}
                    scrollEnabled={false}
                    style={styles.pointsHistoryList}
                  />
                )}
              </View>

              {/* How to Earn Points */}
              <View style={styles.howToEarnSection}>
                <Text style={styles.sectionTitle}>How to Earn Points</Text>
                <View style={styles.earningTips}>
                  <View style={styles.tipItem}>
                    <Ionicons name="cart" size={20} color="#8B4513" />
                    <Text style={styles.tipText}>1 point for every 0.16 DT spent</Text>
                  </View>
                  <View style={styles.tipItem}>
                    <Ionicons name="calendar" size={20} color="#8B4513" />
                    <Text style={styles.tipText}>25 points on your birthday</Text>
                  </View>
                  <View style={styles.tipItem}>
                    <Ionicons name="star" size={20} color="#8B4513" />
                    <Text style={styles.tipText}>50 points welcome bonus</Text>
                  </View>
                  <View style={styles.tipItem}>
                    <Ionicons name="share-social" size={20} color="#8B4513" />
                    <Text style={styles.tipText}>Refer friends for 100 points each</Text>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Reclamation Modal */}
      <Modal visible={reclamationVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, styles.reclamationModal]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Submit Reclamation</Text>
              <TouchableOpacity onPress={() => setReclamationVisible(false)}>
                <Ionicons name="close" size={24} color="#5A3E2B" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.reclamationForm} showsVerticalScrollIndicator={false}>
              {/* ... reclamation form content ... */}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Reservation Modal */}
      <Modal visible={reservationVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, styles.reservationModal]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Table Reservation</Text>
              <TouchableOpacity onPress={() => setReservationVisible(false)}>
                <Ionicons name="close" size={24} color="#5A3E2B" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.reservationForm} showsVerticalScrollIndicator={false}>
              {/* ... reservation form content ... */}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Favorites Modal */}
      <Modal visible={favoritesVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* ... favorites content ... */}
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
                  
                  {/* Points Calculation Display */}
                  <View style={styles.pointsPreview}>
                    <Ionicons name="star" size={16} color="#FFD700" />
                    <Text style={styles.pointsPreviewText}>
                      You'll earn {calculatePoints(parseFloat(getTotalPrice()))} points from this order
                    </Text>
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
            {/* ... filters content ... */}
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
  profilePointsModal: {
    maxHeight: '90%',
  },
  reservationModal: {
    maxHeight: '90%',
  },
  reclamationModal: {
    maxHeight: '90%',
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
    flex: 1,
  },
  pointsBadge: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  pointsBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#8B4513',
  },
  // Profile & Points Styles
  profilePointsContent: {
    padding: 24,
  },
  clientInfoSection: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  clientHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    backgroundColor: '#8B4513',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  clientBasicInfo: {
    flex: 1,
  },
  clientName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D2D2D',
    marginBottom: 4,
  },
  clientEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  clientPhone: {
    fontSize: 14,
    color: '#666',
  },
  clientStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  pointsSummary: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  pointsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  pointsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D2D2D',
  },
  membershipBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  membershipText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  pointsDisplay: {
    alignItems: 'center',
    marginBottom: 20,
  },
  totalPoints: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 8,
  },
  pointsLabel: {
    fontSize: 16,
    color: '#666',
  },
  pointsInfo: {
    gap: 12,
  },
  pointsInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointsInfoText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 12,
    flex: 1,
  },
  pointsHistorySection: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D2D2D',
    marginBottom: 16,
  },
  pointsHistoryList: {
    maxHeight: 300,
  },
  pointsHistoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F8F5F1',
  },
  pointsHistoryLeft: {
    flex: 1,
  },
  pointsDescription: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D2D2D',
    marginBottom: 4,
  },
  pointsDate: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  orderTotal: {
    fontSize: 11,
    color: '#8B4513',
  },
  pointsAmount: {
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    minWidth: 80,
  },
  pointsEarned: {
    backgroundColor: '#E8F5E8',
  },
  pointsRedeemed: {
    backgroundColor: '#FFE8E8',
  },
  pointsAmountText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  pointsEarned: {
    backgroundColor: '#E8F5E8',
  },
  pointsRedeemed: {
    backgroundColor: '#FFE8E8',
  },
  pointsAmountText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  pointsEarned: {
    backgroundColor: '#E8F5E8',
  },
  pointsRedeemed: {
    backgroundColor: '#FFE8E8',
  },
  pointsAmountText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  pointsEarned: {
    backgroundColor: '#E8F5E8',
  },
  pointsRedeemed: {
    backgroundColor: '#FFE8E8',
  },
  pointsAmountText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  pointsLabel: {
    fontSize: 12,
    color: '#666',
  },
  emptyHistory: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyHistoryText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyHistorySubText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  howToEarnSection: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  earningTips: {
    gap: 12,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 12,
    flex: 1,
  },
  // Cart Points Preview
  pointsPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF9E6',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#FFD700',
  },
  pointsPreviewText: {
    fontSize: 14,
    color: '#8B4513',
    fontWeight: '600',
    marginLeft: 8,
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
    marginBottom: 16,
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