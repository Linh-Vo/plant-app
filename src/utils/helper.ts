export const getPath = (
  width: number,
  height: number,
  curvedButtonSize = 64,
) => {
  const halfWidth = width / 2;
  return `M 0 0 V${height} H${width} V0 H${halfWidth + curvedButtonSize} C${
    halfWidth + curvedButtonSize - 16
  } 0 ${halfWidth + curvedButtonSize - 24} 9 ${halfWidth + 32} 18 C${
    halfWidth + 24
  } 27 ${halfWidth + 16} 36 ${halfWidth} 36 C${halfWidth - 16} 36 ${
    halfWidth - 24
  } 27 ${halfWidth - 32} 18 C${halfWidth - 32} 18 ${halfWidth - 48} 0 ${
    halfWidth - curvedButtonSize
  } 0 H0Z`;
};

import {Platform} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
export const openCamera = () => {
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

export const imageGalleryLaunch = handleResponse => () => {
  let options = {
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  ImagePicker.launchImageLibrary(options, res => {
    if (res.assets?.length) {
      const source = {path: res.assets[0]?.uri};
      const image = (res?.assets && res.assets[0]) || undefined;
      const datas = new FormData();

      datas.append('images', {
        name: image?.fileName,
        type: image?.type,
        uri:
          Platform.OS === 'android'
            ? image?.uri
            : image?.uri?.replace('file://', ''),
      });
      console.log('FORMDATA', JSON.stringify(datas));
      handleResponse(source, 'gallery');
    }
  });
};
