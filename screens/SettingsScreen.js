import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function SettingsScreen() {
  const navigation = useNavigation();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);

  const handleLogout = () => {
    // Ici, vous pouvez ajouter la logique de déconnexion, par exemple, effacer le token d'authentification
    // AsyncStorage.clear(); ou authService.logout();
    navigation.navigate('Menu'); // Redirige vers la page 'Menu'
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#3A2A23" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Paramètres</Text>
      </View>

      <View style={styles.settingsSection}>
        <Text style={styles.sectionTitle}>Général</Text>
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingText}>Langue</Text>
          <Ionicons name="chevron-forward" size={20} color="#8B6F47" />
        </TouchableOpacity>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Notifications</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#8B6F47" }}
            thumbColor={notificationsEnabled ? "#5A3E2B" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => setNotificationsEnabled(previousState => !previousState)}
            value={notificationsEnabled}
          />
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Mode Sombre</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#8B6F47" }}
            thumbColor={darkModeEnabled ? "#5A3E2B" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => setDarkModeEnabled(previousState => !previousState)}
            value={darkModeEnabled}
          />
        </View>
      </View>

      <View style={styles.settingsSection}>
        <Text style={styles.sectionTitle}>Compte</Text>
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingText}>Modifier le profil</Text>
          <Ionicons name="chevron-forward" size={20} color="#8B6F47" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingText}>Changer le mot de passe</Text>
          <Ionicons name="chevron-forward" size={20} color="#8B6F47" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingText}>Supprimer le compte</Text>
          <Ionicons name="chevron-forward" size={20} color="#D32F2F" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Déconnexion</Text>
      </TouchableOpacity>
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
  settingsSection: {
    backgroundColor: '#FFF',
    marginHorizontal: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5A3E2B',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  settingText: {
    fontSize: 16,
    color: '#3A2A23',
  },
  logoutButton: {
    backgroundColor: '#D32F2F',
    marginHorizontal: 15,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#D32F2F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  logoutButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});