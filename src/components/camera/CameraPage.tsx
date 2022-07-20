import * as React from 'react';
import {useRef, useState, useMemo, useCallback} from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import {
  CameraDeviceFormat,
  CameraRuntimeError,
  PhotoFile,
  sortFormats,
  useCameraDevices,
} from 'react-native-vision-camera';
import {Camera, frameRateIncluded} from 'react-native-vision-camera';
import {
  CAPTURE_BUTTON_SIZE,
  CONTENT_SPACING,
  MAX_ZOOM_FACTOR,
  SAFE_AREA_PADDING,
} from '../../utils/constants';
import Reanimated, {
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedProps,
  useSharedValue,
} from 'react-native-reanimated';
import {useEffect} from 'react';
import {useIsForeground} from '../../hooks/useIsForeground';
import {PressableOpacity} from 'react-native-pressable-opacity';
import IonIcon from 'react-native-vector-icons/Ionicons';
// import {examplePlugin} from './frame-processors/ExamplePlugin';
// import type {Routes} from './Routes';
// import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useIsFocused} from '@react-navigation/core';
import {theme} from '../../theme/theme';
import {imageGalleryLaunch} from '../../utils/helper';
import {Path, Svg} from 'react-native-svg';
import {TextStyle} from '../../styles/base';
import {ScanTipModal} from './ScantipModal';
import {useAppSelector} from '../../hooks/redux';
import {selectAppState} from '../../store/slices/app';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import FocusAwareStatusBar from '../../components/FocusStatusBar';

const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera);
Reanimated.addWhitelistedNativeProps({
  zoom: true,
});

const SCALE_FULL_ZOOM = 3;
const BUTTON_SIZE = 40;

