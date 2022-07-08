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
import {PlantResult} from '../types';
import {theme} from '../theme/theme';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import Svg, {Path} from 'react-native-svg';
import {GardenMenu} from './collection/GardenMenu';
import {CollectionState} from '../store/slices/collection';

interface DetectResultProps {
  plant: PlantResult;
  isGarden?: boolean;
  hideCollection?: boolean;
  collection: CollectionState;
  textStyle?: StyleProp<any>;
}
export const ResultBlock = (props: DetectResultProps) => {
  const navigation = useNavigation();
  const gotoPlantDetail = () => {
    navigation.navigate('Plant-Detail', {
      plant: props.plant,
      hideCollection: props.hideCollection,
    });
  };
  const [menuVisible, setMenuVisible] = useState(false);
  return (
    <>
      <View style={styles.container}>
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{flexDirection: 'row'}}>
          <TouchableOpacity
            // eslint-disable-next-line react-native/no-inline-styles
            style={{paddingBottom: theme.spacing.triple, flex: 1}}
            onPress={gotoPlantDetail}>
            {!props.isGarden && props.plant.score && (
              <Text style={[TextStyle.bodyText, props.textStyle]}>
                {`${(Number(props.plant.score) * 100).toFixed(2)}% matched`}
              </Text>
            )}
            <Text numberOfLines={1} style={TextStyle.titleText}>
              {props.plant.species.scientificName}
            </Text>
          </TouchableOpacity>
          {props.isGarden && (
            <TouchableOpacity
              style={{paddingLeft: theme.spacing.double}}
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
        </View>
        <ScrollView
          style={styles.imageContainer}
          horizontal
          showsHorizontalScrollIndicator={false}>
          {props.plant.images.map((image, idx) => (
            <FastImage
              style={styles.image}
              key={idx}
              source={{uri: image.url.m}}
            />
          ))}
        </ScrollView>
      </View>
      <GardenMenu
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
});
