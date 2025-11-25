// screens/LoginScreen.js
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import authService from '../api/authService';

const LoginScreen = ({ navigation }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // Bypass backend authentication for testing purposes
    console.log("Bypassing login for:", { login, password });
    Alert.alert('Succès', 'Connexion réussie (mode développeur) !');
    navigation.replace('Home', { user: { username: login } });
  };

  return (
    <View style={styles.container}>
      {/* Overlay gradient pour l'effet café */}
      <LinearGradient
        colors={['rgba(58, 42, 35, 0.85)', 'rgba(101, 67, 33, 0.75)']}
        style={styles.overlay}
      />
      
      <View style={styles.content}>
        {/* Logo/Icône Café */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.brandName}>Mon Café</Text>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.title}>Bienvenue</Text>
          <Text style={styles.subtitle}>Connectez-vous pour continuer</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputIcon}>👤</Text>
            <TextInput
              style={styles.input}
              placeholder="Nom d'utilisateur ou email"
              placeholderTextColor="#A0826D"
              value={login}
              onChangeText={setLogin}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputIcon}>🔒</Text>
            <TextInput
              style={styles.input}
              placeholder="Mot de passe"
              placeholderTextColor="#A0826D"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          
            <TouchableOpacity 
              style={styles.button} 
              onPress={handleLogin}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#6F4E37', '#8B6F47']}
                style={styles.buttonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.buttonText}>Se connecter</Text>
              </LinearGradient>
            </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('Serveur')}
            activeOpacity={0.8}
          >
            <Ionicons name="people-circle-outline" size={20} color="#8B6F47" />
            <Text style={styles.secondaryButtonText}>Espace Serveur</Text>
            <Ionicons name="arrow-forward" size={16} color="#8B6F47" />
          </TouchableOpacity>
          

          <TouchableOpacity 
            onPress={() => navigation.navigate('ForgetPassword')}
            style={styles.linkButton}
          >
            <Text style={styles.link}>Mot de passe oublié ?</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Nouveau client ?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
            <Text style={styles.signupLink}>Créer un compte</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

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
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    position: 'relative',
    marginBottom: 40,
  },
  backButton: {
    position: 'absolute',
    left: 0,
    padding: 10,
  },
  brandName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    textAlign: 'center',
    flex: 1,
  },
  formCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 24,
    padding: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3A2A23',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#8B6F47',
    textAlign: 'center',
    marginBottom: 28,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F5F0',
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#E8DCC8',
    paddingLeft: 12,
  },
  inputIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  input: {
    flex: 1,
    padding: 14,
    fontSize: 16,
    color: '#3A2A23',
  },
  loader: {
    marginVertical: 20,
  },
  button: {
    borderRadius: 12,
    marginTop: 8,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#6F4E37',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#8B6F47',
    paddingVertical: 14,
    marginBottom: 12,
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  secondaryButtonText: {
    color: '#8B6F47',
    fontSize: 16,
    fontWeight: '700',
  },
  linkButton: {
    alignItems: 'center',
  },
  link: {
    color: '#6F4E37',
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    gap: 6,
  },
  footerText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '500',
  },
  signupLink: {
    color: '#FFD700',
    fontSize: 15,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
