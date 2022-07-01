/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {theme} from '../../theme/theme';
import {Button} from '../../components/Button';
import Svg, {Path} from 'react-native-svg';
import {SAFE_AREA_PADDING} from '../../utils/constants';
import {TextStyle} from '../../styles/base';
import {ScanTipModal} from './ScantipModal';

export const DetectError = ({route, navigation}) => {
  const {path, type, errorText} = route?.params;
  const goBack = () => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'Camera',
        },
      ],
    });
  };
  const [isVisibleScanTip, setScanTipVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.imageView}>
        {path && (
          <Image
            style={styles.image}
            source={{
              uri:
                type === 'capture'
                  ? Platform.OS === 'android'
                    ? `file:///${path}`
                    : path
                  : path,
            }}
          />
        )}
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.errorView}>
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path
              opacity="0.4"
              d="M21.76 15.92L15.36 4.4C14.5 2.85 13.31 2 12 2C10.69 2 9.49998 2.85 8.63998 4.4L2.23998 15.92C1.42998 17.39 1.33998 18.8 1.98998 19.91C2.63998 21.02 3.91998 21.63 5.59998 21.63H18.4C20.08 21.63 21.36 21.02 22.01 19.91C22.66 18.8 22.57 17.38 21.76 15.92Z"
              fill="#FF8A48"
            />
            <Path
              d="M12 14.75C11.59 14.75 11.25 14.41 11.25 14V9C11.25 8.59 11.59 8.25 12 8.25C12.41 8.25 12.75 8.59 12.75 9V14C12.75 14.41 12.41 14.75 12 14.75Z"
              fill="#FF8A48"
            />
            <Path
              d="M12 18.0001C11.94 18.0001 11.87 17.9901 11.8 17.9801C11.74 17.9701 11.68 17.9501 11.62 17.9201C11.56 17.9001 11.5 17.8701 11.44 17.8301C11.39 17.7901 11.34 17.7501 11.29 17.7101C11.11 17.5201 11 17.2601 11 17.0001C11 16.7401 11.11 16.4801 11.29 16.2901C11.34 16.2501 11.39 16.2101 11.44 16.1701C11.5 16.1301 11.56 16.1001 11.62 16.0801C11.68 16.0501 11.74 16.0301 11.8 16.0201C11.93 15.9901 12.07 15.9901 12.19 16.0201C12.26 16.0301 12.32 16.0501 12.38 16.0801C12.44 16.1001 12.5 16.1301 12.56 16.1701C12.61 16.2101 12.66 16.2501 12.71 16.2901C12.89 16.4801 13 16.7401 13 17.0001C13 17.2601 12.89 17.5201 12.71 17.7101C12.66 17.7501 12.61 17.7901 12.56 17.8301C12.5 17.8701 12.44 17.9001 12.38 17.9201C12.32 17.9501 12.26 17.9701 12.19 17.9801C12.13 17.9901 12.06 18.0001 12 18.0001Z"
              fill="#FF8A48"
            />
          </Svg>
          <Text
            style={{
              ...TextStyle.bodyText,
              marginLeft: theme.spacing.base,
              color: theme.color.warning,
            }}>
            {errorText ? errorText : 'Cannot detect!'}
          </Text>
        </View>

        <Text style={{...TextStyle.bodyText, textAlign: 'center'}}>
          {'Retake a photo and try again'}
        </Text>
        <Button
          onPress={goBack}
          textStyle={{color: theme.color.white}}
          buttonStyle={styles.retakeButton}
          text={'Retake'}
        />
      </View>
      <TouchableOpacity
        onPress={() => setScanTipVisible(true)}
        style={styles.snapButton}>
        <Text style={{...TextStyle.baseText, color: theme.color.primary}}>
          {'Snap tips'}
        </Text>
        <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <Path
            opacity="0.4"
            d="M9.99996 18.3333C14.6023 18.3333 18.3333 14.6023 18.3333 9.99996C18.3333 5.39759 14.6023 1.66663 9.99996 1.66663C5.39759 1.66663 1.66663 5.39759 1.66663 9.99996C1.66663 14.6023 5.39759 18.3333 9.99996 18.3333Z"
            fill="#678F58"
          />
          <Path
            d="M10 11.4583C10.3417 11.4583 10.625 11.175 10.625 10.8333V6.66663C10.625 6.32496 10.3417 6.04163 10 6.04163C9.65833 6.04163 9.375 6.32496 9.375 6.66663V10.8333C9.375 11.175 9.65833 11.4583 10 11.4583Z"
            fill="#678F58"
          />
          <Path
            d="M10.7666 13.0167C10.725 12.9167 10.6666 12.825 10.5916 12.7417C10.5083 12.6667 10.4166 12.6083 10.3166 12.5667C10.1166 12.4833 9.88329 12.4833 9.68329 12.5667C9.58329 12.6083 9.49163 12.6667 9.40829 12.7417C9.33329 12.825 9.27496 12.9167 9.23329 13.0167C9.19163 13.1167 9.16663 13.225 9.16663 13.3333C9.16663 13.4417 9.19163 13.55 9.23329 13.65C9.27496 13.7583 9.33329 13.8417 9.40829 13.925C9.49163 14 9.58329 14.0583 9.68329 14.1C9.78329 14.1417 9.89163 14.1667 9.99996 14.1667C10.1083 14.1667 10.2166 14.1417 10.3166 14.1C10.4166 14.0583 10.5083 14 10.5916 13.925C10.6666 13.8417 10.725 13.7583 10.7666 13.65C10.8083 13.55 10.8333 13.4417 10.8333 13.3333C10.8333 13.225 10.8083 13.1167 10.7666 13.0167Z"
            fill="#678F58"
          />
        </Svg>
      </TouchableOpacity>
      <ScanTipModal
        backdropPress={() => setScanTipVisible(false)}
        isVisible={isVisibleScanTip}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    padding: SAFE_AREA_PADDING.paddingLeft,
  },
  imageView: {
    // flex: 1,
    padding: '10%',
    height: '60%',
    marginTop: SAFE_AREA_PADDING.paddingTop,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: theme.spacing.double,
  },
  buttonContainer: {
    paddingHorizontal: '15%',
    width: '100%',
    height: '30%',
    // flex: 1,
  },
  retakeButton: {
    marginTop: theme.spacing.double,
    backgroundColor: theme.color.primary,
  },
  errorView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  snapButton: {
    marginHorizontal: '15%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.double,
    backgroundColor: '#678F5826',
    borderRadius: 12,
  },
});
