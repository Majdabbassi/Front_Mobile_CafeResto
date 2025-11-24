import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, ScrollView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function EffectuerReservationScreen({ navigation }) {
  const route = useRoute();
  const { cafeId, cafeName } = route.params || {};

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [numberOfGuests, setNumberOfGuests] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const onChangeTime = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(Platform.OS === 'ios');
    setTime(currentTime);
  };

  const handleReservation = () => {
    if (!date || !time || !numberOfGuests || !customerName || !phoneNumber) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }

    Alert.alert(
      'Réservation Confirmée',
      `Café: ${cafeName}
Date: ${date.toLocaleDateString()}
Heure: ${time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
Personnes: ${numberOfGuests}
Nom: ${customerName}
Téléphone: ${phoneNumber}`,
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#3A2A23" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Réserver chez {cafeName || 'un café'}</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Date de réservation</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
          <Text>{date.toLocaleDateString()}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            testID="datePicker"
            value={date}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        )}

        <Text style={styles.label}>Heure de réservation</Text>
        <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.input}>
          <Text>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
        </TouchableOpacity>
        {showTimePicker && (
          <DateTimePicker
            testID="timePicker"
            value={time}
            mode="time"
            display="default"
            onChange={onChangeTime}
          />
        )}

        <Text style={styles.label}>Nombre de personnes</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Ex: 2"
          value={numberOfGuests}
          onChangeText={setNumberOfGuests}
        />

        <Text style={styles.label}>Votre nom</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: John Doe"
          value={customerName}
          onChangeText={setCustomerName}
        />

        <Text style={styles.label}>Numéro de téléphone</Text>
        <TextInput
          style={styles.input}
          keyboardType="phone-pad"
          placeholder="Ex: +216 12 345 678"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />

        <TouchableOpacity style={styles.reserveButton} onPress={handleReservation}>
          <Text style={styles.reserveButtonText}>Confirmer la réservation</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F5F0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: '#F9F5F0',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    paddingTop: 50, // Adjust for status bar
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3A2A23',
    marginLeft: 10,
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3A2A23',
    marginBottom: 8,
    marginTop: 15,
  },
  input: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    color: '#3A2A23',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  reserveButton: {
    backgroundColor: '#D84315',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
    shadowColor: '#D84315',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  reserveButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
