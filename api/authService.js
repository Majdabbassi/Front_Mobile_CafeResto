// services/authService.js

const API_URL = "http://192.168.1.77:8080/api/auth";

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
    } catch (e) {
      throw new Error("Erreur serveur");
    }

    if (!res.ok) {
      throw new Error(data.error || "Identifiants incorrects");
    }

    return data;
  }
};

export default authService;