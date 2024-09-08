import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import 'react-native-gesture-handler';
import {ToastProvider} from 'react-native-toast-notifications';
import {StackNav} from './src/Navigation/Stack';
import {NavgationRef} from './src/Services/NavigationService';

// create a component
const App = () => {
  return (
    <NavigationContainer ref={NavgationRef}>
      <ToastProvider>
        <StackNav />
      </ToastProvider>
    </NavigationContainer>
  );
};

//make this component available to the app
export default App;
