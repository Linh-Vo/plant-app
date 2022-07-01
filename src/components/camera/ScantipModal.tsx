import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
import Modal from 'react-native-modal';
import {Button} from '../../components/Button';
import {theme} from '../../theme/theme';

export const ScanTipModal = ({isVisible, backdropPress}) => {
  return (
    <View style={styles.container}>
      <Modal
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
          <FastImage
            // eslint-disable-next-line react-native/no-inline-styles
            style={{width: '100%', height: '80%'}}
            resizeMode={'contain'}
            source={require('../../assets/images/scan-tips.png')}
          />
          <Button
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
    backgroundColor: '#232323',
    justifyContent: 'center',
    borderRadius: theme.spacing.double,
    alignItems: 'center',
    paddingVertical: 16,
    height: '80%',
    // marginHorizontal: 16,
  },
  button: {
    width: '80%',
    height: '10%',
    backgroundColor: 'white',
    marginTop: 16,
  },
});
