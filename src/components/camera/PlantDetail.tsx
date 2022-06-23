/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import axios from 'axios';
import {TextStyle} from '../../styles/base';
import {theme} from '../../theme/theme';
import {Button} from '../../components/Button';
import Svg, {Path} from 'react-native-svg';
import {SAFE_AREA_PADDING} from '../../utils/constants';
import FastImage from 'react-native-fast-image';
import {CollectionModal} from './CollectionModal';
import {PlantImage, PlantWikiInfo} from '../../types';

export const PlantDetail = ({route, navigation}) => {
  const {plant, hideCollection} = route?.params;
  const [wikiInfo, setInfo] = useState<PlantWikiInfo | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    axios
      .get('http://192.168.1.3:8000/wiki-info', {
        params: {
          plant_name: plant?.species?.scientificNameWithoutAuthor,
        },
      })
      .then(res => setInfo(res.data));
  }, []);
  console.log('WIKI', wikiInfo, plant?.species?.commonNames);
  const navigateToCollection = () => {
    setVisible(true);
  };
  const goBack = () => {
    navigation.goBack();
  };
  const [showHeaderBar, setShowHeaderBar] = useState(false);
  return (
    <View style={{flex: 1, position: 'relative'}}>
      <Animated.ScrollView
        // renderToHardwareTextureAndroid
        onScroll={event => {
          const scrolling = event.nativeEvent.contentOffset.y;
          // setShow(false);
          if (scrolling > 80) {
            setShowHeaderBar(true);
            // fadeIn();
          } else {
            setShowHeaderBar(false);
            // fadeOut();
          }
        }}
        // onScroll will be fired every 16ms
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <FastImage
          resizeMode={'cover'}
          style={{height: 250, position: 'relative'}}
          source={{uri: plant?.images[0]?.url?.m}}>
          <TouchableOpacity onPress={goBack} style={styles.closeButton}>
            <Svg width="44" height="44" viewBox="0 0 44 44" fill="none">
              <Path
                opacity="0.2"
                d="M22 40.3333C32.1252 40.3333 40.3333 32.1252 40.3333 22C40.3333 11.8748 32.1252 3.66667 22 3.66667C11.8747 3.66667 3.66663 11.8748 3.66663 22C3.66663 32.1252 11.8747 40.3333 22 40.3333Z"
                fill="white"
              />
              <Path
                d="M24.31 29.8467C23.9616 29.8467 23.6133 29.7183 23.3383 29.4433L16.8666 22.9717C16.335 22.44 16.335 21.56 16.8666 21.0283L23.3383 14.5567C23.87 14.025 24.75 14.025 25.2816 14.5567C25.8133 15.0883 25.8133 15.9683 25.2816 16.5L19.7816 22L25.2816 27.5C25.8133 28.0317 25.8133 28.9117 25.2816 29.4433C25.025 29.7183 24.6766 29.8467 24.31 29.8467Z"
                fill="white"
              />
            </Svg>
          </TouchableOpacity>
        </FastImage>
        <View
          style={{
            marginTop: -32,
            backgroundColor: theme.color.background,
            borderTopLeftRadius: theme.spacing.quadruple,
            borderTopRightRadius: theme.spacing.quadruple,
            padding: theme.spacing.double,
            marginBottom: !hideCollection ? 40 : 0,
          }}>
          <View>
            <Text style={{...TextStyle.bodyText, color: theme.color.primary}}>
              {`${(Number(plant.score) * 100).toFixed(2)}% matched`}
            </Text>
            <Text style={{...TextStyle.h4Text, marginTop: theme.spacing.base}}>
              {plant?.species?.scientificNameWithoutAuthor}
            </Text>
          </View>
          <View style={{marginTop: theme.spacing.triple}}>
            <Text style={{...TextStyle.bodyText, opacity: 0.6}}>
              {'Botanical name'}
            </Text>
            <Text
              style={{...TextStyle.titleText, marginTop: theme.spacing.base}}>
              {plant?.species?.scientificName}
            </Text>
          </View>
          {plant?.species?.commonNames.length ? (
            <View style={{marginTop: theme.spacing.triple}}>
              <Text style={{...TextStyle.bodyText, opacity: 0.6}}>
                {'Common names'}
              </Text>
              <Text
                style={{
                  ...TextStyle.titleText,
                  marginTop: theme.spacing.base,
                }}>
                {plant?.species?.commonNames.join(', ')}
              </Text>
            </View>
          ) : null}

          {wikiInfo?.description || wikiInfo?.introduction ? (
            <View style={{marginTop: theme.spacing.triple}}>
              <Text style={{...TextStyle.bodyText, opacity: 0.6}}>
                {'Description'}
              </Text>
              <Text
                style={{
                  ...TextStyle.titleText,
                  marginTop: theme.spacing.base,
                }}>
                {(wikiInfo?.description?.length &&
                  wikiInfo?.description?.join()) ||
                  wikiInfo?.introduction}
              </Text>
              <Text
                style={{
                  ...TextStyle.titleText,
                  color: theme.color.primary,
                  marginTop: theme.spacing.base,
                }}
                onPress={() =>
                  Linking.openURL(
                    `https://en.wikipedia.org/wiki/${plant?.species?.scientificNameWithoutAuthor}`,
                  )
                }>
                {'Read more on Wikipedia'}
              </Text>
            </View>
          ) : null}
          <View style={{marginTop: theme.spacing.triple}}>
            <Text style={{...TextStyle.bodyText, opacity: 0.6}}>
              {'Photos'}
            </Text>
            <ScrollView
              style={styles.imageContainer}
              horizontal
              showsHorizontalScrollIndicator={false}>
              {plant.images.map((image: PlantImage, idx: number) => (
                <FastImage
                  style={styles.image}
                  key={idx}
                  source={{uri: image.url.m}}
                />
              ))}
            </ScrollView>
          </View>
        </View>
      </Animated.ScrollView>
      {!hideCollection && (
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            height: '10%',
            padding: theme.spacing.double,
            width: '100%',
            flexDirection: 'row',
            shadowColor: '#000000',
            shadowRadius: 10,
            shadowOffset: {
              width: 0,
              height: -4,
            },
            alignItems: 'center',
            shadowOpacity: 0.05,
            elevation: 1,
            backgroundColor: theme.color.white,
          }}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Home-Stack', {
                screen: 'Around',
              })
            }
            style={{
              paddingRight: theme.spacing.double,
              alignItems: 'center',
            }}>
            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <Path
                opacity="0.4"
                d="M8.55999 3.34V17.67C8.21999 17.68 7.87999 17.76 7.62999 17.91L5.27999 19.25C3.63999 20.19 2.28999 19.41 2.28999 17.51V7.78C2.28999 7.15 2.73999 6.37 3.29999 6.05L7.62999 3.57C7.87999 3.43 8.21999 3.35 8.55999 3.34Z"
                fill={'#678F58'}
              />
              <Path
                d="M15.73 6.33V20.66C15.38 20.67 15.04 20.61 14.77 20.48L9.52 17.85C9.25 17.72 8.91 17.66 8.56 17.67V3.34C8.91 3.33 9.25 3.39 9.52 3.52L14.77 6.15C15.04 6.28 15.38 6.34 15.73 6.33Z"
                fill={'#678F58'}
              />
              <Path
                opacity="0.4"
                d="M22 6.49V16.22C22 16.85 21.55 17.63 20.99 17.95L16.66 20.43C16.41 20.57 16.07 20.65 15.73 20.66V6.33C16.07 6.32 16.41 6.24 16.66 6.09L19.01 4.75C20.65 3.81 22 4.59 22 6.49Z"
                fill={'#678F58'}
              />
            </Svg>
            <Text
              style={{
                ...TextStyle.baseText,
                color: '#222',
              }}>
              {'Around'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Home-Stack', {
                screen: 'Community',
              })
            }
            style={{
              paddingRight: theme.spacing.double,
              alignItems: 'center',
            }}>
            <Svg width="24" height="25" viewBox="0 0 24 25" fill="none">
              <Path
                opacity="0.4"
                d="M20.36 13.23C19.99 13.23 19.68 12.95 19.64 12.58C19.4 10.38 18.22 8.40001 16.4 7.14001C16.07 6.91001 15.99 6.46001 16.22 6.13001C16.45 5.80001 16.9 5.72001 17.23 5.95001C19.4 7.46001 20.8 9.82001 21.09 12.43C21.13 12.83 20.84 13.19 20.44 13.23C20.41 13.23 20.39 13.23 20.36 13.23Z"
                fill="#678F58"
              />
              <Path
                opacity="0.4"
                d="M3.74004 13.28C3.72004 13.28 3.69004 13.28 3.67004 13.28C3.27004 13.24 2.98004 12.88 3.02004 12.48C3.29004 9.86999 4.67004 7.50999 6.82004 5.98999C7.14004 5.75999 7.60004 5.83999 7.83004 6.15999C8.06004 6.48999 7.98004 6.93999 7.66004 7.16999C5.86004 8.44999 4.69004 10.43 4.47004 12.62C4.43004 13 4.11004 13.28 3.74004 13.28Z"
                fill="#678F58"
              />
              <Path
                opacity="0.4"
                d="M15.99 21.6C14.76 22.19 13.44 22.49 12.06 22.49C10.62 22.49 9.24998 22.17 7.96998 21.52C7.60998 21.35 7.46998 20.91 7.64998 20.55C7.81998 20.19 8.25998 20.05 8.61998 20.22C9.24998 20.54 9.91998 20.76 10.6 20.89C11.52 21.07 12.46 21.08 13.38 20.92C14.06 20.8 14.73 20.59 15.35 20.29C15.72 20.12 16.16 20.26 16.32 20.63C16.5 20.99 16.36 21.43 15.99 21.6Z"
                fill="#678F58"
              />
              <Path
                d="M12.05 2.51001C10.5 2.51001 9.22998 3.77001 9.22998 5.33001C9.22998 6.89001 10.49 8.15001 12.05 8.15001C13.61 8.15001 14.87 6.89001 14.87 5.33001C14.87 3.77001 13.61 2.51001 12.05 2.51001Z"
                fill="#678F58"
              />
              <Path
                d="M5.04998 14.37C3.49998 14.37 2.22998 15.63 2.22998 17.19C2.22998 18.75 3.48998 20.01 5.04998 20.01C6.60998 20.01 7.86998 18.75 7.86998 17.19C7.86998 15.63 6.59998 14.37 5.04998 14.37Z"
                fill="#678F58"
              />
              <Path
                d="M18.95 14.37C17.4 14.37 16.13 15.63 16.13 17.19C16.13 18.75 17.39 20.01 18.95 20.01C20.51 20.01 21.77 18.75 21.77 17.19C21.77 15.63 20.51 14.37 18.95 14.37Z"
                fill="#678F58"
              />
            </Svg>
            <Text
              style={{
                ...TextStyle.baseText,
                color: '#222',
              }}>
              {'Share'}
            </Text>
          </TouchableOpacity>
          <Button
            onPress={navigateToCollection}
            buttonStyle={{flex: 1}}
            textStyle={{color: theme.color.white}}
            text={'Save to collection'}
          />
        </View>
      )}
      {showHeaderBar && (
        <AnimatedHeader
          plantName={plant?.species?.scientificNameWithoutAuthor}
          goBack={goBack}
        />
      )}
      <CollectionModal
        isVisible={visible}
        backDropPress={() => setVisible(false)}
        plant={plant}
      />
    </View>
  );
};

