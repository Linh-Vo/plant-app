import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {TextStyle} from '../../styles/base';
import {theme} from '../../theme/theme';
import {SnapInfo} from '../../types';

export const ScanBlock = ({item}: {item: SnapInfo}) => {
  return (
    <TouchableOpacity style={styles.container}>
      <FastImage
        style={styles.image}
        source={item?.image ? {uri: item.image} : {uri: item.images[0].url.m}}
      />
      <View style={{width: theme.spacing.double}} />
      <View style={styles.content}>
        <Text
          numberOfLines={1}
          ellipsizeMode={'tail'}
          style={TextStyle.titleText}>
          {item.species.scientificNameWithoutAuthor}
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode={'tail'}
          style={{...TextStyle.titleText, marginTop: theme.spacing.base}}>
          {item.species.scientificNameWithoutAuthor}
        </Text>
        <View style={styles.date}>
          <Text style={TextStyle.titleText}>{item.date}</Text>
          <TouchableOpacity style={styles.button}>
            <Text>{'Add'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.double,
    height: 168,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.color.white,
    borderRadius: theme.radius.medium,
  },
  image: {height: '100%', width: '30%'},
  content: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  date: {
    position: 'relative',
    marginTop: theme.spacing.triple,
    opacity: 0.6,
  },
  button: {
    position: 'absolute',
    right: theme.spacing.double,
    top: -theme.spacing.base,
  },
});
