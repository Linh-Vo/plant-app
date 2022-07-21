import {CameraPage} from '@components/camera/CameraPage';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {CollectionScreen} from '../screens/Collection';
import {HomeScreen} from '../screens/Home';
import {theme} from '../theme/theme';
import {SCAN_BUTTON_SIZE, SCREEN_NAME} from '../utils/constants';
import {getPath} from '../utils/helper';
import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {dimensions, TextStyle} from '../styles/base';
import {TabIcon} from '../components/icons';
import {Path, Svg} from 'react-native-svg';
import {SnapHistoryScreen} from '../screens/SnapHistory';

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
  return (
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
            //   return openCamera();
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
  );
}
const Tab = createBottomTabNavigator();

export const HomeStack = () => (
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
    <Tab.Screen name={SCREEN_NAME.Scan} component={CameraPage} />
    <Tab.Screen name={SCREEN_NAME.Community} component={SnapHistoryScreen} />
    <Tab.Screen name={SCREEN_NAME.Around} component={CollectionScreen} />
  </Tab.Navigator>
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
