import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {TextStyle} from '../styles/base';
import {theme} from '../theme/theme';
import {CollectionBlock} from '../components/collection/CollectionBlock';
import {SAFE_AREA_PADDING} from '../utils/constants';
import ModalBlock from '../components/ModalBlock';

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
export const CollectionScreen = ({navigation}) => {
  const navigateToGarden = collection => () => {
    navigation.navigate('Collection-Stack', {
      screen: 'Garden',
      params: {plants: collection?.plants},
    });
  };
  const [addModalVisible, setVisible] = useState(false);
  return (
    <>
      <View style={styles.container}>
        <View style={styles.textView}>
          <Text style={styles.text}>{'My Collections'}</Text>
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
        <ScrollView style={styles.collectionView}>
          {collections.map((collection, idx) => (
            <View key={idx} style={styles.blockView}>
              <CollectionBlock
                onPress={navigateToGarden(collection)}
                key={idx}
                collection={collection}
              />
            </View>
          ))}
        </ScrollView>
      </View>
      <ModalBlock
        isVisible={addModalVisible}
        onBackdropPress={() => setVisible(false)}
        title={'Create Collection'}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: SAFE_AREA_PADDING.paddingTop,
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
});
