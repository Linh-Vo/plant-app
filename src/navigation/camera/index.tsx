import React, {useEffect, useLayoutEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CameraPage} from '../../components/camera/CameraPage';
import {PermissionsPage} from '../../components/camera/PermissionsPage';
import {Camera, CameraPermissionStatus} from 'react-native-vision-camera';
import {Linking} from 'react-native';
import {SCREEN_NAME} from '../../utils/constants';
import {HomeStackScreen} from '../../navigation/navigation';

const CameraStack = createNativeStackNavigator();
export const CameraStackScreen = ({navigation}) => {
  const [cameraPermissionStatus, setCameraPermissionStatus] =
    useState<CameraPermissionStatus>('not-determined');
  // useEffect(() => {
  //   // navigation.setOptions({tabBarStyle: {display: 'none'}});
  //   const requestCameraPermission = async () => {
  //     console.log('Requesting camera permission...');
  //     const permission = await Camera.requestCameraPermission();
  //     console.log(`Camera permission status: ${permission}`);
  //     if (permission === 'denied') {
  //       await Linking.openSettings();
  //       // navigation.reset('Home-Stack');
  //     }
  //     setCameraPermissionStatus(permission);
  //   };
  //   requestCameraPermission();
  // }, [navigation]);
  return (
    <CameraStack.Navigator
      screenOptions={{
        headerShown: false,
        // statusBarStyle: 'dark',
        animationTypeForReplace: 'push',
      }}
      // initialRouteName={
      //   cameraPermission !== 'authorized' ? 'Permisson' : 'Camera'
      // }
      initialRouteName={'Camera'}>
      <CameraStack.Screen name="Camera" component={CameraPage} />
      <CameraStack.Screen name="Permisson" component={PermissionsPage} />
      <CameraStack.Screen name={'Home-Stack'} component={HomeStackScreen} />
    </CameraStack.Navigator>
  );
};
