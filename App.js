import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, Button } from 'react-native';

// Import des écrans
import LoginScreen from './screens/LoginScreen';
import SigninScreen from './screens/SigninScreen';
import ForgetPasswordScreen from './screens/ForgetPasswordScreen';
// Tu peux ajouter MenuScreen plus tard quand il sera prêt

// Écran d'accueil (Splash-like)
function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue sur CoffeeShop App !</Text>
      <Button
        title="Commencer"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signin" component={SigninScreen} />
        <Stack.Screen name="ForgetPassword" component={ForgetPasswordScreen} />
        {/* Ajoute d'autres écrans ici plus tard, ex: Menu */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});