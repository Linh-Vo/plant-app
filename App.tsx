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
import {SafeAreaView, StatusBar} from 'react-native';
import {Navigation} from './src/navigation/navigation';

const App = () => {
  const backgroundStyle = {
    backgroundColor: '#F9F6F0',
    flex: 1,
  };
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        translucent
        // barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      <Navigation />
    </SafeAreaView>
  );
};

export default App;
