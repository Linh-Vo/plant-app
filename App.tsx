/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect} from 'react';
import {BackHandler, StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {Navigation} from './src/navigation/navigation';
import persistor, {store} from './src/store/store';
import Toast from 'react-native-toast-message';

const App = () => {
  useEffect(() => {
    const onBackPress = () => {
      return false;
    };

    BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar
          backgroundColor={'transparent'}
          translucent
          // hidden={Platform.OS === 'ios'}
          barStyle={'light-content'}
        />
        <Navigation />
        <Toast />
      </PersistGate>
    </Provider>
  );
};

export default App;
