import React from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import {Container, TextStyle} from '../styles/base';
import {Translations} from '../i18n';
export const HomeScreen = () => {
  return (
    <View style={[Container.base]}>
      <ImageBackground
        source={require('../assets/images/BG.png')}
        resizeMode="cover"
        style={styles.fullScreen}>
        <View style={styles.container}>
          <Text style={[TextStyle.headerText]}>{Translations.homeTitle}</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
});
