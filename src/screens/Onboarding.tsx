/* eslint-disable react-native/no-inline-styles */
import React, {Ref, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {theme} from '../theme/theme';
import {dimensions, TextStyle} from '../styles/base';
import {Button} from '../components/Button';
import {setAppState} from '../store/slices/app';
import {useAppDispatch} from '../hooks/redux';

const slides = [
  {
    image: require('../assets/images/slide-1.png'),
    title: 'Identify Plants',
    body: 'Identify plants from everywhere through your camera.',
  },
  {
    image: require('../assets/images/slide-2.png'),
    title: 'Create Collections',
    body: 'Create your own collections to save the detected plants.',
  },
  {
    image: require('../assets/images/slide-3.png'),
    title: 'Recommend Products',
    body: 'Recommend the related products on online marketplaces.',
  },
];
const Slide = ({item, currentIndex}) => {
  return (
    <View
      style={{
        justifyContent: 'flex-end',
        width: dimensions.fullWidth,
        paddingHorizontal: 16,
      }}>
      <View style={{marginBottom: 16}}>
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit
          style={{...TextStyle.h4Text, textAlign: 'center'}}>
          {item.title}
        </Text>
        <Text
          numberOfLines={2}
          adjustsFontSizeToFit
          style={{...TextStyle.bodyText, opacity: 0.6, textAlign: 'center'}}>
          {item.body}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 16,
        }}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              index === currentIndex && {
                backgroundColor: theme.color.primary,
                opacity: 1,
              },
            ]}
          />
        ))}
      </View>
      <View
        style={{
          height: '80%',
          marginTop: theme.spacing.double,
        }}>
        <Image
          style={{
            // width: '100%',
            flex: 1,
            width: undefined,
            height: undefined,
            // height: '100%',
          }}
          resizeMode={'contain'}
          source={item.image}
        />
      </View>
    </View>
  );
};
export const OnboardingScreen = ({navigation}) => {
  const dispatch = useAppDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref: Ref<FlatList> = useRef(null);
  const Footer = () => {
    return (
      <View
        style={{
          // height: dimensions.fullHeight * 0.25,
          // paddingTop: 32,
          // flex: 1,
          height: 80,
          justifyContent: 'center',
          paddingHorizontal: theme.spacing.triple,
        }}>
        <View
          style={{
            alignItems: 'flex-end',
          }}>
          {currentIndex === slides.length - 1 ? (
            <Button
              buttonStyle={{...styles.button}}
              textStyle={{color: theme.color.primary}}
              onPress={navigateToHome}
              text={'Getting started'}
            />
          ) : (
            <>
              <Button
                onPress={skipSlide}
                buttonStyle={{
                  ...styles.button,
                  backgroundColor: 'transparent',
                }}
                textStyle={{color: theme.color.dark}}
                text={'Skip'}
              />
            </>
          )}
        </View>
      </View>
    );
  };
  const updateCurrentIndex = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIdex = Math.round(contentOffsetX / dimensions.fullWidth);
    setCurrentIndex(currentIdex);
  };
  const skipSlide = () => {
    const lastIndex = slides.length - 1;
    const offset = lastIndex * dimensions.fullWidth;
    ref?.current?.scrollToOffset({offset});
    setCurrentIndex(lastIndex);
  };
  const navigateToHome = () => {
    navigation.replace('Home-Stack');
    dispatch(setAppState({isAppFristLoad: false}));
  };
  return (
    <>
      <StatusBar backgroundColor={theme.color.background} translucent />
      <View style={{flex: 1, backgroundColor: theme.color.background}}>
        <Footer />
        <FlatList
          ref={ref}
          onMomentumScrollEnd={updateCurrentIndex}
          pagingEnabled
          data={slides}
          horizontal
          style={{
            // height: dimensions.fullHeight * 0.8,
            backgroundColor: 'transparent',
          }}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.title}
          renderItem={({item}) => (
            <Slide currentIndex={currentIndex} item={item} />
          )}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  titleText: {...TextStyle.h4Text},
  bodyText: {
    ...TextStyle.bodyText,
  },
  indicator: {
    height: 4,
    width: 40,
    marginHorizontal: 4,
    borderRadius: 4,
    backgroundColor: theme.color.dark,
    opacity: 0.2,
  },
  button: {
    height: 60,
    // width: 80,
    padding: theme.spacing.base,
    borderRadius: theme.radius.small,
    backgroundColor: 'transparent',
  },
});
