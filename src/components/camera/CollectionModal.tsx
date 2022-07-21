import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
} from 'react-native';
import Modal from 'react-native-modal';
import Svg, {Path} from 'react-native-svg';
import {TextStyle} from '../../styles/base';
import {theme} from '../../theme/theme';
import ModalBlock from '../ModalBlock';
import {useAppSelector, useAppDispatch} from '../../hooks/redux';
import {
  selectCollections,
  addCollection,
  addPlantToCollection,
} from '../../store/slices/collection';
import {generateUniqSerial} from '../../utils/helper';
import {ErrorModal} from '../../components/ErrorModal';
import {PlantResult} from '../../types';
import {updateScanCollection} from '../../store/slices/scan';

const ModalBody = ({backDropPress, collections, plant, isScanBlock}) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [isVisible, setVisible] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const createCollection = (collectionName: string) => () => {
    const collectionId = generateUniqSerial();
    const existedCollection = collections.find(
      e => e.id === collectionId || e.name === collectionName,
    );
    if (!existedCollection) {
      dispatch(
        addCollection({
          id: collectionId,
          name: collectionName,
          plants: [plant],
        }),
      );
      navigation.navigate('Collection-Stack', {
        screen: 'Garden',
        params: {collectionId},
      });
      backDropPress();
    } else {
      setErrorVisible(true);
    }
  };
  return (
    <>
      <View>
        <View style={{alignItems: 'center'}}>
          <Text style={{...TextStyle.h4Text, textAlign: 'center'}}>
            {'Add to Collection'}
          </Text>
        </View>
        <View
          style={{
            marginTop: theme.spacing.double,
          }}>
          {collections?.map((col, idx) => (
            <View key={idx}>
              <TouchableOpacity
                key={idx}
                onPress={() => {
                  backDropPress();
                  dispatch(
                    addPlantToCollection({
                      collectionId: col?.id,
                      fromScanHistory: isScanBlock,
                      plant,
                    }),
                  );

                  navigation.navigate('Collection-Stack', {
                    screen: 'Garden',
                    params: {collectionId: col?.id},
                  });
                }}
                style={styles.button}>
                <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M21.06 11.82L20.9 11.6C20.62 11.26 20.29 10.99 19.91 10.79C19.4 10.5 18.82 10.35 18.22 10.35H5.76995C5.16995 10.35 4.59995 10.5 4.07995 10.79C3.68995 11 3.33995 11.29 3.04995 11.65C2.47995 12.38 2.20995 13.28 2.29995 14.18L2.66995 18.85C2.79995 20.26 2.96995 22 6.13995 22H17.86C21.03 22 21.19 20.26 21.33 18.84L21.7 14.19C21.79 13.35 21.57 12.51 21.06 11.82ZM14.39 17.34H9.59995C9.20995 17.34 8.89995 17.02 8.89995 16.64C8.89995 16.26 9.20995 15.94 9.59995 15.94H14.39C14.78 15.94 15.09 16.26 15.09 16.64C15.09 17.03 14.78 17.34 14.39 17.34Z"
                    fill="#678F58"
                  />
                  <Path
                    opacity="0.4"
                    d="M3.37988 11.31C3.59988 11.11 3.81988 10.93 4.07988 10.79C4.58988 10.5 5.16988 10.35 5.76988 10.35H18.2299C18.8299 10.35 19.3999 10.5 19.9199 10.79C20.1799 10.93 20.4099 11.11 20.6199 11.32V10.79V9.82C20.6199 6.25 19.5299 5.16 15.9599 5.16H13.5799C13.1399 5.16 13.1299 5.15 12.8699 4.81L11.6699 3.2C11.0999 2.46 10.6499 2 9.21988 2H8.03988C4.46988 2 3.37988 3.09 3.37988 6.66V10.8V11.31Z"
                    fill="#678F58"
                  />
                </Svg>

                <Text style={styles.colText}>{col?.name}</Text>
              </TouchableOpacity>
              <View style={styles.horizontalLine} />
            </View>
          ))}
          <TouchableOpacity
            onPress={() => setVisible(true)}
            style={{...styles.button, marginBottom: theme.spacing.double}}>
            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <Path
                opacity="0.4"
                d="M21.74 9.44H2V6.42C2 3.98 3.98 2 6.42 2H8.75C10.38 2 10.89 2.53 11.54 3.4L12.94 5.26C13.25 5.67 13.29 5.73 13.87 5.73H16.66C19.03 5.72 21.05 7.28 21.74 9.44Z"
                fill="#678F58"
              />
              <Path
                d="M21.99 10.8399C21.97 10.3499 21.89 9.88994 21.74 9.43994H2V16.6499C2 19.5999 4.4 21.9999 7.35 21.9999H16.65C19.6 21.9999 22 19.5999 22 16.6499V11.0699C22 10.9999 22 10.9099 21.99 10.8399ZM14.5 16.2499H12.81V17.9999C12.81 18.4099 12.47 18.7499 12.06 18.7499C11.65 18.7499 11.31 18.4099 11.31 17.9999V16.2499H9.5C9.09 16.2499 8.75 15.9099 8.75 15.4999C8.75 15.0899 9.09 14.7499 9.5 14.7499H11.31V12.9999C11.31 12.5899 11.65 12.2499 12.06 12.2499C12.47 12.2499 12.81 12.5899 12.81 12.9999V14.7499H14.5C14.91 14.7499 15.25 15.0899 15.25 15.4999C15.25 15.9099 14.91 16.2499 14.5 16.2499Z"
                fill="#678F58"
              />
            </Svg>
            <Text
              style={{
                ...TextStyle.bodyText,
                color: theme.color.primary,
                marginLeft: theme.spacing.medium,
              }}>
              {'Create Collection'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ModalBlock
        title={'Create Collection'}
        extraAction={createCollection}
        onBackdropPress={() => {
          setVisible(false);
        }}
        isVisible={isVisible}>
        {errorVisible && (
          <ErrorModal
            isVisible={errorVisible}
            backdropPress={() => setErrorVisible(false)}
            message={'Collection name already existed!'}
          />
        )}
      </ModalBlock>
    </>
  );
};

