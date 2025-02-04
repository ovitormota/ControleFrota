import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { useAuth } from "../../hooks/AuthContext";
import { getUserDataFromToken } from "../../utils/tokenUtils";
import Toast from "react-native-toast-message";

interface UserData {
  driver?: {
    name: string;
  };
  email: string;
}

export function Logout() {
  const { signOut } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const decodedData = await getUserDataFromToken();
        setUserData(decodedData);
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Erro",
          text2: "Não foi possível carregar os dados do usuário.",
        });
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Não foi possível fazer logout.",
      });
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#084b6f" />
      ) : userData ? (
        <>
          <Text style={styles.title}>Olá, {userData.driver?.name}</Text>
          <Text style={styles.email}>{userData.email}</Text>
        </>
      ) : (
        <Text style={styles.title}>Erro ao carregar informações.</Text>
      )}

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    color: "#7f8c8d",
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: "#e74c3c",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    elevation: 3, 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
