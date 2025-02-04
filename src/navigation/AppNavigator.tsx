import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import DashboardNavigator from './DashboardNavigator';
import { useAuth } from '../hooks/AuthContext';

const AppNavigator = () => {
  const { userToken } = useAuth();

  return (
    <NavigationContainer>
      {userToken ? <DashboardNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;