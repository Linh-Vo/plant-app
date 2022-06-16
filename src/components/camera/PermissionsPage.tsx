import React, {useCallback, useEffect, useState} from 'react';
import {ImageRequireSource, Linking} from 'react-native';

import {StyleSheet, View, Text, Image} from 'react-native';
import {Camera, CameraPermissionStatus} from 'react-native-vision-camera';
import {TextStyle} from '../../styles/base';
import {CONTENT_SPACING, SAFE_AREA_PADDING} from '../../utils/constants';

// eslint-disable-next-line @typescript-eslint/no-var-requires
// const BANNER_IMAGE =
//   require('../../docs/static/img/11.png') as ImageRequireSource;

export function PermissionsPage({navigation}): React.ReactElement {
  const [cameraPermissionStatus, setCameraPermissionStatus] =
    useState<CameraPermissionStatus>('not-determined');

  const requestCameraPermission = useCallback(async () => {
    console.log('Requesting camera permission...');
    const permission = await Camera.requestCameraPermission();
    console.log(`Camera permission status: ${permission}`);

    if (permission === 'denied') {
      await Linking.openSettings();
    }
    setCameraPermissionStatus(permission);
  }, []);

  useEffect(() => {
    if (cameraPermissionStatus === 'authorized') {
      navigation.replace('Camera');
    }
  }, [cameraPermissionStatus, navigation]);

  return (
    <View style={styles.container}>
      {/* <Image source={BANNER_IMAGE} style={styles.banner} /> */}
      <View style={styles.permissionsContainer}>
        {cameraPermissionStatus !== 'authorized' && (
          <Text style={TextStyle.bodyText}>
            Vision Camera needs{' '}
            <Text style={styles.bold}>Camera permission</Text>.
            <Text style={styles.hyperlink} onPress={requestCameraPermission}>
              Grant
            </Text>
          </Text>
        )}
      </View>
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
    position: 'absolute',
    opacity: 0.4,
    bottom: 0,
    left: 0,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    ...SAFE_AREA_PADDING,
  },
  permissionsContainer: {
    marginTop: CONTENT_SPACING * 2,
  },
  permissionText: {
    fontSize: 17,
  },
  hyperlink: {
    color: '#007aff',
    fontWeight: 'bold',
  },
  bold: {
    fontWeight: 'bold',
  },
});
