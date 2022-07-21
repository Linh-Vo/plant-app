import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Garden} from '../../components/collection/Garden';
import {PlantDetail} from '../../components/camera/PlantDetail';

const CollectionStack = createNativeStackNavigator();

export const CollectionStackScreen = () => {
  return (
    <CollectionStack.Navigator
      initialRouteName="Garden"
      screenOptions={{
        headerShown: false,
        animationTypeForReplace: 'push',
      }}>
      <CollectionStack.Screen name="Garden" component={Garden} />
      <CollectionStack.Screen name="Plant-Detail" component={PlantDetail} />
    </CollectionStack.Navigator>
  );
};
