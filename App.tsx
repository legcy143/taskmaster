import React from 'react';
import type {PropsWithChildren} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigation from './src/Navigation/RootNavigation';
import { ToastProvider } from 'react-native-toast-notifications'
import {View} from "react-native"
import { CostumToast, Texts } from './src/Component/LegcyUI';


function App(): JSX.Element {
  return (
    <ToastProvider  duration={2000}
    renderToast={(toastOptions) => <CostumToast message={toastOptions.message} type={toastOptions.type}/>}
    // renderToast={(toastOptions) => <CostumToast message={toastOptions.message}/>}
    >
    <NavigationContainer>
      <RootNavigation />
    </NavigationContainer>
    </ToastProvider>
  );
}
export default App;