export const CollectionModal = ({
  isVisible,
  backDropPress,
  plant,
  isScanBlock,
}: {
  isVisible: boolean;
  backDropPress: any;
  plant: PlantResult;
  isScanBlock?: boolean;
}) => {
  const collections = useAppSelector(selectCollections);
  return (
    <>
      <View style={styles.container}>
        <Modal
          backdropTransitionOutTiming={0}
          useNativeDriver={true}
          isVisible={isVisible}
          hasBackdrop={true}
          statusBarTranslucent
          deviceHeight={Dimensions.get('screen').height}
          style={styles.modal}
          backdropColor={theme.color.dark}
          backdropOpacity={0.8}
          onBackdropPress={backDropPress}
          animationIn={'fadeInUp'}
          animationOut={'fadeOutDown'}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            style={styles.modalBody}>
            <ModalBody
              isScanBlock={isScanBlock}
              plant={plant}
              collections={collections}
              backDropPress={backDropPress}
            />
          </ScrollView>
        </Modal>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalBody: {
    padding: theme.spacing.double,
    backgroundColor: theme.color.white,
    maxHeight: '35%',
    borderTopLeftRadius: theme.radius.large,
    borderTopRightRadius: theme.radius.large,
  },
  button: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: theme.spacing.medium,
  },
  horizontalLine: {
    borderBottomColor: theme.border.primary,
    borderBottomWidth: 1,
  },
  headerView: {flexDirection: 'row', justifyContent: 'space-between'},
  input: {
    borderColor: 'rgba(34, 34, 34, 0.1)',
    padding: theme.spacing.double,
    borderRadius: theme.radius.xMedium,
    borderWidth: 1,
    borderStyle: 'solid',
    marginVertical: theme.spacing.double,
  },
  colText: {
    ...TextStyle.bodyText,
    flexShrink: 1,
    marginLeft: theme.spacing.medium,
  },
});
