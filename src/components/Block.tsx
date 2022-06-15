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
}
export const Block = (props: BlockProps) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.container}>
      <BlockIcon name={props.name} />
      <Text style={TextStyle.h4Text}>{props.name}</Text>
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
