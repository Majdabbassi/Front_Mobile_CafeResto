import AsyncStorage from '@react-native-async-storage/async-storage';

// services/authService.js

const API_URL = "http://localhost:8080/api/auth";

const authService = {
  login: async (login, password) => {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: login,   // IMPORTANT : le backend attend "username"
        password: password
      }),
    });

    let data;
    try {
      data = await res.json();
      console.log('Login API Response Data:', data);
      console.log('Login API Response Status:', res.status);
      console.log('Login API Response OK:', res.ok);
    } catch (e) {
      throw new Error("Erreur serveur");
    }

    if (!res.ok) {
      throw new Error(data.error || "Identifiants incorrects");
    }

    // Store the token if login is successful
    if (data.accessToken) {
      await AsyncStorage.setItem('userToken', data.accessToken);
    }

    return data;
  },

  register: async (clientData) => {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(clientData),
    });

    let data;
    try {
      data = await res.json();
      console.log('Register API Response Data:', data);
      console.log('Register API Response Status:', res.status);
      console.log('Register API Response OK:', res.ok);
    } catch (e) {
      throw new Error("Erreur serveur");
    }

    if (!res.ok) {
      throw new Error(data.error || "Erreur d'inscription");
    }
    return data;
  }
};

export default authService;