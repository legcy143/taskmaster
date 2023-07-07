import React, { useState, useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../Todo/Splash';
import Home from '../Todo/Screens/Home';
import OnProgressTodo from '../Todo/Screens/OnProgressTodo';
import CompletedTodo from '../Todo/Screens/CompletedTodo';
import Profile from '../Todo/Screens/Profile';
import Notification from '../Todo/Screens/Notification';
import Authentication from '../Todo/Screens/AuthScreen/Authentication';
import VerifyOtp from '../Todo/Screens/AuthScreen/VerifyOtp';
import NetworkError from '../Todo/Screens/Utils/NetworkError';
import { useUser } from '../Supplier/Zustand/useUser';
import EditProfile from '../Todo/Screens/EditProfile';
const Stack = createNativeStackNavigator();

export default function RootNavigation() {


  return (
    <Stack.Navigator initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* authentication */}
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Authentication" component={Authentication} />
      <Stack.Screen name="VerifyOtp" component={VerifyOtp} />
      {/* error handling pages */}
      <Stack.Screen name="NetworkError" component={NetworkError} />

      {/* user task pages */}
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="OnProgressTodo" component={OnProgressTodo} />
      <Stack.Screen name="CompletedTodo" component={CompletedTodo} />
    </Stack.Navigator>
  );
};
