import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "../types/types";

export const getUserDataFromToken = async (): Promise<DecodedToken | null> => {
  try {
    const token = await AsyncStorage.getItem("userToken");
    if (token) {
      const decodedToken: DecodedToken = jwtDecode(token);

      return decodedToken;
    }
    return null;
  } catch (error) {
    console.error("Erro ao obter driver_id do token:", error);
    return null;
  }
};
