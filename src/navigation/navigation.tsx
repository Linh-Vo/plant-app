import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleProp,
  ViewStyle,
  StyleSheet,
  Animated,
} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {
  DefaultTheme,
  NavigationContainer,
  Theme,
  useIsFocused,
} from '@react-navigation/native';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {CollectionScreen, HomeScreen, ScanScreen} from '../screens';
import {TabIcon} from '../components/icons';
import {SCREEN_NAME, SCAN_BUTTON_SIZE} from '../utils/constants';
import {getPath, openCamera} from '../utils/helper';
import {dimensions, TextStyle} from '../styles/base';
import {theme} from '../theme/theme';
import {CameraPage} from '../components/camera/CameraPage';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CameraStackScreen} from './camera';

// const TabButton = props => {
//   const {item, onPress, accessibilityState} = props;
//   const focused = accessibilityState.selected;
//   const viewRef = useRef(null);

//   useEffect(() => {
//     if (focused) {
//       viewRef.current.animate({
//         0: {scale: 0.5, rotate: '0deg'},
//         1: {scale: 1.5, rotate: '360deg'},
//       });
//     } else {
//       viewRef.current.animate({
//         0: {scale: 1.5, rotate: '360deg'},
//         1: {scale: 1, rotate: '0deg'},
//       });
//     }
//   }, [focused]);

//   return (
//     <TouchableOpacity
//       onPress={onPress}
//       activeOpacity={1}
//       style={Container.base}>
//       <Animated.View ref={viewRef} />
//     </TouchableOpacity>
//   );
// };
function TabBar({state, descriptors, navigation}: BottomTabBarProps) {
  const scanButtonStyle: StyleProp<ViewStyle> = {
    width: SCAN_BUTTON_SIZE.width,
    height: SCAN_BUTTON_SIZE.height,
    position: 'absolute',
    bottom: 38,
    left: dimensions.fullWidth / 2 - SCAN_BUTTON_SIZE.width / 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SCAN_BUTTON_SIZE.height / 2,
    backgroundColor: theme.color.primary,
  };
  const [needHiden, setHiden] = useState(false);
  console.log(needHiden, navigation.getState().index);
  return (
    navigation.getState().index !== 2 && (
      <View style={styles.transparentTab}>
        <Svg width={dimensions.fullWidth} height="66" fill="none">
          <Path d={getPath(dimensions.fullWidth, 66)} fill="white" />
        </Svg>
        <View style={styles.containerRoute}>
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
              // if (label === SCREEN_NAME.Scan) {
              //   return navigation.reset('Scan-Stacl');
              // }
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });
              if (!isFocused && !event.defaultPrevented) {
                // The `merge: true` option makes sure that the params inside the tab screen are preserved
                navigation.navigate({name: route.name, merge: true} as any);
              }
              if (label === SCREEN_NAME.Scan) {
                // setHiden(true);
              }
            };

            const onLongPress = () => {
              // if (label === SCREEN_NAME.Scan) {
              //   return openCamera();
              // }
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };
            const routeStyle: StyleProp<ViewStyle> = {
              alignItems: 'center',
              justifyContent: 'flex-end',
              // paddingHorizontal: 16,
              marginRight: label === SCREEN_NAME.Collection ? 16 : 0,
              marginLeft: label === SCREEN_NAME.Community ? 16 : 0,
              flex: 1,
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
                    ? {...routeStyle}
                    : {...scanButtonStyle}
                }>
                <TabIcon name={label as string} isFocused={isFocused} />
                {label !== SCREEN_NAME.Scan && (
                  <Text
                    // eslint-disable-next-line react-native/no-inline-styles
                    style={{
                      ...TextStyle.baseText,
                      color: isFocused ? '#678F58' : '#222',
                    }}>
                    {label}
                  </Text>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    )
  );
}
const Tab = createBottomTabNavigator();
const NavigationTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: theme.color.background,
  },
};

export const HomeStackScreen = () => (
  <Tab.Navigator
    tabBar={props => <TabBar {...props} />}
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        backgroundColor: 'transparent',
        position: 'absolute',
        borderTopWidth: 0,
        elevation: 0,
      },
    }}>
    <Tab.Screen name={SCREEN_NAME.Home} component={HomeScreen} />
    <Tab.Screen name={SCREEN_NAME.Collection} component={CollectionScreen} />
    <Tab.Screen name={SCREEN_NAME.Scan} component={CameraStackScreen} />
    <Tab.Screen name={SCREEN_NAME.Community} component={CollectionScreen} />
    <Tab.Screen name={SCREEN_NAME.Around} component={CollectionScreen} />
  </Tab.Navigator>
);
const Stack = createNativeStackNavigator();
export const Navigation = () => (
  <NavigationContainer theme={NavigationTheme}>
    {/* <Tab.Navigator
      tabBar={props => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'transparent',
          position: 'absolute',
          borderTopWidth: 0,
          elevation: 0,
        },
      }}
      backBehavior={'history'}
      detachInactiveScreens
      initialRouteName="Home">
      <Tab.Screen name={SCREEN_NAME.Home} component={HomeScreen} />
      <Tab.Screen name={SCREEN_NAME.Collection} component={CollectionScreen} />
      <Tab.Screen name={SCREEN_NAME.Scan} component={CameraStackScreen} />
      <Tab.Screen name={SCREEN_NAME.Community} component={CollectionScreen} />
      <Tab.Screen name={SCREEN_NAME.Around} component={CollectionScreen} />
    </Tab.Navigator> */}
    {HomeStackScreen()}
  </NavigationContainer>
);

const styles = StyleSheet.create({
  transparentTab: {
    position: 'absolute',
    borderTopWidth: 0,
    elevation: 0,
    bottom: 0,
    backgroundColor: 'transparent',
  },
  containerRoute: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    display: 'flex',
    height: 66,
  },
});
