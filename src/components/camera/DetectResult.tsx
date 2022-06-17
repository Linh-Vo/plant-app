import React from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {PlantResult} from '../../types';
import {SAFE_AREA_PADDING} from '../../utils/constants';
import {theme} from '../../theme/theme';
import {ResultBlock} from '../ResultBlock';

export const DetectResult = ({route, navigation}) => {
  const {results} = route?.params;
  const goBack = () => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'Camera',
        },
      ],
    });
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goBack} style={styles.closeButton}>
        <Svg width="44" height="44" viewBox="0 0 44 44" fill="none">
          <Path
            opacity="0.4"
            d="M22 40.3333C32.1252 40.3333 40.3333 32.1252 40.3333 22C40.3333 11.8748 32.1252 3.66667 22 3.66667C11.8748 3.66667 3.66667 11.8748 3.66667 22C3.66667 32.1252 11.8748 40.3333 22 40.3333Z"
            fill="#222222"
          />
          <Path
            d="M23.9433 22L28.16 17.7833C28.6917 17.2517 28.6917 16.3717 28.16 15.84C27.6283 15.3083 26.7483 15.3083 26.2167 15.84L22 20.0567L17.7833 15.84C17.2517 15.3083 16.3717 15.3083 15.84 15.84C15.3083 16.3717 15.3083 17.2517 15.84 17.7833L20.0567 22L15.84 26.2167C15.3083 26.7483 15.3083 27.6283 15.84 28.16C16.115 28.435 16.4633 28.5633 16.8117 28.5633C17.16 28.5633 17.5083 28.435 17.7833 28.16L22 23.9433L26.2167 28.16C26.4917 28.435 26.84 28.5633 27.1883 28.5633C27.5367 28.5633 27.885 28.435 28.16 28.16C28.6917 27.6283 28.6917 26.7483 28.16 26.2167L23.9433 22Z"
            fill="white"
          />
        </Svg>
      </TouchableOpacity>
      <ScrollView
        showsVerticalScrollIndicator={false}
        horizontal={false}
        style={styles.resultContainer}>
        {results?.map((res, idx) => (
          <ResultBlock
            key={idx}
            plant={res}
            textStyle={{
              color: idx === 0 ? theme.color.primary : theme.color.danger,
            }}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    padding: SAFE_AREA_PADDING.paddingLeft,
  },
  resultContainer: {
    marginTop: theme.spacing.triple,
  },
  closeButton: {
    marginTop: SAFE_AREA_PADDING.paddingTop,
  },
});
