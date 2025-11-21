import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert, Linking } from 'react-native';
import { CameraView } from 'expo-camera';


export default function QRScannerScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  // Demande d'autorisation caméra
  useEffect(() => {
    (async () => {
      const { status } = await CameraView.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // Gestion du scan QR
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);

    Alert.alert(
      'QR Code scanné',
      `Données : ${data}`,
      [
        {
          text: 'Ouvrir dans navigateur',
          onPress: () => Linking.openURL(data).catch(err => console.warn(err))
        },
        {
          text: 'Ouvrir dans l\'app',
          onPress: () => {
            // Deep link vers l'app
            const id = new URL(data).pathname.split("/")[2];
            Linking.openURL(`coffeeshop://menu?caferestoId=${id}`).catch(err => console.warn(err));
          }
        },
        { text: 'Annuler', style: 'cancel' }
      ],
      { cancelable: true }
    );
  };

  if (hasPermission === null) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>Demande d'autorisation de la caméra...</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>Accès caméra refusé.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      />

      {scanned && (
        <View style={styles.buttonContainer}>
          <Button title="Scanner à nouveau" onPress={() => setScanned(false)} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  permissionText: {
    fontSize: 18,
    textAlign: 'center',
  },
});