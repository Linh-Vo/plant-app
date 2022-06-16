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
import {Platform, SafeAreaView, StatusBar} from 'react-native';
import {Navigation} from './src/navigation/navigation';

const App = () => {
  const backgroundStyle = {
    flex: 1,
  };
  // const isDarkMode = useColorScheme() === 'dark';
  return (
    // <SafeAreaView style={backgroundStyle}>
    <>
      <StatusBar
        backgroundColor={'transparent'}
        translucent
        // hidden={Platform.OS === 'ios'}
        barStyle={'light-content'}
      />
      <Navigation />
    </>
    // </SafeAreaView>
  );
};

export default App;
