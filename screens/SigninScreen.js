// screens/SigninScreen.js
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
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import authService from '../api/authService';

const SigninScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    console.log('handleSignup function called');
    if (!email || !username || !password || !confirmPassword) {
      console.log('Validation: Missing fields');
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }
    if (password !== confirmPassword) {
      console.log('Validation: Passwords do not match');
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas.');
      return;
    }
    setLoading(true);
    try {
      const clientData = { email, username, password };
      console.log('Attempting to register with clientData:', clientData);
      await authService.register(clientData);
      console.log('Registration successful');
      Alert.alert('Succès', 'Inscription réussie ! Vous pouvez vous connecter.');
      navigation.navigate('Home');
    } catch (err) {
      console.error('Registration error:', err);
      Alert.alert('Erreur', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Overlay gradient */}
      <LinearGradient
        colors={['rgba(58, 42, 35, 0.85)', 'rgba(101, 67, 33, 0.75)']}
        style={styles.overlay}
      />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Logo/Icône Café */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.brandName}>Mon Café</Text>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.title}>Rejoignez-nous</Text>
          <Text style={styles.subtitle}>Créez votre compte café</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputIcon}>✉️</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#A0826D"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputIcon}>👤</Text>
            <TextInput
              style={styles.input}
              placeholder="Nom d'utilisateur"
              placeholderTextColor="#A0826D"
              value={username}
              onChangeText={setUsername}
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

          <View style={styles.inputContainer}>
            <Text style={styles.inputIcon}>✓</Text>
            <TextInput
              style={styles.input}
              placeholder="Confirmer le mot de passe"
              placeholderTextColor="#A0826D"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
          </View>

          {loading ? (
            <ActivityIndicator size="large" color="#6F4E37" style={styles.loader} />
          ) : (
            <TouchableOpacity 
              style={styles.button} 
              onPress={handleSignup}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#6F4E37', '#8B6F47']}
                style={styles.buttonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.buttonText}>S'inscrire</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Déjà membre ?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}>Se connecter</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    position: 'relative',
    marginBottom: 32,
  },
  backButton: {
    position: 'absolute',
    left: 0,
    padding: 10,
  },
  brandName: {
    fontSize: 28,
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
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F5F0',
    borderRadius: 12,
    marginBottom: 14,
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
  loginLink: {
    color: '#FFD700',
    fontSize: 15,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default SigninScreen;