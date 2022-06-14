import React from 'react';
import {View, TouchableOpacity, Text, Dimensions} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {CollectionScreen, HomeScreen, ScanScreen} from '../screens';
import {TabIcon} from '../components/icons';
import {SCREEN_NAME} from '../utils/constants';
import {getPath} from '../utils/helper';

const windowWidth = Dimensions.get('window').width;

function TabBar({state, descriptors, navigation}) {
  return (
    <View style={{position: 'relative'}}>
      <Svg width={windowWidth} height="66" fill="none">
        <Path d={getPath(windowWidth, 66)} fill="white" />
      </Svg>
      <View
        style={{
          position: 'absolute',
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          // paddingBottom: 20,
          // justifyContent: 'space-around',
          display: 'flex',
          height: 66,
        }}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({name: route.name, merge: true});
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={route.name}
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={
                label !== SCREEN_NAME.Scan
                  ? {
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      // paddingHorizontal: 16,
                      marginRight: label === SCREEN_NAME.Collection ? 16 : 0,
                      marginLeft: label === SCREEN_NAME.Community ? 16 : 0,
                      flex: 1,
                    }
                  : {
                      width: 64,
                      height: 64,
                      position: 'absolute',
                      bottom: 42,
                      left: windowWidth / 2 - 32,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 32,
                      backgroundColor: '#678F58',
                    }
              }>
              <TabIcon name={label} isFocused={isFocused} />
              {label !== SCREEN_NAME.Scan && (
                <Text style={{color: isFocused ? '#678F58' : '#222'}}>
                  {label}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
const Tab = createBottomTabNavigator();
export const Navigation = () => (
  <NavigationContainer>
    <Tab.Navigator
      tabBar={props => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name={SCREEN_NAME.Home} component={HomeScreen} />
      <Tab.Screen name={SCREEN_NAME.Collection} component={CollectionScreen} />
      <Tab.Screen name={SCREEN_NAME.Scan} component={ScanScreen} />
      <Tab.Screen name={SCREEN_NAME.Community} component={ScanScreen} />
      <Tab.Screen name={SCREEN_NAME.Around} component={ScanScreen} />
    </Tab.Navigator>
  </NavigationContainer>
);
