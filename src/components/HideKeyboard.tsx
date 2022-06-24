import React from 'react';
import {Keyboard, TouchableWithoutFeedback} from 'react-native';

export const HideKeyboard = ({children}) => (
  <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
    {children}
  </TouchableWithoutFeedback>
);
