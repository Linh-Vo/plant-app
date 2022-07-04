import React, {useCallback, useEffect, useState} from 'react';
import {ImageRequireSource, Linking} from 'react-native';

import {StyleSheet, View, Text, Image} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Camera, CameraPermissionStatus} from 'react-native-vision-camera';
import {TextStyle} from '../../styles/base';
import {theme} from '../../theme/theme';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {CONTENT_SPACING, SAFE_AREA_PADDING} from '../../utils/constants';
import {selectAppState, setCameraStatus} from '../../store/slices/app';

// eslint-disable-next-line @typescript-eslint/no-var-requires
// const BANNER_IMAGE =
//   require('../../docs/static/img/11.png') as ImageRequireSource;

export function PermissionsPage({navigation}): React.ReactElement {
  const {cameraPermissionStatus} = useAppSelector(selectAppState);
  const dispatch = useAppDispatch();

  const requestCameraPermission = useCallback(async () => {
    console.log('Requesting camera permission...');
    const permission = await Camera.requestCameraPermission();
    console.log(`Camera permission status: ${permission}`);

    if (permission === 'denied') {
      await Linking.openSettings();
    }
    dispatch(setCameraStatus({cameraPermissionStatus: permission}));
  }, [dispatch]);

  useEffect(() => {
    if (cameraPermissionStatus !== 'authorized') {
      requestCameraPermission;
    } else if (cameraPermissionStatus === 'authorized') {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'Camera',
          },
        ],
      });
    }
  }, [cameraPermissionStatus, navigation, requestCameraPermission]);

  return (
    <View style={styles.container}>
      {cameraPermissionStatus !== 'authorized' && (
        <View style={styles.permissionsContainer}>
          <Text style={{...TextStyle.h4Text, textAlign: 'center'}}>
            Planty Life app need to access
          </Text>
          <Text style={styles.bold}>Camera permission</Text>
          <Text style={styles.hyperlink} onPress={requestCameraPermission}>
            Grant
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 38,
    fontWeight: 'bold',
    maxWidth: '80%',
  },
  banner: {
    // position: 'absolute',
    // opacity: 0.4,
    // bottom: 0,
    // left: 0,
    width: '100%',
    aspectRatio: 3 / 2,
  },
  container: {
    flex: 1,
    backgroundColor: theme.color.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.double,
  },
  permissionsContainer: {
    marginTop: CONTENT_SPACING * 2,
  },
  permissionText: {
    ...TextStyle.bodyText,

    fontSize: 17,
  },
  hyperlink: {
    ...TextStyle.bodyText,
    color: '#007aff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bold: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
