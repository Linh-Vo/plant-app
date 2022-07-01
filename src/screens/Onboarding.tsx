import React, {Ref, useRef, useState} from 'react';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {theme} from '../theme/theme';
import {dimensions, TextStyle} from '../styles/base';
import {Button} from '../components/Button';
import {setUtilsSate} from '../store/slices/app';
import {useAppDispatch} from '../hooks/redux';

const slides = [
  {
    image: require('../assets/images/slide-1.png'),
    title: 'Identify Plants',
    body: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque',
  },
  {
    image: require('../assets/images/slide-2.png'),
    title: 'Create Your Own Collection',
    body: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque',
  },
  {
    image: require('../assets/images/slide-3.png'),
    title: 'Recommend Where To Buy Detected Plants',
    body: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque',
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
      <View style={{height: '75%'}}>
        <FastImage
          style={{
            width: dimensions.fullWidth,
            height: '100%',
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
          marginTop: 32,
          flex: 1,

          paddingHorizontal: theme.spacing.triple,
        }}>
        <View
          style={{
            marginTop: 16,
            alignItems: 'flex-end',
            justifyContent: 'center',
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
                  // borderWidth: 1,
                  // borderColor: theme.color.white,
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
  const goNextSlide = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex !== slides.length) {
      const offset = nextIndex * dimensions.fullWidth;
      ref?.current?.scrollToOffset({offset});
      setCurrentIndex(nextIndex);
    }
  };
  const skipSlide = () => {
    const lastIndex = slides.length - 1;
    const offset = lastIndex * dimensions.fullWidth;
    ref?.current?.scrollToOffset({offset});
    setCurrentIndex(lastIndex);
  };
  const navigateToHome = () => {
    navigation.replace('Home-Stack');
    dispatch(setUtilsSate({isAppFristLoad: false}));
  };
  return (
    <View style={{flex: 1, backgroundColor: theme.color.background}}>
      <Footer />
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentIndex}
        pagingEnabled
        data={slides}
        horizontal
        contentContainerStyle={
          {
            // height: dimensions.fullHeight * 0.7,
          }
        }
        style={{height: dimensions.fullHeight * 0.9}}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.title}
        renderItem={({item}) => (
          <Slide currentIndex={currentIndex} item={item} />
        )}
      />
    </View>
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
