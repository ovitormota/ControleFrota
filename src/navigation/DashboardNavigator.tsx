import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Home } from "./screens/Home";
import { Logout } from "./screens/Logout";

const Tab = createBottomTabNavigator();

const DashboardNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: "#084b6f",
      tabBarInactiveTintColor: "#aaa",
    }}
  >
    <Tab.Screen
      name="Lista de Veículos"
      component={Home}
      options={{
        tabBarLabel: () => null,
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="car" size={29} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Logout"
      component={Logout}
      options={{
        headerShown: false,
        tabBarLabel: () => null,
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons
            name="account-settings"
            size={29}
            color={color}
          />
        ),
      }}
    />
  </Tab.Navigator>
);

export default DashboardNavigator;
