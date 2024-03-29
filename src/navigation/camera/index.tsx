import React, {useEffect, useLayoutEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CameraPage} from '../../components/camera/CameraPage';
import {PermissionsPage} from '../../components/camera/PermissionsPage';
import {Camera, CameraPermissionStatus} from 'react-native-vision-camera';
import {Linking} from 'react-native';
import {SCREEN_NAME} from '../../utils/constants';
import {HomeStackScreen} from '../../navigation/navigation';
import {CameraImage} from '../../components/camera/CameraImage';
import {DetectResult} from '../../components/camera/DetectResult';
import {DetectError} from '../../components/camera/DetectError';
import {PlantDetail} from '../../components/camera/PlantDetail';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {selectAppState, setCameraStatus} from '../../store/slices/app';

const CameraStack = createNativeStackNavigator();
export const CameraStackScreen = ({navigation}) => {
  const dispatch = useAppDispatch();
  const {cameraPermissionStatus} = useAppSelector(selectAppState);
  useEffect(() => {
    // navigation.setOptions({tabBarStyle: {display: 'none'}});
    const requestCameraPermission = async () => {
      console.log('Requesting camera permission...');
      const permission = await Camera.requestCameraPermission();
      console.log(`Camera permission status: ${permission}`);
      dispatch(setCameraStatus({cameraPermissionStatus: permission}));
      // if (permission === 'denied') {
      //   navigation.push('Permisson');
      // }
    };
    requestCameraPermission();
  }, [navigation, dispatch]);
  return (
    <CameraStack.Navigator
      screenOptions={{
        headerShown: false,
        // statusBarStyle: 'dark',
        animation: 'simple_push',
        animationTypeForReplace: 'push',
      }}
      initialRouteName={
        cameraPermissionStatus !== 'authorized' ? 'Permisson' : 'Camera'
      }>
      <CameraStack.Screen name="Camera" component={CameraPage} />
      <CameraStack.Screen name="Permisson" component={PermissionsPage} />
      <CameraStack.Screen name="Camera-Image" component={CameraImage} />
      <CameraStack.Screen name="Camera-Error" component={DetectError} />
      <CameraStack.Screen name="Camera-Result" component={DetectResult} />
      <CameraStack.Screen name="Plant-Detail" component={PlantDetail} />
      <CameraStack.Screen name={'Home-Stack'} component={HomeStackScreen} />
    </CameraStack.Navigator>
  );
};
