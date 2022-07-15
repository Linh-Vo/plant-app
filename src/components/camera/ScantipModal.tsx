import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Pressable,
  Text,
  ScrollView,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Modal from 'react-native-modal';
import {dimensions, TextStyle} from '../../styles/base';
import {Button} from '../../components/Button';
import {theme} from '../../theme/theme';
import Svg, {Path} from 'react-native-svg';

export const ScanTipModal = ({isVisible, backdropPress}) => {
  return (
    <View style={styles.container}>
      <Modal
        backdropTransitionOutTiming={0}
        useNativeDriver={true}
        isVisible={isVisible}
        statusBarTranslucent
        deviceHeight={Dimensions.get('screen').height}
        style={StyleSheet.absoluteFill}
        backdropColor={theme.color.dark}
        backdropOpacity={0.8}
        animationIn={'fadeInUpBig'}
        animationOut={'fadeOutDown'}>
        <View style={styles.modalBody}>
          <View style={styles.headerView}>
            <Text
              style={{
                ...TextStyle.titleText,
                fontFamily: theme.font.familyBold,
              }}>
              {'Scan tips'}
            </Text>
            <Pressable onPress={backdropPress}>
              <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <Path
                  opacity="0.4"
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  fill="#222222"
                />
                <Path
                  d="M13.06 11.9999L15.36 9.69986C15.65 9.40986 15.65 8.92986 15.36 8.63986C15.07 8.34986 14.59 8.34986 14.3 8.63986L12 10.9399L9.7 8.63986C9.41 8.34986 8.93 8.34986 8.64 8.63986C8.35 8.92986 8.35 9.40986 8.64 9.69986L10.94 11.9999L8.64 14.2999C8.35 14.5899 8.35 15.0699 8.64 15.3599C8.79 15.5099 8.98 15.5799 9.17 15.5799C9.36 15.5799 9.55 15.5099 9.7 15.3599L12 13.0599L14.3 15.3599C14.45 15.5099 14.64 15.5799 14.83 15.5799C15.02 15.5799 15.21 15.5099 15.36 15.3599C15.65 15.0699 15.65 14.5899 15.36 14.2999L13.06 11.9999Z"
                  fill="#222222"
                />
              </Svg>
            </Pressable>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{paddingTop: 16}}>
              <FastImage
                resizeMode="contain"
                style={{width: '100%', aspectRatio: 3 / 2}}
                source={require('../../assets/images/correct-image.png')}
              />
              <Text
                style={{
                  ...TextStyle.titleText,
                  textAlign: 'center',
                  paddingTop: theme.spacing.half,
                }}>
                {'The following will lead to poor results'}
              </Text>
            </View>
            <View style={{paddingTop: 16, flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <FastImage
                  resizeMode="contain"
                  style={{width: '100%', aspectRatio: 3 / 2}}
                  source={require('../../assets/images/too-far.png')}
                />
                <Text
                  style={{
                    ...TextStyle.titleText,
                    textAlign: 'center',
                    paddingTop: theme.spacing.half,
                  }}>
                  {'Too far'}
                </Text>
              </View>
              <View style={{width: theme.spacing.double}} />
              <View style={{flex: 1}}>
                <FastImage
                  resizeMode="contain"
                  style={{width: '100%', aspectRatio: 3 / 2}}
                  source={require('../../assets/images/too-close.png')}
                />
                <Text
                  style={{
                    ...TextStyle.titleText,
                    textAlign: 'center',
                    paddingTop: theme.spacing.half,
                  }}>
                  {'Too close'}
                </Text>
              </View>
            </View>
            <View style={{paddingTop: 16, flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <FastImage
                  resizeMode="contain"
                  style={{width: '100%', aspectRatio: 3 / 2}}
                  source={require('../../assets/images/blurry.png')}
                />
                <Text
                  style={{
                    ...TextStyle.titleText,
                    textAlign: 'center',
                    paddingTop: theme.spacing.half,
                  }}>
                  {'Blurry'}
                </Text>
              </View>
              <View style={{width: theme.spacing.double}} />
              <View style={{flex: 1}}>
                <FastImage
                  resizeMode="contain"
                  style={{width: '100%', aspectRatio: 3 / 2}}
                  source={require('../../assets/images/multi-species.png')}
                />
                <Text
                  style={{
                    ...TextStyle.titleText,
                    textAlign: 'center',
                    paddingTop: theme.spacing.half,
                  }}>
                  {'Multiple species'}
                </Text>
              </View>
            </View>
          </ScrollView>
          <Button
            textStyle={{color: theme.color.white}}
            buttonStyle={styles.button}
            onPress={backdropPress}
            text={'Got it'}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBody: {
    backgroundColor: theme.color.white,
    borderRadius: theme.spacing.double,
    height: dimensions.fullHeight * 0.8,
    padding: theme.spacing.double,
    // marginHorizontal: 16,
  },
  button: {
    marginTop: 16,
  },
  headerView: {flexDirection: 'row', justifyContent: 'space-between'},
});
