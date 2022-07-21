export const SCREEN_NAME = {
  Home: 'Home',
  Collection: 'Collections',
  Scan: 'Scan',
  Community: 'Scan history',
  Around: 'Around',
};

export const SCAN_BUTTON_SIZE = {
  width: 64,
  height: 64,
};

import {Dimensions, Platform} from 'react-native';

export const CONTENT_SPACING = 15;

const SAFE_BOTTOM =
  Platform.select({
    ios: 0,
  }) ?? 0;

export const SAFE_AREA_PADDING = {
  paddingLeft: CONTENT_SPACING,
  paddingTop: CONTENT_SPACING,
  paddingRight: CONTENT_SPACING,
  paddingBottom: SAFE_BOTTOM + CONTENT_SPACING,
};

// The maximum zoom _factor_ you should be able to zoom in
export const MAX_ZOOM_FACTOR = 20;

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Platform.select<number>({
  android: Dimensions.get('screen').height,
  ios: Dimensions.get('window').height,
}) as number;

// Capture Button
export const CAPTURE_BUTTON_SIZE = 72;
