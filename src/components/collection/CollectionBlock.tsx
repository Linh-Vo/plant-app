import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Svg, {Circle, Path} from 'react-native-svg';
import {theme} from '../../theme/theme';
import {TextStyle} from '../../styles/base';
import {MenuModal} from './MenuModal';

export const CollectionBlock = ({collection, onPress}) => {
  const [menuVisible, setMenuVisible] = useState(false);
  return (
    <>
      <View style={styles.container}>
        <Svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <Path
            d="M28.08 15.76L27.8667 15.4667C27.4933 15.0134 27.0533 14.6534 26.5467 14.3867C25.8667 14 25.0933 13.8 24.2933 13.8H7.69333C6.89333 13.8 6.13333 14 5.44 14.3867C4.92 14.6667 4.45333 15.0534 4.06667 15.5334C3.30667 16.5067 2.94667 17.7067 3.06667 18.9067L3.56 25.1334C3.73333 27.0134 3.96 29.3334 8.18666 29.3334H23.8133C28.04 29.3334 28.2533 27.0134 28.44 25.12L28.9333 18.92C29.0533 17.8 28.76 16.68 28.08 15.76ZM19.1867 23.12H12.8C12.28 23.12 11.8667 22.6934 11.8667 22.1867C11.8667 21.68 12.28 21.2534 12.8 21.2534H19.1867C19.7067 21.2534 20.12 21.68 20.12 22.1867C20.12 22.7067 19.7067 23.12 19.1867 23.12Z"
            fill="#678F58"
          />
          <Path
            opacity="0.4"
            d="M4.50667 15.0801C4.8 14.8134 5.09333 14.5734 5.44 14.3867C6.12 14.0001 6.89333 13.8001 7.69333 13.8001H24.3067C25.1067 13.8001 25.8667 14.0001 26.56 14.3867C26.9067 14.5734 27.2133 14.8134 27.4933 15.0934V14.3867V13.0934C27.4933 8.33341 26.04 6.88008 21.28 6.88008H18.1067C17.52 6.88008 17.5067 6.86675 17.16 6.41341L15.56 4.26675C14.8 3.28008 14.2 2.66675 12.2933 2.66675H10.72C5.96 2.66675 4.50667 4.12008 4.50667 8.88008V14.4001V15.0801Z"
            fill="#678F58"
          />
        </Svg>
        <TouchableOpacity onPress={onPress} style={styles.textView}>
          <Text
            numberOfLines={1}
            style={{...TextStyle.titleText}}>{`${collection?.name}`}</Text>
          <Text
            style={
              styles.blurText
            }>{`${collection?.plants?.length} plants`}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setMenuVisible(true)}
          style={styles.buttonView}>
          <Svg width="6" height="26" viewBox="0 0 6 26" fill="none">
            <Circle cx="3" cy="3" r="3" fill="#D9D9D9" />
            <Circle cx="3" cy="13" r="3" fill="#D9D9D9" />
            <Circle cx="3" cy="23" r="3" fill="#D9D9D9" />
          </Svg>
        </TouchableOpacity>
      </View>
      <MenuModal
        collection={collection}
        isVisible={menuVisible}
        backDropPress={() => setMenuVisible(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.color.white,
    borderRadius: 12,
    height: 92,
    alignItems: 'center',
    paddingVertical: theme.spacing.triple,
    paddingLeft: theme.spacing.triple,
    flexDirection: 'row',
  },
  textView: {
    display: 'flex',
    flex: 1,
    paddingHorizontal: theme.spacing.double,
  },
  blurText: {
    ...TextStyle.bodyText,
    opacity: 0.6,
  },
  buttonView: {
    alignItems: 'flex-end',
    padding: 16,
  },
});
