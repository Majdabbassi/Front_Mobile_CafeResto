// App.js
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Import des écrans
import LoginScreen from './screens/LoginScreen';
import SigninScreen from './screens/SigninScreen';
import ForgetPasswordScreen from './screens/ForgetPasswordScreen';
import MenuScreen from './screens/MenuScreen';
import HomeScreen from './screens/HomeScreen';
import LikesScreen from './screens/LikesScreen';
import SettingsScreen from './screens/SettingsScreen';
import ProfileScreen from './screens/ProfileScreen';
import HistoryScreen from './screens/HistoryScreen';
import QRScannerScreen from './screens/QRScannerScreen';

// Écran d'accueil (Splash-like)
function InitialWelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Overlay gradient */}
      <LinearGradient
        colors={['rgba(58, 42, 35, 0.9)', 'rgba(101, 67, 33, 0.8)']}
        style={styles.overlay}
      />
      
      <View style={styles.content}>
        {/* Animation café */}
        <View style={styles.logoContainer}>
          <Text style={styles.steamIcon}>☁️</Text>
          <Text style={styles.coffeeIcon}>☕</Text>
          <Text style={styles.brandName}>CoffeeShop</Text>
          <Text style={styles.tagline}>Votre café, où vous voulez</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('Login')}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#6F4E37', '#8B6F47']}
              style={styles.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.buttonText}>Commencer</Text>
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.features}>
            <View style={styles.feature}>
              <Text style={styles.featureIcon}>🌟</Text>
              <Text style={styles.featureText}>Meilleurs cafés</Text>
            </View>
            <View style={styles.feature}>
              <Text style={styles.featureIcon}>🚀</Text>
              <Text style={styles.featureText}>Livraison rapide</Text>
            </View>
            <View style={styles.feature}>
              <Text style={styles.featureIcon}>💝</Text>
              <Text style={styles.featureText}>Offres exclusives</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="InitialWelcome" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="InitialWelcome" component={InitialWelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signin" component={SigninScreen} />
        <Stack.Screen name="ForgetPassword" component={ForgetPasswordScreen} />
        <Stack.Screen name="QRScanner" component={QRScannerScreen} />
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Likes" component={LikesScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5E6D3',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 24,
    paddingTop: 100,
    paddingBottom: 60,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  steamIcon: {
    fontSize: 32,
    marginBottom: -10,
    opacity: 0.7,
  },
  coffeeIcon: {
    fontSize: 120,
    marginBottom: 20,
  },
  brandName: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#FFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 18,
    color: '#FFD700',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  buttonContainer: {
    gap: 32,
  },
  button: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  buttonGradient: {
    paddingVertical: 18,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  features: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  feature: {
    alignItems: 'center',
    flex: 1,
  },
  featureIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  featureText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
});