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
    navigation.navigate(screen);
  };
  return (
    <ScrollView contentContainerStyle={[Container.center]}>
      <ImageBackground
        source={require('../assets/images/BG.png')}
        resizeMode="cover"
        style={Container.fullScreen}>
        <View style={styles.container}>
          <Text style={[TextStyle.headerText, styles.text]}>
            {Translations.homeTitle}
          </Text>
          <View style={styles.blockContainer}>
            {Array.from([
              SCREEN_NAME.Collection,
              SCREEN_NAME.Scan,
              SCREEN_NAME.Community,
              SCREEN_NAME.Around,
            ]).map(name => (
              <View key={name} style={styles.block}>
                <Block onPress={navigate(name)} name={name} />
              </View>
            ))}
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
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
  blockContainer: {flexDirection: 'row', flexWrap: 'wrap', marginTop: 80},
  block: {width: '50%', padding: theme.spacing.base, height: 164},
});
