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
import {PersistGate} from 'redux-persist/integration/react';
import {Navigation} from './src/navigation/navigation';
import persistor, {store} from './src/store/store';
import Toast, {InfoToast} from 'react-native-toast-message';
import {theme} from './src/theme/theme';
import {TextStyle} from './src/styles/base';

const App = () => {
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
        <Toast
          config={{
            info: props => (
              <InfoToast
                {...props}
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  backgroundColor: theme.color.dark,
                  opacity: 0.8,
                  borderRadius: 12,
                  borderLeftWidth: 0,
                }}
                text1Style={{...TextStyle.bodyText, color: theme.color.white}}
                text2Style={{...TextStyle.bodyText, color: theme.color.white}}
              />
            ),
          }}
        />
      </PersistGate>
    </Provider>
  );
};

export default App;
