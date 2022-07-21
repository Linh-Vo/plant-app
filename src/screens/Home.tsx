import React from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Container, TextStyle} from '../styles/base';
import {Translations} from '../i18n';
import {SCREEN_NAME} from '../utils/constants';
import {Block} from '../components/Block';
import {theme} from '../theme/theme';
import FocusAwareStatusBar from '../components/FocusStatusBar';
export const HomeScreen = ({navigation}) => {
  const navigate = (screen: string) => () => {
    if (screen === SCREEN_NAME.Around) {
      return;
    }
    navigation.navigate(screen);
  };
  return (
    <ImageBackground
      source={require('../assets/images/BG.png')}
      resizeMode="cover"
      style={Container.fullScreen}>
      <FocusAwareStatusBar
        backgroundColor={'transparent'}
        translucent
        // hidden={Platform.OS === 'ios'}
        barStyle={'light-content'}
      />
      <ScrollView contentContainerStyle={[Container.center]}>
        <View style={styles.container}>
          <Text style={[TextStyle.headerText, styles.text]}>
            {Translations.homeTitle}
          </Text>
          <Text style={[TextStyle.headerText, styles.text]}>
            {Translations.homeTile1}
          </Text>
          <View style={styles.blockContainer}>
            {Array.from([
              SCREEN_NAME.Collection,
              SCREEN_NAME.Scan,
              SCREEN_NAME.Around,
              SCREEN_NAME.Community,
            ]).map(name => (
              <View key={name} style={styles.block}>
                <Block
                  isCommingsoon={name === SCREEN_NAME.Around}
                  onPress={navigate(name)}
                  name={name}
                />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.double,
    justifyContent: 'center',
  },
  text: {
    paddingLeft: theme.spacing.base,
  },
  blockContainer: {flexDirection: 'row', flexWrap: 'wrap', marginTop: 56},
  block: {width: '50%', padding: theme.spacing.base, height: 164},
});
