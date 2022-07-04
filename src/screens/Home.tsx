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
export const HomeScreen = ({navigation}) => {
  const navigate = (screen: string) => () => {
    if (screen === SCREEN_NAME.Around || screen === SCREEN_NAME.Community) {
      return;
    }
    navigation.navigate(screen);
  };
  return (
    <ImageBackground
      source={require('../assets/images/BG.png')}
      resizeMode="cover"
      style={Container.fullScreen}>
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
              SCREEN_NAME.Community,
              SCREEN_NAME.Around,
            ]).map(name => (
              <View key={name} style={styles.block}>
                <Block
                  isCommingsoon={
                    name === SCREEN_NAME.Around ||
                    name === SCREEN_NAME.Community
                  }
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
