import React from 'react';
import type { PropsWithChildren } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigation from './src/Navigation/RootNavigation';
import Toast from 'react-native-toast-message';
import { toastConfig } from './src/Component/ToastConfig';


function App(): JSX.Element {
  return (
    <NavigationContainer>
      <RootNavigation />
      <Toast config={toastConfig}/>
    </NavigationContainer>
  );
}
export default App;
