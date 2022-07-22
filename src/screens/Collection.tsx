import React, {useRef, useState} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Container, TextStyle} from '../styles/base';
import {theme} from '../theme/theme';
import {CollectionBlock} from '../components/collection/CollectionBlock';
import {SAFE_AREA_PADDING} from '../utils/constants';
import ModalBlock from '../components/ModalBlock';
import {useAppDispatch, useAppSelector} from '../hooks/redux';
import {addCollection, selectCollections} from '../store/slices/collection';
import {generateUniqSerial} from '../utils/helper';
import {ErrorModal} from '../components/ErrorModal';
import FastImage from 'react-native-fast-image';
import FocusAwareStatusBar from '../components/FocusStatusBar';

export const CollectionScreen = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const collections = useAppSelector(selectCollections);
  const navigateToGarden = collection => () => {
    navigation.navigate('Collection-Stack', {
      screen: 'Garden',
      params: {collectionId: collection?.id},
    });
  };
  const dispatch = useAppDispatch();
  const createCollection = (name: string) => () => {
    const existedCollection = collections.find(e => e.name === name);
    if (!existedCollection) {
      dispatch(
        addCollection({
          id: generateUniqSerial(),
          name: name,
          plants: [],
        }),
      );
      setVisible(false);
      return true;
    } else {
      setErrorVisible(true);
      return false;
    }
  };
  console.log('collection');
  const [addModalVisible, setVisible] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  return (
    <>
      <FocusAwareStatusBar
        backgroundColor={'transparent'}
        translucent
        // hidden={Platform.OS === 'ios'}
        barStyle={'dark-content'}
      />
      <View style={{...styles.container, paddingTop: insets.top}}>
        <View style={styles.textView}>
          <Text style={styles.text}>{'Collections'}</Text>
          <TouchableOpacity
            onPress={() => setVisible(true)}
            style={styles.buttonContainer}>
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
                ...TextStyle.titleText,
                color: theme.color.primary,
                marginLeft: theme.spacing.half,
              }}>
              {'Create'}
            </Text>
          </TouchableOpacity>
        </View>
        {collections?.length > 0 ? (
          <ScrollView
            keyboardShouldPersistTaps={'handled'}
            showsVerticalScrollIndicator={false}
            style={styles.collectionView}>
            {collections.map((collection, idx) => (
              <View
                key={idx}
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  ...styles.blockView,
                  marginBottom: idx === collections.length - 1 ? 106 : 0,
                }}>
                <CollectionBlock
                  onPress={navigateToGarden(collection)}
                  key={idx}
                  collection={collection}
                />
              </View>
            ))}
          </ScrollView>
        ) : (
          <View
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              height: '90%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              // eslint-disable-next-line react-native/no-inline-styles
              style={{width: '80%', height: '40%'}}>
              <FastImage
                resizeMode="cover"
                style={Container.fullScreen}
                source={require('../assets/images/empty-collection.png')}
              />
            </View>

            <Text style={styles.emptyText}>
              {'You have not created any collections'}
            </Text>
            <TouchableOpacity
              onPress={() => setVisible(true)}
              style={styles.buttonContainer}>
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
                  ...TextStyle.titleText,
                  color: theme.color.primary,
                  marginLeft: theme.spacing.half,
                }}>
                {'Create collection'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <ModalBlock
        extraAction={createCollection}
        isVisible={addModalVisible}
        onBackdropPress={() => setVisible(false)}
        title={'Create Collection'}>
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.color.background,
    padding: theme.spacing.double,
  },
  textView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    flex: 1,
    ...TextStyle.h4Text,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.base,
  },
  collectionView: {
    marginTop: 34,
  },
  blockView: {
    marginTop: theme.spacing.double,
    width: '100%',
  },
  emptyText: {
    ...TextStyle.titleText,
    opacity: 0.6,
    marginTop: theme.spacing.double,
  },
});
