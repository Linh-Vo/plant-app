/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {Navigation} from './src/navigation/navigation';
import persistor, {store} from './src/store/store';
import Toast, {InfoToast} from 'react-native-toast-message';
import {theme} from './src/theme/theme';
import {TextStyle} from './src/styles/base';
import {WithSplashScreen} from './src/screens/Splash';

async function initialize() {
  const test = async () => {
    return new Promise(res => {
      setTimeout(() => {
        res('1');
      }, 3000);
    });
  };
  await test();
  // await loadFonts()
  // const store = createReduxStore();
  // await initializePushNotifications()
  // ...
}

const App = () => {
  const [isAppReady, setIsAppReady] = useState(false);
  useEffect(() => {
    initialize().then(() => {
      setIsAppReady(true);
    });
  }, []);
  return (
    <WithSplashScreen isAppReady={isAppReady}>
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
                    backgroundColor: '#000000',
                    borderRadius: 12,
                    borderLeftWidth: 0,
                    marginBottom: 27,
                  }}
                  text1Style={{...TextStyle.bodyText, color: theme.color.white}}
                  // eslint-disable-next-line react-native/no-inline-styles
                  text2Style={{
                    ...TextStyle.bodyText,
                    color: theme.color.white,
                    textAlign: 'center',
                  }}
                />
              ),
            }}
          />
        </PersistGate>
      </Provider>
    </WithSplashScreen>
  );
};

export default App;