const AnimatedHeader = ({goBack, plantName}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [fadeAnim]);
  const backgroundColor = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(34, 34, 34, 0.9)', theme.color.background],
  });
  return (
    <Animated.View
      style={{
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        top: 0,
        height: 88,
        width: '100%',
        opacity: fadeAnim,
        backgroundColor: backgroundColor,
      }}>
      <TouchableOpacity onPress={goBack} style={styles.closeButton}>
        <Svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <Path
            opacity="0.2"
            d="M16 29.3334C23.3638 29.3334 29.3333 23.3639 29.3333 16.0001C29.3333 8.63628 23.3638 2.66675 16 2.66675C8.63616 2.66675 2.66663 8.63628 2.66663 16.0001C2.66663 23.3639 8.63616 29.3334 16 29.3334Z"
            fill="#222222"
          />
          <Path
            d="M17.68 21.7066C17.4267 21.7066 17.1734 21.6133 16.9734 21.4133L12.2667 16.7066C11.88 16.32 11.88 15.68 12.2667 15.2933L16.9734 10.5866C17.36 10.2 18 10.2 18.3867 10.5866C18.7734 10.9733 18.7734 11.6133 18.3867 12L14.3867 16L18.3867 20C18.7734 20.3866 18.7734 21.0266 18.3867 21.4133C18.2 21.6133 17.9467 21.7066 17.68 21.7066Z"
            fill="#222222"
          />
        </Svg>
      </TouchableOpacity>
      <Animated.Text
        style={{
          ...TextStyle.h4Text,
          color: fadeAnim.interpolate({
            inputRange: [0, 1],
            outputRange: ['transparent', theme.color.dark],
          }),
          marginLeft: theme.spacing.double,
          marginTop: SAFE_AREA_PADDING.paddingTop + theme.spacing.double,
        }}>
        {plantName}
      </Animated.Text>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '20%',
    width: '100%',
    // flex: 1,
    height: '70%',
    borderTopLeftRadius: theme.spacing.quadruple,
    borderTopRightRadius: theme.spacing.quadruple,
    padding: theme.spacing.double,
    marginBottom: 100,
    backgroundColor: theme.color.background,
    // paddingTop: '20%',
  },
  imageContainer: {
    marginVertical: theme.spacing.triple,
  },
  image: {
    width: 72,
    height: 72,
    borderRadius: 36,
    marginRight: theme.spacing.half,
  },
  closeButton: {
    marginTop: SAFE_AREA_PADDING.paddingTop + theme.spacing.double,
    marginLeft: SAFE_AREA_PADDING.paddingLeft,
  },
});
