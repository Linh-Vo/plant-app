/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {TextStyle} from '../styles/base';
import {PlantResult, SnapInfo} from '../types';
import {theme} from '../theme/theme';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import Svg, {Path} from 'react-native-svg';
import {EditMenu} from './collection/EditMenu';
import {CollectionState} from '../store/slices/collection';
import {CollectionModal} from './camera/CollectionModal';

interface DetectResultProps {
  plant: PlantResult;
  isGarden?: boolean;
  hideCollection?: boolean;
  collection?: CollectionState;
  textStyle?: StyleProp<any>;
  isScanBlock?: boolean;
  scanHistory?: SnapInfo;
}
export const ResultBlock = (props: DetectResultProps) => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const gotoPlantDetail = () => {
    navigation.navigate('Plant-Detail', {
      plant: props.plant,
      hideCollection: props.hideCollection,
    });
  };
  const [menuVisible, setMenuVisible] = useState(false);
  return (
    <>
      <TouchableOpacity
        style={{...styles.container, height: props.isScanBlock ? 204 : 168}}
        onPress={gotoPlantDetail}>
        <View style={{flexDirection: 'row'}}>
          <View style={{paddingBottom: theme.spacing.triple, flex: 1}}>
            {!props.isGarden && !props.isScanBlock && props.plant.score && (
              <Text style={[TextStyle.bodyText, props.textStyle]}>
                {`${(Number(props.plant.score) * 100).toFixed(2)}% matched`}
              </Text>
            )}
            <Text numberOfLines={1} style={TextStyle.titleText}>
              {props.plant.species.customName ||
                props.plant.species.scientificNameWithoutAuthor}
            </Text>
          </View>
        </View>
        {(props.isGarden || props.isScanBlock) && (
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setMenuVisible(true)}>
            <Svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <Path
                d="M6 13C7.65685 13 9 14.3431 9 16C9 17.6569 7.65685 19 6 19C4.34315 19 3 17.6569 3 16C3 14.3431 4.34315 13 6 13Z"
                fill="#D9D9D9"
              />
              <Path
                d="M16 13C17.6569 13 19 14.3431 19 16C19 17.6569 17.6569 19 16 19C14.3431 19 13 17.6569 13 16C13 14.3431 14.3431 13 16 13Z"
                fill="#D9D9D9"
              />
              <Path
                d="M26 13C27.6569 13 29 14.3431 29 16C29 17.6569 27.6569 19 26 19C24.3431 19 23 17.6569 23 16C23 14.3431 24.3431 13 26 13Z"
                fill="#D9D9D9"
              />
            </Svg>
          </TouchableOpacity>
        )}
        <ScrollView
          style={styles.imageContainer}
          horizontal
          showsHorizontalScrollIndicator={false}>
          {props.plant.images.map((image, idx) => (
            <FastImage
              style={styles.image}
              key={idx}
              source={{uri: image.url.m, priority: 'high'}}
            />
          ))}
        </ScrollView>
        {props.isScanBlock && (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              numberOfLines={1}
              style={{...TextStyle.titleText, opacity: 0.6, flex: 1}}>
              {props.scanHistory?.date}
            </Text>
            <TouchableOpacity
              onPress={() => setVisible(true)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
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
                {'Add to collection'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>
      <CollectionModal
        isVisible={visible}
        backDropPress={() => setVisible(false)}
        plant={props.plant}
      />
      <EditMenu
        isScanHistory={props.isScanBlock}
        scanId={props.scanHistory?.id}
        collection={props.collection}
        plant={props.plant}
        isVisible={menuVisible}
        backDropPress={() => setMenuVisible(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 168,
    position: 'relative',
    // width: '100%',
    marginTop: theme.spacing.double,
    padding: theme.spacing.double,
    borderRadius: 12,
    backgroundColor: theme.color.white,
    shadowColor: theme.color.dark,
    // shadowOffset: {
    //   width: 10,
    //   height: 10,
    // },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 1,
  },
  imageContainer: {
    // marginTop: theme.spacing.triple,
  },
  image: {
    width: 72,
    height: 72,
    borderRadius: 36,
    marginRight: theme.spacing.half,
  },
  editButton: {
    top: 0,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    width: 64,
    right: 0,
    position: 'absolute',
  },
});
