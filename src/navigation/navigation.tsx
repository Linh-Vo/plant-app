import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {
  DefaultTheme,
  NavigationContainer,
  Theme,
} from '@react-navigation/native';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {CollectionScreen, HomeScreen} from '../screens';
import {SAFE_AREA_PADDING, SCREEN_NAME} from '../utils/constants';
import {getPath} from '../utils/helper';
import {dimensions} from '../styles/base';
import {theme} from '../theme/theme';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CameraStackScreen} from './camera';
import {CollectionStackScreen} from './collection';
import {AroundScreen} from '../screens/Around';
import {CommunityScreen} from '../screens/Community';
import {TabButton} from '../components/TabButton';
import {OnboardingScreen} from '../screens/Onboarding';
import {useAppSelector} from '../hooks/redux';
import {selectAppState} from '../store/slices/app';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SnapHistoryScreen} from '../screens/SnapHistory';

function TabBar({state, descriptors, navigation}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  return (
    navigation.getState().index !== 2 && (
      <View style={{...styles.transparentTab}}>
        <Svg
          width={dimensions.fullWidth}
          height={`${Platform.OS === 'ios' ? insets.bottom / 2 + 66 : 66}`}
          fill="none">
          <Path
            d={getPath(
              dimensions.fullWidth,
              Platform.OS === 'ios' ? insets.bottom / 2 + 66 : 66,
            )}
            fill="white"
          />
        </Svg>
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            ...styles.containerRoute,
            height: Platform.OS === 'ios' ? insets.bottom / 2 + 66 : 66,
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
              if (label === SCREEN_NAME.Scan) {
                return navigation.reset({
                  index: 0,
                  routes: [
                    {
                      name: SCREEN_NAME.Scan,
                    },
                  ],
                });
              }
              if (SCREEN_NAME.Around === label) {
                return;
              }
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
              if (label === SCREEN_NAME.Scan) {
                return navigation.reset({
                  index: 0,
                  routes: [
                    {
                      name: SCREEN_NAME.Scan,
                    },
                  ],
                });
              }
              if (SCREEN_NAME.Around === label) {
                return;
              }
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };
            return (
              <TabButton
                key={label}
                label={label}
                onLongPress={onLongPress}
                onPress={onPress}
                isFocused={isFocused}
              />
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
      // tabBarStyle: {
      //   backgroundColor: 'transparent',
      //   position: 'absolute',
      //   borderTopWidth: 0,
      //   elevation: 0,
      // },
    }}>
    <Tab.Screen name={SCREEN_NAME.Home} component={HomeScreen} />
    <Tab.Screen
      options={{
        title: SCREEN_NAME.Collection,
      }}
      name={SCREEN_NAME.Collection}
      component={CollectionScreen}
    />
    <Tab.Screen name={SCREEN_NAME.Scan} component={CameraStackScreen} />
    <Tab.Screen name={SCREEN_NAME.Community} component={SnapHistoryScreen} />
    <Tab.Screen name={SCREEN_NAME.Around} component={AroundScreen} />
  </Tab.Navigator>
);
const Stack = createNativeStackNavigator();
export const Navigation = () => {
  const {isAppFristLoad} = useAppSelector(selectAppState);
  return (
    <NavigationContainer theme={NavigationTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={isAppFristLoad ? 'Onboarding' : 'Home-Stack'}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Home-Stack" component={HomeStackScreen} />
        <Stack.Screen
          name="Collection-Stack"
          component={CollectionStackScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

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
