import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SnapHistoryScreen} from '../../screens/SnapHistory';
import {SCREEN_NAME} from '../../utils/constants';
import {PlantDetail} from '../../components/camera/PlantDetail';

const ScanHistoryStack = createNativeStackNavigator();

export const ScanHistoryStackScreen = () => {
  return (
    <ScanHistoryStack.Navigator
      screenOptions={{
        headerShown: false,
        animationTypeForReplace: 'push',
      }}>
      <ScanHistoryStack.Screen
        name={SCREEN_NAME.Community}
        component={SnapHistoryScreen}
      />
      <ScanHistoryStack.Screen name="Plant-Detail" component={PlantDetail} />
    </ScanHistoryStack.Navigator>
  );
};
