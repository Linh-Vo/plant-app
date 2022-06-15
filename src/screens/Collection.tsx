import React from 'react';
import {Text, View} from 'react-native';
import {theme} from '../theme/theme';

export const CollectionScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.color.background,
      }}>
      <Text>Collection!</Text>
    </View>
  );
};
