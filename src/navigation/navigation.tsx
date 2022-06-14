import React, {useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  StyleProp,
  ViewStyle,
  StyleSheet,
  Animated,
} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {NavigationContainer} from '@react-navigation/native';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {CollectionScreen, HomeScreen, ScanScreen} from '../screens';
import {TabIcon} from '../components/icons';
import {SCREEN_NAME, SCAN_BUTTON_SIZE} from '../utils/constants';
import {getPath} from '../utils/helper';
import {Container, TextStyle} from '../styles/base';
import {theme} from '../theme/theme';

const windowWidth = Dimensions.get('window').width;

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
    bottom: 42,
    left: windowWidth / 2 - SCAN_BUTTON_SIZE.width / 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SCAN_BUTTON_SIZE.height / 2,
    backgroundColor: theme.color.primary,
  };
  console.log(getPath(windowWidth, 66));
  return (
    <View style={styles.transparentTab}>
      <Svg width={windowWidth} height="66" fill="none">
        <Path d={getPath(windowWidth, 66)} fill="white" />
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
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({name: route.name, merge: true} as any);
            }
          };

          const onLongPress = () => {
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
  );
}
const Tab = createBottomTabNavigator();
export const Navigation = () => (
  <NavigationContainer>
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
      <Tab.Screen name={SCREEN_NAME.Scan} component={ScanScreen} />
      <Tab.Screen name={SCREEN_NAME.Community} component={ScanScreen} />
      <Tab.Screen name={SCREEN_NAME.Around} component={ScanScreen} />
    </Tab.Navigator>
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
