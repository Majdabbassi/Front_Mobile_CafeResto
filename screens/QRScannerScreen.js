import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { CameraView } from 'expo-camera';

export default function QRScannerScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await CameraView.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Code QR de type ${type} et de données ${data} a été scanné !`);
    // Naviguer vers MenuScreen après le scan
    navigation.navigate('Menu');
  };

  if (hasPermission === null) {
    return <Text>Demande d'autorisation de la caméra</Text>;
  }
  if (hasPermission === false) {
    return <Text>Pas d'accès à la caméra</Text>;
  }

  return (
    <View style={styles.container}>
      <CameraView
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Appuyez pour scanner à nouveau'} onPress={() => setScanned(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});