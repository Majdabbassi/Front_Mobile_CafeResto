import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.1.77:8080/api/products';

const getAllProducts = async () => {
  try {
    const userToken = await AsyncStorage.getItem('userToken');
    const response = await fetch(`${API_URL}`, {
      headers: {
        'Authorization': `Bearer ${userToken}`,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export default {
  getAllProducts,
};