// type Props = NativeStackScreenProps<Routes, 'Scan'>;
export function CameraPage({navigation}): React.ReactElement {
  const insets = useSafeAreaInsets();
  const [galleryLoading, setLoading] = useState(false);
  const [isVisibleScanTip, setScanTipVisible] = useState(false);
  const [isCameraInitialized, setIsCameraInitialized] = useState(false);
  const {cameraPermissionStatus} = useAppSelector(selectAppState);
  const camera = useRef<Camera>(null);
  const zoom = useSharedValue(0);
  const isPressingButton = useSharedValue(false);

  // check if camera page is active
  const isFocussed = useIsFocused();
  const isForeground = useIsForeground();
  const isActive = isFocussed && isForeground;

  const [cameraPosition, setCameraPosition] = useState<'front' | 'back'>(
    'back',
  );
  const [enableHdr, setEnableHdr] = useState(false);
  const [flash, setFlash] = useState<'off' | 'on'>('off');
  const [enableNightMode, setEnableNightMode] = useState(false);

  // camera format settings
  const devices = useCameraDevices();
  const device = devices[cameraPosition];

  const formats = useMemo<CameraDeviceFormat[]>(() => {
    if (device?.formats == null) {
      return [];
    }
    return device.formats.sort(sortFormats);
  }, [device?.formats]);

  //#region Memos
  const [is60Fps, setIs60Fps] = useState(true);
  const fps = useMemo(() => {
    if (!is60Fps) {
      return 30;
    }

    if (enableNightMode && !device?.supportsLowLightBoost) {
      // User has enabled Night Mode, but Night Mode is not natively supported, so we simulate it by lowering the frame rate.
      return 30;
    }

    const supportsHdrAt60Fps = formats.some(
      f =>
        f.supportsVideoHDR &&
        f.frameRateRanges.some(r => frameRateIncluded(r, 60)),
    );
    if (enableHdr && !supportsHdrAt60Fps) {
      // User has enabled HDR, but HDR is not supported at 60 FPS.
      return 30;
    }

    const supports60Fps = formats.some(f =>
      f.frameRateRanges.some(r => frameRateIncluded(r, 60)),
    );
    if (!supports60Fps) {
      // 60 FPS is not supported by any format.
      return 30;
    }
    // If nothing blocks us from using it, we default to 60 FPS.
    return 60;
  }, [
    device?.supportsLowLightBoost,
    enableHdr,
    enableNightMode,
    formats,
    is60Fps,
  ]);

  const supportsCameraFlipping = useMemo(
    () => devices.back != null && devices.front != null,
    [devices.back, devices.front],
  );
  const supportsFlash = device?.hasFlash ?? false;
  // const supportsHdr = useMemo(
  //   () => formats.some(f => f.supportsVideoHDR || f.supportsPhotoHDR),
  //   [formats],
  // );
  const supports60Fps = useMemo(
    () =>
      formats.some(f =>
        f.frameRateRanges.some(rate => frameRateIncluded(rate, 60)),
      ),
    [formats],
  );
  const canToggleNightMode = enableNightMode
    ? true // it's enabled so you have to be able to turn it off again
    : (device?.supportsLowLightBoost ?? false) || fps > 30; // either we have native support, or we can lower the FPS
  //#endregion

  const format = useMemo(() => {
    let result = formats;
    if (enableHdr) {
      // We only filter by HDR capable formats if HDR is set to true.
      // Otherwise we ignore the `supportsVideoHDR` property and accept formats which support HDR `true` or `false`
      result = result.filter(f => f.supportsVideoHDR || f.supportsPhotoHDR);
    }

    // find the first format that includes the given FPS
    return result.find(f =>
      f.frameRateRanges.some(r => frameRateIncluded(r, fps)),
    );
  }, [formats, fps, enableHdr]);

  //#region Animated Zoom
  // This just maps the zoom factor to a percentage value.
  // so e.g. for [min, neutr., max] values [1, 2, 128] this would result in [0, 0.0081, 1]
  const minZoom = device?.minZoom ?? 1;
  const maxZoom = Math.min(device?.maxZoom ?? 1, MAX_ZOOM_FACTOR);

  const cameraAnimatedProps = useAnimatedProps(() => {
    const z = Math.max(Math.min(zoom.value, maxZoom), minZoom);
    return {
      zoom: z,
    };
  }, [maxZoom, minZoom, zoom]);
  //#endregion

  //#region Callbacks
  const setIsPressingButton = useCallback(
    (_isPressingButton: boolean) => {
      isPressingButton.value = _isPressingButton;
    },
    [isPressingButton],
  );
  // Camera callbacks
  const onError = useCallback((error: CameraRuntimeError) => {
    console.error(error);
  }, []);
  const onInitialized = useCallback(() => {
    console.log('Camera initialized!');
    setIsCameraInitialized(true);
  }, []);
  const onMediaCaptured = useCallback(
    (media?: PhotoFile, type?: 'capture' | 'gallery') => {
      if (media) {
        navigation.navigate('Camera-Image', {
          path: media.path,
          type: type,
        });
      }
      setLoading(false);
    },
    [navigation],
  );
  const onFlipCameraPressed = useCallback(() => {
    setCameraPosition(p => (p === 'back' ? 'front' : 'back'));
  }, []);
  const onFlashPressed = useCallback(() => {
    setFlash(f => (f === 'off' ? 'on' : 'off'));
  }, []);
  //#endregion

  //#region Tap Gesture
  const onDoubleTap = useCallback(() => {
    onFlipCameraPressed();
  }, [onFlipCameraPressed]);
  //#endregion

  //#region Effects
  const neutralZoom = device?.neutralZoom ?? 1;
  useEffect(() => {
    // Run everytime the neutralZoomScaled value changes. (reset zoom when device changes)
    zoom.value = neutralZoom;
  }, [neutralZoom, zoom]);

  // useEffect(() => {
  //   Camera.getMicrophonePermissionStatus().then(status =>
  //     setHasMicrophonePermission(status === 'authorized'),
  //   );
  // }, []);
  //#endregion

  //#region Pinch to Zoom Gesture
  // The gesture handler maps the linear pinch gesture (0 - 1) to an exponential curve since a camera's zoom
  // function does not appear linear to the user. (aka zoom 0.1 -> 0.2 does not look equal in difference as 0.8 -> 0.9)
  const onPinchGesture = useAnimatedGestureHandler<
    PinchGestureHandlerGestureEvent,
    {startZoom?: number}
  >({
    onStart: (_, context) => {
      context.startZoom = zoom.value;
    },
    onActive: (event, context) => {
      // we're trying to map the scale gesture to a linear zoom here
      const startZoom = context.startZoom ?? 0;
      const scale = interpolate(
        event.scale,
        [1 - 1 / SCALE_FULL_ZOOM, 1, SCALE_FULL_ZOOM],
        [-1, 0, 1],
        Extrapolate.CLAMP,
      );
      zoom.value = interpolate(
        scale,
        [-1, 0, 1],
        [minZoom, startZoom, maxZoom],
        Extrapolate.CLAMP,
      );
    },
  });
  //#endregion

  if (device != null && format != null) {
    console.log(
      `Re-rendering camera page with ${
        isActive ? 'active' : 'inactive'
      } camera. ` +
        `Device: "${device.name}" (${format.photoWidth}x${format.photoHeight} @ ${fps}fps)`,
    );
  } else {
    console.log('re-rendering camera page without active camera');
  }

  // const frameProcessor = useFrameProcessor(frame => {
  //   'worklet';
  //   const values = examplePlugin(frame);
  //   console.log(`Return Values: ${JSON.stringify(values)}`);
  // }, []);

  // const onFrameProcessorSuggestionAvailable = useCallback(
  //   (suggestion: FrameProcessorPerformanceSuggestion) => {
  //     console.log(
  //       `Suggestion available! ${suggestion.type}: Can do ${suggestion.suggestedFrameProcessorFps} FPS`,
  //     );
  //   },
  //   [],
  // );
  if (galleryLoading) {
    return (
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          ...styles.container,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size={'large'} color={theme.color.white} />
      </View>
    );
  }
  return cameraPermissionStatus === 'authorized' ? (
    <>
      <FocusAwareStatusBar
        backgroundColor={'transparent'}
        translucent
        // hidden={Platform.OS === 'ios'}
        barStyle={'light-content'}
      />
      <View style={{...styles.container, paddingTop: insets.top}}>
        {device != null && (
          <PinchGestureHandler
            onGestureEvent={onPinchGesture}
            enabled={isActive}>
            <Reanimated.View style={StyleSheet.absoluteFill}>
              {/* <TapGestureHandler onEnded={onDoubleTap} numberOfTaps={2}> */}
              <ReanimatedCamera
                ref={camera}
                style={StyleSheet.absoluteFill}
                device={device}
                format={format}
                // fps={fps}
                // hdr={enableHdr}
                // lowLightBoost={device.supportsLowLightBoost && enableNightMode}
                isActive={isActive}
                onInitialized={onInitialized}
                onError={onError}
                enableZoomGesture={false}
                animatedProps={cameraAnimatedProps}
                photo={true}
                video={false}
                audio={false}
                // frameProcessor={
                //   device.supportsParallelVideoProcessing
                //     ? frameProcessor
                //     : undefined
                // }
                orientation="portrait"
                // frameProcessorFps={1}
                // onFrameProcessorPerformanceSuggestionAvailable={
                //   onFrameProcessorSuggestionAvailable
                // }
              />
              {/* </TapGestureHandler> */}
            </Reanimated.View>
          </PinchGestureHandler>
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              setLoading(true);
              imageGalleryLaunch(onMediaCaptured)();
            }}
            style={styles.galleryButton}>
            <Image source={require('../../assets/images/gallery-bg.png')} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.captureButton}
            onPress={async () => {
              const photo = await camera.current?.takePhoto({
                photoCodec: 'jpeg',
                flash: flash,
                quality: 90,
                // enableAutoDistortionCorrection: true,
                // enableAutoStabilization: true,
                // skipMetadata: true,
              });
              if (photo) {
                console.log(photo.metadata);
                onMediaCaptured(photo, 'capture');
              }
            }}
          />
          {/* <CaptureButton
          style={styles.captureButton}
          camera={camera}
          onMediaCaptured={onMediaCaptured}
          cameraZoom={zoom}
          minZoom={minZoom}
          maxZoom={maxZoom}
          flash={supportsFlash ? flash : 'off'}
          enabled={isCameraInitialized && isActive}
          setIsPressingButton={setIsPressingButton}
        /> */}
          <TouchableOpacity
            onPress={() => setScanTipVisible(true)}
            style={styles.snapButton}>
            <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <Path
                opacity="0.4"
                d="M10 18.3333C14.6024 18.3333 18.3334 14.6024 18.3334 9.99999C18.3334 5.39762 14.6024 1.66666 10 1.66666C5.39765 1.66666 1.66669 5.39762 1.66669 9.99999C1.66669 14.6024 5.39765 18.3333 10 18.3333Z"
                fill="white"
              />
              <Path
                d="M10 11.4583C10.3417 11.4583 10.625 11.175 10.625 10.8333V6.66666C10.625 6.32499 10.3417 6.04166 10 6.04166C9.65833 6.04166 9.375 6.32499 9.375 6.66666V10.8333C9.375 11.175 9.65833 11.4583 10 11.4583Z"
                fill="white"
              />
              <Path
                d="M10.7667 13.0167C10.725 12.9167 10.6667 12.825 10.5917 12.7417C10.5084 12.6667 10.4167 12.6083 10.3167 12.5667C10.1167 12.4833 9.88335 12.4833 9.68335 12.5667C9.58335 12.6083 9.49169 12.6667 9.40835 12.7417C9.33335 12.825 9.27502 12.9167 9.23335 13.0167C9.19169 13.1167 9.16669 13.225 9.16669 13.3333C9.16669 13.4417 9.19169 13.55 9.23335 13.65C9.27502 13.7583 9.33335 13.8417 9.40835 13.925C9.49169 14 9.58335 14.0583 9.68335 14.1C9.78335 14.1417 9.89169 14.1667 10 14.1667C10.1084 14.1667 10.2167 14.1417 10.3167 14.1C10.4167 14.0583 10.5084 14 10.5917 13.925C10.6667 13.8417 10.725 13.7583 10.7667 13.65C10.8084 13.55 10.8334 13.4417 10.8334 13.3333C10.8334 13.225 10.8084 13.1167 10.7667 13.0167Z"
                fill="white"
              />
            </Svg>

            <Text style={{...TextStyle.baseText, color: theme.color.white}}>
              Snap tips
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: 'Home-Stack',
                },
              ],
            })
          }
          style={{...styles.closeButton, top: insets.top}}>
          <Svg width="44" height="44" viewBox="0 0 44 44" fill="none">
            <Path
              opacity="0.4"
              d="M22 40.3333C32.1252 40.3333 40.3333 32.1252 40.3333 22C40.3333 11.8748 32.1252 3.66667 22 3.66667C11.8748 3.66667 3.66667 11.8748 3.66667 22C3.66667 32.1252 11.8748 40.3333 22 40.3333Z"
              fill="white"
            />
            <Path
              d="M23.9433 22L28.16 17.7833C28.6917 17.2517 28.6917 16.3717 28.16 15.84C27.6283 15.3083 26.7483 15.3083 26.2167 15.84L22 20.0567L17.7833 15.84C17.2517 15.3083 16.3717 15.3083 15.84 15.84C15.3083 16.3717 15.3083 17.2517 15.84 17.7833L20.0567 22L15.84 26.2167C15.3083 26.7483 15.3083 27.6283 15.84 28.16C16.115 28.435 16.4633 28.5633 16.8117 28.5633C17.16 28.5633 17.5083 28.435 17.7833 28.16L22 23.9433L26.2167 28.16C26.4917 28.435 26.84 28.5633 27.1883 28.5633C27.5367 28.5633 27.885 28.435 28.16 28.16C28.6917 27.6283 28.6917 26.7483 28.16 26.2167L23.9433 22Z"
              fill="white"
            />
          </Svg>
        </TouchableOpacity>
        {/* <StatusBarBlurBackground /> */}

        <View style={{...styles.rightButtonRow, top: insets.top}}>
          {/* {supportsCameraFlipping && (
          <PressableOpacity
            style={styles.button}
            onPress={onFlipCameraPressed}
            disabledOpacity={0.4}>
            <IonIcon name="camera-reverse" color="white" size={24} />
          </PressableOpacity>
        )} */}
          {supportsFlash && (
            <PressableOpacity
              style={styles.button}
              onPress={onFlashPressed}
              disabledOpacity={0.4}>
              <IonIcon
                name={flash === 'on' ? 'flash' : 'flash-off'}
                color="white"
                size={24}
              />
            </PressableOpacity>
          )}
          {/* {supports60Fps && (
          <PressableOpacity
            style={styles.button}
            onPress={() => setIs60Fps(!is60Fps)}>
            <Text style={styles.text}>
              {is60Fps ? '60' : '30'}
              {'\n'}FPS
            </Text>
          </PressableOpacity>
        )} */}
          {/* {supportsHdr && (
          <PressableOpacity
            style={styles.button}
            onPress={() => setEnableHdr(h => !h)}>
            <MaterialIcon
              name={enableHdr ? 'hdr' : 'hdr-off'}
              color="white"
              size={24}
            />
          </PressableOpacity>
        )} */}
          {/* {canToggleNightMode && (
          <PressableOpacity
            style={styles.button}
            onPress={() => setEnableNightMode(!enableNightMode)}
            disabledOpacity={0.4}>
            <IonIcon
              name={enableNightMode ? 'moon' : 'moon-outline'}
              color="white"
              size={24}
            />
          </PressableOpacity>
        )} */}
        </View>
        {isVisibleScanTip && (
          <ScanTipModal
            backdropPress={() => setScanTipVisible(false)}
            isVisible={isVisibleScanTip}
          />
        )}
      </View>
    </>
  ) : (
    <></>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  buttonContainer: {
    padding: 16,
    position: 'absolute',
    height: 108,
    backgroundColor: theme.color.dark,
    // opacity: 0.8,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    bottom: 0,
  },
  captureButton: {
    // position: 'absolute',
    // alignSelf: 'center',
    // bottom: SAFE_AREA_PADDING.paddingBottom,
    width: CAPTURE_BUTTON_SIZE,
    height: CAPTURE_BUTTON_SIZE,
    borderRadius: CAPTURE_BUTTON_SIZE / 2,
    borderWidth: CAPTURE_BUTTON_SIZE * 0.1,
    borderColor: theme.color.primary,
    backgroundColor: theme.color.white,
  },
  galleryButton: {
    width: 44,
    height: 44,
    borderRadius: 8,
  },
  button: {
    marginBottom: CONTENT_SPACING,
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    backgroundColor: 'rgba(140, 140, 140, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    left: SAFE_AREA_PADDING.paddingLeft,
    top: SAFE_AREA_PADDING.paddingTop + theme.spacing.triple,
  },
  snapButton: {
    alignItems: 'center',
  },
  rightButtonRow: {
    position: 'absolute',
    right: SAFE_AREA_PADDING.paddingRight,
    top: SAFE_AREA_PADDING.paddingTop + theme.spacing.triple,
  },
  text: {
    color: 'white',
    fontSize: 11,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
