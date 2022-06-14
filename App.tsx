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
  // const isDarkMode = useColorScheme() === 'dark';
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        backgroundColor={'transparent'}
        translucent
        barStyle={'light-content'}
      />
      <Navigation />
    </SafeAreaView>
  );
};

export default App;
