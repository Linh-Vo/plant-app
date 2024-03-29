import React from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Svg, {Path} from 'react-native-svg';
import {Container, TextStyle} from '../../styles/base';
import {theme} from '../../theme/theme';
import {SAFE_AREA_PADDING, SCREEN_NAME} from '../../utils/constants';
import {ResultBlock} from '../../components/ResultBlock';
import {useAppSelector} from '../../hooks/redux';
import {selectCollections} from '../../store/slices/collection';
import {PlantResult} from '../../types';
import {Button} from '../../components/Button';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import FocusAwareStatusBar from '../../components/FocusStatusBar';

export const Garden = ({route, navigation}) => {
  const insets = useSafeAreaInsets();
  const {collectionId} = route?.params;
  const collections = useAppSelector(selectCollections);
  const currentCollection = collections.find(e => e.id === collectionId);
  const plants = currentCollection?.plants || [];
  return (
    <View style={{...styles.container, paddingTop: insets.top}}>
      <FocusAwareStatusBar
        backgroundColor={'transparent'}
        translucent
        // hidden={Platform.OS === 'ios'}
        barStyle={'dark-content'}
      />
      <View style={styles.textView}>
        <View style={styles.titleView}>
          <TouchableOpacity
            style={{padding: theme.spacing.base}}
            onPress={() => navigation.navigate(SCREEN_NAME.Collection)}>
            <Svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <Path
                opacity="0.2"
                d="M16 29.3334C23.3638 29.3334 29.3333 23.3639 29.3333 16.0001C29.3333 8.63628 23.3638 2.66675 16 2.66675C8.63621 2.66675 2.66667 8.63628 2.66667 16.0001C2.66667 23.3639 8.63621 29.3334 16 29.3334Z"
                fill="#222222"
              />
              <Path
                d="M17.68 21.7066C17.4267 21.7066 17.1733 21.6133 16.9733 21.4133L12.2667 16.7066C11.88 16.32 11.88 15.68 12.2667 15.2933L16.9733 10.5866C17.36 10.2 18 10.2 18.3867 10.5866C18.7733 10.9733 18.7733 11.6133 18.3867 12L14.3867 16L18.3867 20C18.7733 20.3866 18.7733 21.0266 18.3867 21.4133C18.2 21.6133 17.9467 21.7066 17.68 21.7066Z"
                fill="#222222"
              />
            </Svg>
          </TouchableOpacity>
          <Text numberOfLines={1} style={styles.text}>
            {currentCollection?.name || ''}
          </Text>
        </View>
        {/* <TouchableOpacity style={styles.buttonContainer}>
          <Svg width="26" height="6" viewBox="0 0 26 6" fill="none">
            <Circle cx="3" cy="3" r="3" fill="#D9D9D9" />
            <Circle cx="13" cy="3" r="3" fill="#D9D9D9" />
            <Circle cx="23" cy="3" r="3" fill="#D9D9D9" />
          </Svg>
        </TouchableOpacity> */}
      </View>
      {plants?.length ? (
        // <ScrollView
        //   keyboardShouldPersistTaps="handled"
        //   showsVerticalScrollIndicator={false}
        //   horizontal={false}>
        //   {plants?.map((res, idx) => (
        //     <ResultBlock
        //       hideCollection={true}
        //       isHideMatch={true}
        //       key={idx}
        //       plant={res}
        //       textStyle={{
        //         color: idx === 0 ? theme.color.primary : theme.color.danger,
        //       }}
        //     />
        //   ))}
        // </ScrollView>
        <FlatList
          keyboardShouldPersistTaps={'handled'}
          data={plants}
          keyExtractor={(item: PlantResult) => item.species.scientificName}
          renderItem={({item, index}) => (
            <ResultBlock
              collection={currentCollection}
              hideCollection={true}
              isGarden={true}
              key={index}
              plant={item}
              textStyle={{
                color: index === 0 ? theme.color.primary : theme.color.danger,
              }}
            />
          )}
        />
      ) : (
        <View style={{...Container.center}}>
          <View style={{width: '70%', height: '25%'}}>
            <FastImage
              resizeMode="contain"
              style={Container.fullScreen}
              source={require('../../assets/images/empty-plant.png')}
            />
          </View>
          <Text style={styles.emptyText}>{'No plants in here'}</Text>
          <Button
            textStyle={{color: theme.color.white}}
            buttonStyle={{width: '70%'}}
            text="Scan now"
            onPress={() =>
              navigation.reset({
                index: 0,
                routes: [
                  {
                    name: 'Home-Stack',
                    state: {
                      routes: [
                        {
                          name: 'Scan',
                        },
                      ],
                    },
                  },
                ],
              })
            }
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.background,
    padding: theme.spacing.double,
  },
  titleView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    ...TextStyle.h4Text,
    paddingLeft: theme.spacing.base,
  },
  buttonContainer: {
    height: theme.spacing.double,
    justifyContent: 'center',
  },
  collectionView: {
    marginTop: 34,
  },
  imageContainer: {
    marginTop: theme.spacing.triple,
  },
  emptyText: {
    ...TextStyle.titleText,
    opacity: 0.6,
    marginVertical: theme.spacing.double,
  },
});
