import React from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {ScreenProps} from '../types';
import {Container, TextStyle} from '../styles/base';
import {theme} from '../theme/theme';
import {BlockIcon} from './icons';

interface BlockProps extends ScreenProps {
  onPress: (event: GestureResponderEvent) => void;
  isCommingsoon?: boolean;
}
export const Block = (props: BlockProps) => {
  return (
    <TouchableOpacity
      disabled={props.isCommingsoon}
      onPress={props.onPress}
      style={styles.container}>
      <BlockIcon name={props.name} />
      <Text
        numberOfLines={1}
        allowFontScaling
        adjustsFontSizeToFit
        style={TextStyle.h4Text}>
        {props.name}
      </Text>
      {props.isCommingsoon && (
        <Text style={{...TextStyle.baseText, opacity: 0.6}}>
          {'(Coming Soon)'}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    ...Container.fullScreen,
    padding: theme.spacing.triple,
    backgroundColor: theme.color.white,
    borderRadius: theme.spacing.double,
    justifyContent: 'space-between',
  },
});
