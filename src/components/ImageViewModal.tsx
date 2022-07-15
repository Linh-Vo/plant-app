import React, {Ref, useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Pressable,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Modal from 'react-native-modal';
import {dimensions} from '../styles/base';
import {theme} from '../theme/theme';
import Svg, {Path} from 'react-native-svg';

export const ImageViewModal = ({isVisible, backdropPress, images, index}) => {
  const ref: Ref<FlatList> = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(index);
  useEffect(
    () => {
      if (ref.current) {
        ref.current.scrollToOffset({
          animated: true,
          offset: index * (dimensions.fullWidth - 32),
        });
      }
      if (index !== currentIndex) {
        setCurrentIndex(index);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [index],
  );
  console.log({index, currentIndex});
  const updateCurrentIndex = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIdex = Math.round(
      contentOffsetX / (dimensions.fullWidth - 32),
    );
    setCurrentIndex(currentIdex);
  };
  const Footer = () => (
    <View style={styles.footerView}>
      {images.map((_, index) => (
        <View
          key={index}
          style={[
            styles.indicator,
            // eslint-disable-next-line react-native/no-inline-styles
            index === currentIndex && {
              backgroundColor: theme.color.white,
              opacity: 1,
              width: 8,
              borderRadius: 4,
              height: 8,
            },
          ]}
        />
      ))}
    </View>
  );
  return (
    <View style={styles.container}>
      <Modal
        backdropTransitionOutTiming={0}
        useNativeDriver={true}
        isVisible={isVisible}
        statusBarTranslucent
        onBackdropPress={backdropPress}
        deviceHeight={Dimensions.get('screen').height}
        // style={StyleSheet.absoluteFill}
        style={{margin: 16}}
        backdropColor={theme.color.dark}
        backdropOpacity={0.8}
        animationIn={'fadeInUpBig'}
        animationOut={'fadeOutDown'}>
        <View style={styles.modalBody}>
          <View style={styles.headerView}>
            <Pressable onPress={backdropPress}>
              <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <Path
                  opacity="0.4"
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  fill="#FFFFFF"
                />
                <Path
                  d="M13.06 11.9999L15.36 9.69986C15.65 9.40986 15.65 8.92986 15.36 8.63986C15.07 8.34986 14.59 8.34986 14.3 8.63986L12 10.9399L9.7 8.63986C9.41 8.34986 8.93 8.34986 8.64 8.63986C8.35 8.92986 8.35 9.40986 8.64 9.69986L10.94 11.9999L8.64 14.2999C8.35 14.5899 8.35 15.0699 8.64 15.3599C8.79 15.5099 8.98 15.5799 9.17 15.5799C9.36 15.5799 9.55 15.5099 9.7 15.3599L12 13.0599L14.3 15.3599C14.45 15.5099 14.64 15.5799 14.83 15.5799C15.02 15.5799 15.21 15.5099 15.36 15.3599C15.65 15.0699 15.65 14.5899 15.36 14.2999L13.06 11.9999Z"
                  fill="#FFFFFF"
                />
              </Svg>
            </Pressable>
          </View>
          <FlatList
            ref={ref}
            onMomentumScrollEnd={updateCurrentIndex}
            pagingEnabled
            data={images}
            contentOffset={{
              x: currentIndex * (dimensions.fullWidth - 32),
              y: 0,
            }}
            horizontal
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              backgroundColor: 'transparent',
              marginVertical: theme.spacing.double,
            }}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.url.m}
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    width: dimensions.fullWidth - 32,
                    // marginRight: 16,
                  }}>
                  <FastImage
                    resizeMode="cover"
                    style={styles.image}
                    source={{uri: item.url.m}}
                  />
                </View>
              );
            }}
          />
          <Footer />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  indicator: {
    height: 4,
    width: 4,
    marginHorizontal: 4,
    borderRadius: 2,
    backgroundColor: theme.color.white,
    opacity: 0.6,
  },
  errorView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBody: {
    // backgroundColor: theme.color.white,
    backgroundColor: 'transparent',
    borderRadius: theme.spacing.double,
    height: dimensions.fullHeight * 0.8,
    position: 'relative',
    // padding: theme.spacing.triple,
    // marginHorizontal: 16,
  },
  footerView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    borderRadius: theme.spacing.double,
  },
  headerView: {
    opacity: 1,
    position: 'absolute',
    right: 0,
    top: -28,
  },
});
