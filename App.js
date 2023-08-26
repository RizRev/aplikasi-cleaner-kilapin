import 'react-native-gesture-handler'
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Router from './router'
import * as Font from 'expo-font';
import { store, persistor } from './store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';


const App = () => {

  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        'Ubuntu-Regular': require('./assets/fonts/Ubuntu/Ubuntu-Regular.ttf'),
        'Ubuntu-Bold': require('./assets/fonts/Ubuntu/Ubuntu-Bold.ttf'),
        'Ubuntu-Medium': require('./assets/fonts/Ubuntu/Ubuntu-Medium.ttf'),
      });
      setFontLoaded(true);
    }
    loadFont();
  }, []);

  if (!fontLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer >
          <Router/>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App