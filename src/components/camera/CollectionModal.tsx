import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import Svg, {Path} from 'react-native-svg';
import {TextStyle} from '../../styles/base';
import {theme} from '../../theme/theme';
import {Button} from '../Button';
import ModalBlock from '../ModalBlock';

const ModalBody = ({backDropPress, collections}) => {
  const navigation = useNavigation();
  const [isVisible, setVisible] = useState(false);
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
                  navigation.navigate('Collection-Stack', {
                    screen: 'Garden',
                    params: {plants: col?.plants},
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
        onBackdropPress={() => {
          backDropPress();
        }}
        isVisible={isVisible}
      />
    </>
  );
};
const collections = [
  {
    name: 'plant1',
    count: 3,
    plants: [
      {
        score: 0.55615,
        species: {
          scientificNameWithoutAuthor: 'Rosa chinensis',
          scientificNameAuthorship: 'Jacq.',
          genus: {
            scientificNameWithoutAuthor: 'Rosa',
            scientificNameAuthorship: '',
            scientificName: 'Rosa',
          },
          family: {
            scientificNameWithoutAuthor: 'Rosaceae',
            scientificNameAuthorship: '',
            scientificName: 'Rosaceae',
          },
          commonNames: ['Bengal rose', 'China Rose', 'Chinese rose'],
          scientificName: 'Rosa chinensis Jacq.',
        },
        images: [
          {
            organ: 'flower',
            author: 'Hoàng Linh',
            license: 'cc-by-sa',
            date: {
              timestamp: 1602154244267,
              string: 'October 8, 2020',
            },
            url: {
              o: 'https://bs.plantnet.org/image/o/79650ed29001d5871cdfa0fe9be65cec41df0f59',
              m: 'https://bs.plantnet.org/image/m/79650ed29001d5871cdfa0fe9be65cec41df0f59',
              s: 'https://bs.plantnet.org/image/s/79650ed29001d5871cdfa0fe9be65cec41df0f59',
            },
            citation: 'Hoàng Linh / Pl@ntNet, cc-by-sa',
          },
          {
            organ: 'flower',
            author: 'Fanny Godiard',
            license: 'cc-by-sa',
            date: {
              timestamp: 1560285789495,
              string: 'June 11, 2019',
            },
            url: {
              o: 'https://bs.plantnet.org/image/o/b38ff58d77fc75deb55f931726e096afa0d56076',
              m: 'https://bs.plantnet.org/image/m/b38ff58d77fc75deb55f931726e096afa0d56076',
              s: 'https://bs.plantnet.org/image/s/b38ff58d77fc75deb55f931726e096afa0d56076',
            },
            citation: 'Fanny Godiard / Pl@ntNet, cc-by-sa',
          },
          {
            organ: 'flower',
            author: 'Kandis Neelah',
            license: 'cc-by-sa',
            date: {
              timestamp: 1560202310486,
              string: 'June 10, 2019',
            },
            url: {
              o: 'https://bs.plantnet.org/image/o/246c271e91eacf7d66313059686d6b27dd007833',
              m: 'https://bs.plantnet.org/image/m/246c271e91eacf7d66313059686d6b27dd007833',
              s: 'https://bs.plantnet.org/image/s/246c271e91eacf7d66313059686d6b27dd007833',
            },
            citation: 'Kandis Neelah / Pl@ntNet, cc-by-sa',
          },
          {
            organ: 'flower',
            author: 'Carbajal Carbajal',
            license: 'cc-by-sa',
            date: {
              timestamp: 1648592346435,
              string: 'March 29, 2022',
            },
            url: {
              o: 'https://bs.plantnet.org/image/o/b2215519889471c51f9d5ecf3b3b23aa06fc6028',
              m: 'https://bs.plantnet.org/image/m/b2215519889471c51f9d5ecf3b3b23aa06fc6028',
              s: 'https://bs.plantnet.org/image/s/b2215519889471c51f9d5ecf3b3b23aa06fc6028',
            },
            citation: 'Carbajal Carbajal / Pl@ntNet, cc-by-sa',
          },
          {
            organ: 'flower',
            author: 'ZŠ Štefcova',
            license: 'cc-by-sa',
            date: {
              timestamp: 1488718562000,
              string: 'March 5, 2017',
            },
            url: {
              o: 'https://bs.plantnet.org/image/o/7d94d63b92f6bbbc1c5266372f972c478ba36ff0',
              m: 'https://bs.plantnet.org/image/m/7d94d63b92f6bbbc1c5266372f972c478ba36ff0',
              s: 'https://bs.plantnet.org/image/s/7d94d63b92f6bbbc1c5266372f972c478ba36ff0',
            },
            citation: 'ZŠ Štefcova / Pl@ntNet, cc-by-sa',
          },
          {
            organ: 'flower',
            author: 'Zamorano Verónica',
            license: 'cc-by-sa',
            date: {
              timestamp: 1600050924709,
              string: 'September 14, 2020',
            },
            url: {
              o: 'https://bs.plantnet.org/image/o/7a7f5c62fd0a14561367e86e5eeb57c501e73597',
              m: 'https://bs.plantnet.org/image/m/7a7f5c62fd0a14561367e86e5eeb57c501e73597',
              s: 'https://bs.plantnet.org/image/s/7a7f5c62fd0a14561367e86e5eeb57c501e73597',
            },
            citation: 'Zamorano Verónica / Pl@ntNet, cc-by-sa',
          },
        ],
        gbif: {
          id: '3005039',
        },
      },
      {
        score: 0.55615,
        species: {
          scientificNameWithoutAuthor: 'Rosa chinensis',
          scientificNameAuthorship: 'Jacq.',
          genus: {
            scientificNameWithoutAuthor: 'Rosa',
            scientificNameAuthorship: '',
            scientificName: 'Rosa',
          },
          family: {
            scientificNameWithoutAuthor: 'Rosaceae',
            scientificNameAuthorship: '',
            scientificName: 'Rosaceae',
          },
          commonNames: ['Bengal rose', 'China Rose', 'Chinese rose'],
          scientificName: 'Rosa chinensis Jacq.',
        },
        images: [
          {
            organ: 'flower',
            author: 'Hoàng Linh',
            license: 'cc-by-sa',
            date: {
              timestamp: 1602154244267,
              string: 'October 8, 2020',
            },
            url: {
              o: 'https://bs.plantnet.org/image/o/79650ed29001d5871cdfa0fe9be65cec41df0f59',
              m: 'https://bs.plantnet.org/image/m/79650ed29001d5871cdfa0fe9be65cec41df0f59',
              s: 'https://bs.plantnet.org/image/s/79650ed29001d5871cdfa0fe9be65cec41df0f59',
            },
            citation: 'Hoàng Linh / Pl@ntNet, cc-by-sa',
          },
          {
            organ: 'flower',
            author: 'Fanny Godiard',
            license: 'cc-by-sa',
            date: {
              timestamp: 1560285789495,
              string: 'June 11, 2019',
            },
            url: {
              o: 'https://bs.plantnet.org/image/o/b38ff58d77fc75deb55f931726e096afa0d56076',
              m: 'https://bs.plantnet.org/image/m/b38ff58d77fc75deb55f931726e096afa0d56076',
              s: 'https://bs.plantnet.org/image/s/b38ff58d77fc75deb55f931726e096afa0d56076',
            },
            citation: 'Fanny Godiard / Pl@ntNet, cc-by-sa',
          },
          {
            organ: 'flower',
            author: 'Kandis Neelah',
            license: 'cc-by-sa',
            date: {
              timestamp: 1560202310486,
              string: 'June 10, 2019',
            },
            url: {
              o: 'https://bs.plantnet.org/image/o/246c271e91eacf7d66313059686d6b27dd007833',
              m: 'https://bs.plantnet.org/image/m/246c271e91eacf7d66313059686d6b27dd007833',
              s: 'https://bs.plantnet.org/image/s/246c271e91eacf7d66313059686d6b27dd007833',
            },
            citation: 'Kandis Neelah / Pl@ntNet, cc-by-sa',
          },
          {
            organ: 'flower',
            author: 'Carbajal Carbajal',
            license: 'cc-by-sa',
            date: {
              timestamp: 1648592346435,
              string: 'March 29, 2022',
            },
            url: {
              o: 'https://bs.plantnet.org/image/o/b2215519889471c51f9d5ecf3b3b23aa06fc6028',
              m: 'https://bs.plantnet.org/image/m/b2215519889471c51f9d5ecf3b3b23aa06fc6028',
              s: 'https://bs.plantnet.org/image/s/b2215519889471c51f9d5ecf3b3b23aa06fc6028',
            },
            citation: 'Carbajal Carbajal / Pl@ntNet, cc-by-sa',
          },
          {
            organ: 'flower',
            author: 'ZŠ Štefcova',
            license: 'cc-by-sa',
            date: {
              timestamp: 1488718562000,
              string: 'March 5, 2017',
            },
            url: {
              o: 'https://bs.plantnet.org/image/o/7d94d63b92f6bbbc1c5266372f972c478ba36ff0',
              m: 'https://bs.plantnet.org/image/m/7d94d63b92f6bbbc1c5266372f972c478ba36ff0',
              s: 'https://bs.plantnet.org/image/s/7d94d63b92f6bbbc1c5266372f972c478ba36ff0',
            },
            citation: 'ZŠ Štefcova / Pl@ntNet, cc-by-sa',
          },
          {
            organ: 'flower',
            author: 'Zamorano Verónica',
            license: 'cc-by-sa',
            date: {
              timestamp: 1600050924709,
              string: 'September 14, 2020',
            },
            url: {
              o: 'https://bs.plantnet.org/image/o/7a7f5c62fd0a14561367e86e5eeb57c501e73597',
              m: 'https://bs.plantnet.org/image/m/7a7f5c62fd0a14561367e86e5eeb57c501e73597',
              s: 'https://bs.plantnet.org/image/s/7a7f5c62fd0a14561367e86e5eeb57c501e73597',
            },
            citation: 'Zamorano Verónica / Pl@ntNet, cc-by-sa',
          },
        ],
        gbif: {
          id: '3005039',
        },
      },
      {
        score: 0.55615,
        species: {
          scientificNameWithoutAuthor: 'Rosa chinensis',
          scientificNameAuthorship: 'Jacq.',
          genus: {
            scientificNameWithoutAuthor: 'Rosa',
            scientificNameAuthorship: '',
            scientificName: 'Rosa',
          },
          family: {
            scientificNameWithoutAuthor: 'Rosaceae',
            scientificNameAuthorship: '',
            scientificName: 'Rosaceae',
          },
          commonNames: ['Bengal rose', 'China Rose', 'Chinese rose'],
          scientificName: 'Rosa chinensis Jacq.',
        },
        images: [
          {
            organ: 'flower',
            author: 'Hoàng Linh',
            license: 'cc-by-sa',
            date: {
              timestamp: 1602154244267,
              string: 'October 8, 2020',
            },
            url: {
              o: 'https://bs.plantnet.org/image/o/79650ed29001d5871cdfa0fe9be65cec41df0f59',
              m: 'https://bs.plantnet.org/image/m/79650ed29001d5871cdfa0fe9be65cec41df0f59',
              s: 'https://bs.plantnet.org/image/s/79650ed29001d5871cdfa0fe9be65cec41df0f59',
            },
            citation: 'Hoàng Linh / Pl@ntNet, cc-by-sa',
          },
          {
            organ: 'flower',
            author: 'Fanny Godiard',
            license: 'cc-by-sa',
            date: {
              timestamp: 1560285789495,
              string: 'June 11, 2019',
            },
            url: {
              o: 'https://bs.plantnet.org/image/o/b38ff58d77fc75deb55f931726e096afa0d56076',
              m: 'https://bs.plantnet.org/image/m/b38ff58d77fc75deb55f931726e096afa0d56076',
              s: 'https://bs.plantnet.org/image/s/b38ff58d77fc75deb55f931726e096afa0d56076',
            },
            citation: 'Fanny Godiard / Pl@ntNet, cc-by-sa',
          },
          {
            organ: 'flower',
            author: 'Kandis Neelah',
            license: 'cc-by-sa',
            date: {
              timestamp: 1560202310486,
              string: 'June 10, 2019',
            },
            url: {
              o: 'https://bs.plantnet.org/image/o/246c271e91eacf7d66313059686d6b27dd007833',
              m: 'https://bs.plantnet.org/image/m/246c271e91eacf7d66313059686d6b27dd007833',
              s: 'https://bs.plantnet.org/image/s/246c271e91eacf7d66313059686d6b27dd007833',
            },
            citation: 'Kandis Neelah / Pl@ntNet, cc-by-sa',
          },
          {
            organ: 'flower',
            author: 'Carbajal Carbajal',
            license: 'cc-by-sa',
            date: {
              timestamp: 1648592346435,
              string: 'March 29, 2022',
            },
            url: {
              o: 'https://bs.plantnet.org/image/o/b2215519889471c51f9d5ecf3b3b23aa06fc6028',
              m: 'https://bs.plantnet.org/image/m/b2215519889471c51f9d5ecf3b3b23aa06fc6028',
              s: 'https://bs.plantnet.org/image/s/b2215519889471c51f9d5ecf3b3b23aa06fc6028',
            },
            citation: 'Carbajal Carbajal / Pl@ntNet, cc-by-sa',
          },
          {
            organ: 'flower',
            author: 'ZŠ Štefcova',
            license: 'cc-by-sa',
            date: {
              timestamp: 1488718562000,
              string: 'March 5, 2017',
            },
            url: {
              o: 'https://bs.plantnet.org/image/o/7d94d63b92f6bbbc1c5266372f972c478ba36ff0',
              m: 'https://bs.plantnet.org/image/m/7d94d63b92f6bbbc1c5266372f972c478ba36ff0',
              s: 'https://bs.plantnet.org/image/s/7d94d63b92f6bbbc1c5266372f972c478ba36ff0',
            },
            citation: 'ZŠ Štefcova / Pl@ntNet, cc-by-sa',
          },
          {
            organ: 'flower',
            author: 'Zamorano Verónica',
            license: 'cc-by-sa',
            date: {
              timestamp: 1600050924709,
              string: 'September 14, 2020',
            },
            url: {
              o: 'https://bs.plantnet.org/image/o/7a7f5c62fd0a14561367e86e5eeb57c501e73597',
              m: 'https://bs.plantnet.org/image/m/7a7f5c62fd0a14561367e86e5eeb57c501e73597',
              s: 'https://bs.plantnet.org/image/s/7a7f5c62fd0a14561367e86e5eeb57c501e73597',
            },
            citation: 'Zamorano Verónica / Pl@ntNet, cc-by-sa',
          },
        ],
        gbif: {
          id: '3005039',
        },
      },
    ],
  },
  {
    name: 'plant2 asdf asf asf asfsaf asfsa asf asfsaf safsad asfsadf asfsa asfasf ',
    count: 2,
    plants: [
      {
        score: 0.55615,
        species: {
          scientificNameWithoutAuthor: 'Rosa chinensis',
          scientificNameAuthorship: 'Jacq.',
          genus: {
            scientificNameWithoutAuthor: 'Rosa',
            scientificNameAuthorship: '',
            scientificName: 'Rosa',
          },
          family: {
            scientificNameWithoutAuthor: 'Rosaceae',
            scientificNameAuthorship: '',
            scientificName: 'Rosaceae',
          },
          commonNames: ['Bengal rose', 'China Rose', 'Chinese rose'],
          scientificName: 'Rosa chinensis Jacq.',
        },
        images: [
          {
            organ: 'flower',
            author: 'Hoàng Linh',
            license: 'cc-by-sa',
            date: {
              timestamp: 1602154244267,
              string: 'October 8, 2020',
            },
            url: {
              o: 'https://bs.plantnet.org/image/o/79650ed29001d5871cdfa0fe9be65cec41df0f59',
              m: 'https://bs.plantnet.org/image/m/79650ed29001d5871cdfa0fe9be65cec41df0f59',
              s: 'https://bs.plantnet.org/image/s/79650ed29001d5871cdfa0fe9be65cec41df0f59',
            },
            citation: 'Hoàng Linh / Pl@ntNet, cc-by-sa',
          },
          {
            organ: 'flower',
            author: 'Fanny Godiard',
            license: 'cc-by-sa',
            date: {
              timestamp: 1560285789495,
              string: 'June 11, 2019',
            },
            url: {
              o: 'https://bs.plantnet.org/image/o/b38ff58d77fc75deb55f931726e096afa0d56076',
              m: 'https://bs.plantnet.org/image/m/b38ff58d77fc75deb55f931726e096afa0d56076',
              s: 'https://bs.plantnet.org/image/s/b38ff58d77fc75deb55f931726e096afa0d56076',
            },
            citation: 'Fanny Godiard / Pl@ntNet, cc-by-sa',
          },
          {
            organ: 'flower',
            author: 'Kandis Neelah',
            license: 'cc-by-sa',
            date: {
              timestamp: 1560202310486,
              string: 'June 10, 2019',
            },
            url: {
              o: 'https://bs.plantnet.org/image/o/246c271e91eacf7d66313059686d6b27dd007833',
              m: 'https://bs.plantnet.org/image/m/246c271e91eacf7d66313059686d6b27dd007833',
              s: 'https://bs.plantnet.org/image/s/246c271e91eacf7d66313059686d6b27dd007833',
            },
            citation: 'Kandis Neelah / Pl@ntNet, cc-by-sa',
          },
          {
            organ: 'flower',
            author: 'Carbajal Carbajal',
            license: 'cc-by-sa',
            date: {
              timestamp: 1648592346435,
              string: 'March 29, 2022',
            },
            url: {
              o: 'https://bs.plantnet.org/image/o/b2215519889471c51f9d5ecf3b3b23aa06fc6028',
              m: 'https://bs.plantnet.org/image/m/b2215519889471c51f9d5ecf3b3b23aa06fc6028',
              s: 'https://bs.plantnet.org/image/s/b2215519889471c51f9d5ecf3b3b23aa06fc6028',
            },
            citation: 'Carbajal Carbajal / Pl@ntNet, cc-by-sa',
          },
          {
            organ: 'flower',
            author: 'ZŠ Štefcova',
            license: 'cc-by-sa',
            date: {
              timestamp: 1488718562000,
              string: 'March 5, 2017',
            },
            url: {
              o: 'https://bs.plantnet.org/image/o/7d94d63b92f6bbbc1c5266372f972c478ba36ff0',
              m: 'https://bs.plantnet.org/image/m/7d94d63b92f6bbbc1c5266372f972c478ba36ff0',
              s: 'https://bs.plantnet.org/image/s/7d94d63b92f6bbbc1c5266372f972c478ba36ff0',
            },
            citation: 'ZŠ Štefcova / Pl@ntNet, cc-by-sa',
          },
          {
            organ: 'flower',
            author: 'Zamorano Verónica',
            license: 'cc-by-sa',
            date: {
              timestamp: 1600050924709,
              string: 'September 14, 2020',
            },
            url: {
              o: 'https://bs.plantnet.org/image/o/7a7f5c62fd0a14561367e86e5eeb57c501e73597',
              m: 'https://bs.plantnet.org/image/m/7a7f5c62fd0a14561367e86e5eeb57c501e73597',
              s: 'https://bs.plantnet.org/image/s/7a7f5c62fd0a14561367e86e5eeb57c501e73597',
            },
            citation: 'Zamorano Verónica / Pl@ntNet, cc-by-sa',
          },
        ],
        gbif: {
          id: '3005039',
        },
      },
      {
        score: 0.55615,
        species: {
          scientificNameWithoutAuthor: 'Rosa chinensis',
          scientificNameAuthorship: 'Jacq.',
          genus: {
            scientificNameWithoutAuthor: 'Rosa',
            scientificNameAuthorship: '',
            scientificName: 'Rosa',
          },
          family: {
            scientificNameWithoutAuthor: 'Rosaceae',
            scientificNameAuthorship: '',
            scientificName: 'Rosaceae',
          },
          commonNames: ['Bengal rose', 'China Rose', 'Chinese rose'],
          scientificName: 'Rosa chinensis Jacq.',
        },
        images: [
          {
            organ: 'flower',
            author: 'Hoàng Linh',
            license: 'cc-by-sa',
            date: {
              timestamp: 1602154244267,
              string: 'October 8, 2020',
            },
            url: {
              o: 'https://bs.plantnet.org/image/o/79650ed29001d5871cdfa0fe9be65cec41df0f59',
              m: 'https://bs.plantnet.org/image/m/79650ed29001d5871cdfa0fe9be65cec41df0f59',
              s: 'https://bs.plantnet.org/image/s/79650ed29001d5871cdfa0fe9be65cec41df0f59',
            },
            citation: 'Hoàng Linh / Pl@ntNet, cc-by-sa',
          },
          {
            organ: 'flower',
            author: 'Fanny Godiard',
            license: 'cc-by-sa',
            date: {
              timestamp: 1560285789495,
              string: 'June 11, 2019',
            },
            url: {
              o: 'https://bs.plantnet.org/image/o/b38ff58d77fc75deb55f931726e096afa0d56076',
              m: 'https://bs.plantnet.org/image/m/b38ff58d77fc75deb55f931726e096afa0d56076',
              s: 'https://bs.plantnet.org/image/s/b38ff58d77fc75deb55f931726e096afa0d56076',
            },
            citation: 'Fanny Godiard / Pl@ntNet, cc-by-sa',
          },
          {
            organ: 'flower',
            author: 'Kandis Neelah',
            license: 'cc-by-sa',
            date: {
              timestamp: 1560202310486,
              string: 'June 10, 2019',
            },
            url: {
              o: 'https://bs.plantnet.org/image/o/246c271e91eacf7d66313059686d6b27dd007833',
              m: 'https://bs.plantnet.org/image/m/246c271e91eacf7d66313059686d6b27dd007833',
              s: 'https://bs.plantnet.org/image/s/246c271e91eacf7d66313059686d6b27dd007833',
            },
            citation: 'Kandis Neelah / Pl@ntNet, cc-by-sa',
          },
          {
            organ: 'flower',
            author: 'Carbajal Carbajal',
            license: 'cc-by-sa',
            date: {
              timestamp: 1648592346435,
              string: 'March 29, 2022',
            },
            url: {
              o: 'https://bs.plantnet.org/image/o/b2215519889471c51f9d5ecf3b3b23aa06fc6028',
              m: 'https://bs.plantnet.org/image/m/b2215519889471c51f9d5ecf3b3b23aa06fc6028',
              s: 'https://bs.plantnet.org/image/s/b2215519889471c51f9d5ecf3b3b23aa06fc6028',
            },
            citation: 'Carbajal Carbajal / Pl@ntNet, cc-by-sa',
          },
          {
            organ: 'flower',
            author: 'ZŠ Štefcova',
            license: 'cc-by-sa',
            date: {
              timestamp: 1488718562000,
              string: 'March 5, 2017',
            },
            url: {
              o: 'https://bs.plantnet.org/image/o/7d94d63b92f6bbbc1c5266372f972c478ba36ff0',
              m: 'https://bs.plantnet.org/image/m/7d94d63b92f6bbbc1c5266372f972c478ba36ff0',
              s: 'https://bs.plantnet.org/image/s/7d94d63b92f6bbbc1c5266372f972c478ba36ff0',
            },
            citation: 'ZŠ Štefcova / Pl@ntNet, cc-by-sa',
          },
          {
            organ: 'flower',
            author: 'Zamorano Verónica',
            license: 'cc-by-sa',
            date: {
              timestamp: 1600050924709,
              string: 'September 14, 2020',
            },
            url: {
              o: 'https://bs.plantnet.org/image/o/7a7f5c62fd0a14561367e86e5eeb57c501e73597',
              m: 'https://bs.plantnet.org/image/m/7a7f5c62fd0a14561367e86e5eeb57c501e73597',
              s: 'https://bs.plantnet.org/image/s/7a7f5c62fd0a14561367e86e5eeb57c501e73597',
            },
            citation: 'Zamorano Verónica / Pl@ntNet, cc-by-sa',
          },
        ],
        gbif: {
          id: '3005039',
        },
      },
    ],
  },
];
export const CollectionModal = ({isVisible, backDropPress}) => {
  return (
    <View style={styles.container}>
      <Modal
        isVisible={isVisible}
        hasBackdrop={true}
        style={styles.modal}
        backdropColor={theme.color.dark}
        backdropOpacity={0.8}
        onBackdropPress={backDropPress}
        animationIn={'fadeInLeft'}
        animationOut={'fadeOutRight'}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.modalBody}>
          <ModalBody collections={collections} backDropPress={backDropPress} />
        </ScrollView>
      </Modal>
    </View>
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
