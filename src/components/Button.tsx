import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {TextStyle} from '../styles/base';
import {theme} from '../theme/theme';

interface ButtonProps {
  text: string;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<any>;
  onPress: () => void;
}
export const Button = (props: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.container, props.buttonStyle]}>
      <Text style={[styles.text, props.textStyle]}>{props.text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    borderRadius: 20,
    backgroundColor: theme.color.primary,
  },
  text: TextStyle.bodyText,
});
