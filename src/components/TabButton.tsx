import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import {dimensions, TextStyle} from '../styles/base';
import {TabIcon} from './icons';
import {SCAN_BUTTON_SIZE, SCREEN_NAME} from '../utils/constants';
import {theme} from '../theme/theme';
import Toast from 'react-native-toast-message';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const TabButton = ({onPress, onLongPress, isFocused, label}) => {
  const insets = useSafeAreaInsets();
  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={isFocused ? {selected: true} : {}}
      onPress={() => {
        if (label === SCREEN_NAME.Around) {
          return Toast.show({
            type: 'info',
            position: 'bottom',
            autoHide: true,
            visibilityTime: 2000,
            text2: 'Coming Soon!',
          });
        }
        onPress();
      }}
      onLongPress={onLongPress}
      style={[
        // eslint-disable-next-line react-native/no-inline-styles
        {position: 'relative'},
        label !== SCREEN_NAME.Scan
          ? // eslint-disable-next-line react-native/no-inline-styles
            {
              ...styles.routeStyle,
              marginRight: label === SCREEN_NAME.Collection ? 16 : 0,
              marginLeft: label === SCREEN_NAME.Community ? 16 : 0,
            }
          : {...styles.scanButtonStyle, bottom: insets.bottom / 2 + 38},
      ]}>
      <TabIcon name={label as string} isFocused={isFocused} />
      {label !== SCREEN_NAME.Scan && (
        <Text
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            ...TextStyle.baseText,
            color: isFocused ? '#678F58' : '#222',
          }}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  routeStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    // paddingHorizontal: 16,
    flex: 1,
  },
  scanButtonStyle: {
    width: SCAN_BUTTON_SIZE.width,
    height: SCAN_BUTTON_SIZE.height,
    position: 'absolute',
    bottom: 38,
    left: dimensions.fullWidth / 2 - SCAN_BUTTON_SIZE.width / 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SCAN_BUTTON_SIZE.height / 2,
    backgroundColor: theme.color.primary,
  },
});
