import * as React from "react";
import Toast from "react-native-toast-message";
import { AuthProvider } from "./hooks/AuthContext";
import AppNavigator from "./navigation/AppNavigator";

export function App() {
  return (
    <AuthProvider>
      <AppNavigator />
      <Toast />
    </AuthProvider>
  );
}
