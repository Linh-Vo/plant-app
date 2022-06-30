import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import Modal from 'react-native-modal';
import Svg, {Path} from 'react-native-svg';
import {TextStyle} from '../styles/base';
import {theme} from '../theme/theme';

export const ErrorModal = ({isVisible, message, backdropPress}) => {
  return (
    <View style={styles.container}>
      <Modal
        isVisible={isVisible}
        hasBackdrop={true}
        coverScreen={true}
        statusBarTranslucent
        deviceHeight={Dimensions.get('screen').height}
        onBackdropPress={backdropPress}
        backdropColor={theme.color.dark}
        backdropOpacity={0.8}
        animationIn={'fadeInLeft'}
        animationOut={'fadeOutRight'}>
        <View style={styles.modalBody}>
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
                ...TextStyle.titleText,
                marginLeft: theme.spacing.base,
                color: theme.color.warning,
              }}>
              {'Error'}
            </Text>
          </View>
          <Text
            style={{
              ...TextStyle.titleText,
              marginTop: theme.spacing.double,
              color: theme.color.danger,
            }}>
            {message}
          </Text>
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
    alignItems: 'center',
    paddingVertical: 16,
    marginHorizontal: 16,
  },
});
