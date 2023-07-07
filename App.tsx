import React from 'react';
import type { PropsWithChildren } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import RootNavigation from './src/Navigation/RootNavigation';
import { View } from "react-native"
import { CostumToast, Texts } from './src/Component/LegcyUI';
import Toast from 'react-native-toast-message';
import { toastConfig } from './src/Component/ToastConfig';
import { useUser } from './src/Supplier/Zustand/useUser';


function App(): JSX.Element {
  const navigation = useUser((state) => state.navigation);
  // Pass the navigation object to the Zustand store
  useUser.getState().setNavigation(navigation);
  console.log("app . jsx")

  return (
    <NavigationContainer>
      <RootNavigation />
      <Toast config={toastConfig}/>
    </NavigationContainer>
  );
}
export default App;
