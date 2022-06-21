/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {Navigation} from './src/navigation/navigation';
import {store} from './src/store/store';

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar
        backgroundColor={'transparent'}
        translucent
        // hidden={Platform.OS === 'ios'}
        barStyle={'light-content'}
      />
      <Navigation />
    </Provider>
  );
};

export default App;
