import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import Toast from "react-native-toast-message";
import logo from "../../assets/logo.png";
import { useAuth } from "../../hooks/AuthContext";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { signIn } = useAuth();

  const handleLogin = async (): Promise<void> => {
    if (!email || !password) {
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Preencha todos os campos",
      });
      return;
    }

    try {
      const response = await fetch(
        "https://driver-api-production.up.railway.app/auth",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem("userToken", data.access_token);
        signIn(data.access_token);
        Toast.show({
          type: "success",
          text1: "Login bem-sucedido",
          text2: "Você foi autenticado com sucesso!",
        });
      } else {
        throw new Error(data.message || "Falha na autenticação");
      }
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: error.message || "Erro ao autenticar",
      });
    }
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#7f8c8d"
        autoCapitalize="none"
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Senha"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#7f8c8d"
          autoCapitalize="none"
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <MaterialCommunityIcons
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            size={24}
            color="#7f8c8d"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f7f7f7",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
    borderRadius: 75,
  },
  input: {
    width: "100%",
    padding: 14,
    borderRadius: 25,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#bdc3c7",
    marginBottom: 15,
    fontSize: 16,
    color: "#2c3e50",
  },
  passwordContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#bdc3c7",
    borderRadius: 25,
    paddingHorizontal: 14,
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: "#2c3e50",
  },
  button: {
    width: "100%",
    padding: 16,
    borderRadius: 25,
    backgroundColor: "#084b6f",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Login;
