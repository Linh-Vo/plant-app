import {useFocusEffect} from '@react-navigation/native';
import React from 'react';
import {useEffect} from 'react';
import {Text, View} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';

export const ScanScreen = ({navigation}) => {
  const imageGalleryLaunch = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, res => {
      console.log('Response = ', res);
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
      } else {
        const source = {uri: res.uri};
        console.log('response', JSON.stringify(res));
      }
    });
  };
  const cameraLaunch = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      mediaType: 'photo',
    };
    ImagePicker.launchCamera(options, res => {
      console.log('Response = ', res);
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
      } else {
        const source = {uri: res.uri};
        console.log('response', JSON.stringify(res));
      }
    });
  };
  useFocusEffect(cameraLaunch);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} />
  );
};
