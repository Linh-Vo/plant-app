import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {dimensions, TextStyle} from '../styles/base';
import {theme} from '../theme/theme';

const Touchable = props => {
  const {onPress, it} = props;

  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    return setPressed(false);
  }, []);

  return (
    <TouchableOpacity
      {...props}
      style={styles.ebayItem}
      activeOpacity={1}
      onPress={() => {
        setPressed(true);
        setTimeout(() => {
          setPressed(false);
          onPress();
        }, 100);
      }}>
      <FastImage
        style={styles.logo}
        source={require('../assets/images/ebay.png')}
      />
      <FastImage
        resizeMode="cover"
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          width: '35%',
          height: '100%',
          borderRadius: 8,
          position: 'relative',
        }}
        source={{
          uri: it.galleryURL[0],
        }}
      />
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          flex: 1,
          marginLeft: theme.spacing.double,
          opacity: pressed ? 0.4 : 1,
        }}>
        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          style={{...TextStyle.titleText}}>
          {it.title[0]}
        </Text>

        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{...TextStyle.h4Text}}>
          {`$${it.sellingStatus?.[0].currentPrice?.[0].__value__}`}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  ebayItem: {
    position: 'relative',
    flexDirection: 'row',
    height: 132,
    backgroundColor: theme.color.white,
    padding: theme.spacing.double,
    marginVertical: theme.spacing.base,
    borderRadius: theme.radius.medium,
  },
  logo: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: theme.color.white,
    position: 'absolute',
    bottom: 8,
    left: dimensions.fullWidth * 0.35 - 20,
    borderWidth: 1,
    borderColor: 'rgba(34, 34, 34, 0.1)',
    zIndex: 9999,
  },
});
export default Touchable;
