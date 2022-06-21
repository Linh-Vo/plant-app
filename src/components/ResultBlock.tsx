import React from 'react';
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

interface DetectResultProps {
  plant: PlantResult;
  isHideMatch?: boolean;
  hideCollection?: boolean;
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
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={gotoPlantDetail}>
        {!props.isHideMatch && props.plant.score && (
          <Text style={[TextStyle.bodyText, props.textStyle]}>
            {`${(Number(props.plant.score) * 100).toFixed(2)}% matched`}
          </Text>
        )}
        <Text style={TextStyle.titleText}>
          {props.plant.species.scientificName}
        </Text>
      </TouchableOpacity>
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
    // shadowRadius: 20,
    elevation: 5,
  },
  imageContainer: {
    marginTop: theme.spacing.triple,
  },
  image: {
    width: 72,
    height: 72,
    borderRadius: 36,
    marginRight: theme.spacing.half,
  },
});
