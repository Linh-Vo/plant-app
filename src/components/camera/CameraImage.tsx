import axios from 'axios';
import React, {useState} from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {theme} from '../../theme/theme';
import {Button} from '../../components/Button';
import Svg, {Path} from 'react-native-svg';
import {SAFE_AREA_PADDING} from '../../utils/constants';
import {TextStyle} from '../../styles/base';
import {PlantResult} from '../../types';

const res = {
  query: {
    project: 'all',
    images: ['c38760b7d88d829cd4be0d90b717b8f4'],
    organs: ['auto'],
    includeRelatedImages: true,
  },
  language: 'en',
  preferedReferential: 'the-plant-list',
  bestMatch: 'Rosa chinensis Jacq.',
  results: [
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
      score: 0.26221,
      species: {
        scientificNameWithoutAuthor: 'Rosa indica',
        scientificNameAuthorship: 'L.',
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
        commonNames: ['Cyme rose'],
        scientificName: 'Rosa indica L.',
      },
      images: [
        {
          organ: 'flower',
          author: 'mohammed sajjad',
          license: 'cc-by-sa',
          date: {
            timestamp: 1590558858965,
            string: 'May 27, 2020',
          },
          url: {
            o: 'https://bs.plantnet.org/image/o/b0e45d41c1cb4da72c9668b04609fbe3b14e8453',
            m: 'https://bs.plantnet.org/image/m/b0e45d41c1cb4da72c9668b04609fbe3b14e8453',
            s: 'https://bs.plantnet.org/image/s/b0e45d41c1cb4da72c9668b04609fbe3b14e8453',
          },
          citation: 'mohammed sajjad / Pl@ntNet, cc-by-sa',
        },
        {
          organ: 'flower',
          author: 'Salvatore Carmone',
          license: 'cc-by-sa',
          date: {
            timestamp: 1645025969370,
            string: 'February 16, 2022',
          },
          url: {
            o: 'https://bs.plantnet.org/image/o/2f2cb58fe856ea671aae6846e5114967c9640cde',
            m: 'https://bs.plantnet.org/image/m/2f2cb58fe856ea671aae6846e5114967c9640cde',
            s: 'https://bs.plantnet.org/image/s/2f2cb58fe856ea671aae6846e5114967c9640cde',
          },
          citation: 'Salvatore Carmone / Pl@ntNet, cc-by-sa',
        },
      ],
      gbif: {
        id: '8342804',
      },
    },
    {
      score: 0.12062,
      species: {
        scientificNameWithoutAuthor: 'Rosa luciae',
        scientificNameAuthorship: 'Franch. & Rochebr.',
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
        commonNames: ["Wichura's rose", 'Memorial rose'],
        scientificName: 'Rosa luciae Franch. & Rochebr.',
      },
      images: [
        {
          organ: 'flower',
          author: 'FERREIRA DIEGO CÉSAR',
          license: 'cc-by-sa',
          date: {
            timestamp: 1646148020197,
            string: 'March 1, 2022',
          },
          url: {
            o: 'https://bs.plantnet.org/image/o/2dd75582d99a5ca173e0d889c29689829aefa793',
            m: 'https://bs.plantnet.org/image/m/2dd75582d99a5ca173e0d889c29689829aefa793',
            s: 'https://bs.plantnet.org/image/s/2dd75582d99a5ca173e0d889c29689829aefa793',
          },
          citation: 'FERREIRA DIEGO CÉSAR / Pl@ntNet, cc-by-sa',
        },
        {
          organ: 'flower',
          author: 'Dhea Intan',
          license: 'cc-by-sa',
          date: {
            timestamp: 1582360438143,
            string: 'February 22, 2020',
          },
          url: {
            o: 'https://bs.plantnet.org/image/o/fac7397c1149b48b721211f137a770ab3c8610b0',
            m: 'https://bs.plantnet.org/image/m/fac7397c1149b48b721211f137a770ab3c8610b0',
            s: 'https://bs.plantnet.org/image/s/fac7397c1149b48b721211f137a770ab3c8610b0',
          },
          citation: 'Dhea Intan / Pl@ntNet, cc-by-sa',
        },
        {
          organ: 'flower',
          author: 'patricia payage',
          license: 'cc-by-sa',
          date: {
            timestamp: 1618913848510,
            string: 'April 20, 2021',
          },
          url: {
            o: 'https://bs.plantnet.org/image/o/959b68ba124a092f8fea94cc15a9577bcd480862',
            m: 'https://bs.plantnet.org/image/m/959b68ba124a092f8fea94cc15a9577bcd480862',
            s: 'https://bs.plantnet.org/image/s/959b68ba124a092f8fea94cc15a9577bcd480862',
          },
          citation: 'patricia payage / Pl@ntNet, cc-by-sa',
        },
        {
          organ: 'flower',
          author: 'FERREIRA DIEGO CÉSAR',
          license: 'cc-by-sa',
          date: {
            timestamp: 1628315034092,
            string: 'August 7, 2021',
          },
          url: {
            o: 'https://bs.plantnet.org/image/o/cb6cc9a77422d6397777ff1e6825c345d6448e62',
            m: 'https://bs.plantnet.org/image/m/cb6cc9a77422d6397777ff1e6825c345d6448e62',
            s: 'https://bs.plantnet.org/image/s/cb6cc9a77422d6397777ff1e6825c345d6448e62',
          },
          citation: 'FERREIRA DIEGO CÉSAR / Pl@ntNet, cc-by-sa',
        },
        {
          organ: 'flower',
          author: 'Mariasun Landaburu',
          license: 'cc-by-sa',
          date: {
            timestamp: 1628350319912,
            string: 'August 7, 2021',
          },
          url: {
            o: 'https://bs.plantnet.org/image/o/eae93aae927bd24537400c45c08b1723c89c89e9',
            m: 'https://bs.plantnet.org/image/m/eae93aae927bd24537400c45c08b1723c89c89e9',
            s: 'https://bs.plantnet.org/image/s/eae93aae927bd24537400c45c08b1723c89c89e9',
          },
          citation: 'Mariasun Landaburu / Pl@ntNet, cc-by-sa',
        },
        {
          organ: 'flower',
          author: 'Annemarie Ahrens-Stehle',
          license: 'cc-by-sa',
          date: {
            timestamp: 1629810810802,
            string: 'August 24, 2021',
          },
          url: {
            o: 'https://bs.plantnet.org/image/o/3bde6042024f75972265e071640ed56559d44300',
            m: 'https://bs.plantnet.org/image/m/3bde6042024f75972265e071640ed56559d44300',
            s: 'https://bs.plantnet.org/image/s/3bde6042024f75972265e071640ed56559d44300',
          },
          citation: 'Annemarie Ahrens-Stehle / Pl@ntNet, cc-by-sa',
        },
      ],
      gbif: {
        id: '3008275',
      },
    },
    {
      score: 0.01345,
      species: {
        scientificNameWithoutAuthor: 'Rosa gallica',
        scientificNameAuthorship: 'L.',
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
        commonNames: ['French rose', 'Hungarian rose', 'Apothecary rose'],
        scientificName: 'Rosa gallica L.',
      },
      images: [
        {
          organ: 'flower',
          author: 'Andrea Manzoni Cucchiaro',
          license: 'cc-by-sa',
          date: {
            timestamp: 1623965187256,
            string: 'June 17, 2021',
          },
          url: {
            o: 'https://bs.plantnet.org/image/o/bb77b2fe8755b3f48c5d9ee37d0cc2c0f0a5071d',
            m: 'https://bs.plantnet.org/image/m/bb77b2fe8755b3f48c5d9ee37d0cc2c0f0a5071d',
            s: 'https://bs.plantnet.org/image/s/bb77b2fe8755b3f48c5d9ee37d0cc2c0f0a5071d',
          },
          citation: 'Andrea Manzoni Cucchiaro / Pl@ntNet, cc-by-sa',
        },
        {
          organ: 'flower',
          author: 'Gordon Gordon',
          license: 'cc-by-sa',
          date: {
            timestamp: 1566557392381,
            string: 'August 23, 2019',
          },
          url: {
            o: 'https://bs.plantnet.org/image/o/191a123498c1baddbb9e10a47ed5dbfe0433c0bc',
            m: 'https://bs.plantnet.org/image/m/191a123498c1baddbb9e10a47ed5dbfe0433c0bc',
            s: 'https://bs.plantnet.org/image/s/191a123498c1baddbb9e10a47ed5dbfe0433c0bc',
          },
          citation: 'Gordon Gordon / Pl@ntNet, cc-by-sa',
        },
        {
          organ: 'flower',
          author: 'Leon Müller',
          license: 'cc-by-sa',
          date: {
            timestamp: 1562832630212,
            string: 'July 11, 2019',
          },
          url: {
            o: 'https://bs.plantnet.org/image/o/617b533463125cd71810a5b0d327aba5232f0707',
            m: 'https://bs.plantnet.org/image/m/617b533463125cd71810a5b0d327aba5232f0707',
            s: 'https://bs.plantnet.org/image/s/617b533463125cd71810a5b0d327aba5232f0707',
          },
          citation: 'Leon Müller / Pl@ntNet, cc-by-sa',
        },
        {
          organ: 'flower',
          author: 'Michel Abou Rjeily',
          license: 'cc-by-sa',
          date: {
            timestamp: 1591288856144,
            string: 'June 4, 2020',
          },
          url: {
            o: 'https://bs.plantnet.org/image/o/1b9ae687ec1a05d1b8a9524edd023eb115484c1b',
            m: 'https://bs.plantnet.org/image/m/1b9ae687ec1a05d1b8a9524edd023eb115484c1b',
            s: 'https://bs.plantnet.org/image/s/1b9ae687ec1a05d1b8a9524edd023eb115484c1b',
          },
          citation: 'Michel Abou Rjeily / Pl@ntNet, cc-by-sa',
        },
        {
          organ: 'flower',
          author: 'William Coville',
          license: 'cc-by-sa',
          date: {
            timestamp: 1643594214221,
            string: 'January 31, 2022',
          },
          url: {
            o: 'https://bs.plantnet.org/image/o/e5a82aaca33a58602f2dee6898ea79b037df5e17',
            m: 'https://bs.plantnet.org/image/m/e5a82aaca33a58602f2dee6898ea79b037df5e17',
            s: 'https://bs.plantnet.org/image/s/e5a82aaca33a58602f2dee6898ea79b037df5e17',
          },
          citation: 'William Coville / Pl@ntNet, cc-by-sa',
        },
        {
          organ: 'flower',
          author: 'Dana edc',
          license: 'cc-by-sa',
          date: {
            timestamp: 1558712451240,
            string: 'May 24, 2019',
          },
          url: {
            o: 'https://bs.plantnet.org/image/o/f3483628f1b176ad373f524eb2e79296e7636d8e',
            m: 'https://bs.plantnet.org/image/m/f3483628f1b176ad373f524eb2e79296e7636d8e',
            s: 'https://bs.plantnet.org/image/s/f3483628f1b176ad373f524eb2e79296e7636d8e',
          },
          citation: 'Dana edc / Pl@ntNet, cc-by-sa',
        },
      ],
      gbif: {
        id: '3002530',
      },
    },
    {
      score: 0.0079,
      species: {
        scientificNameWithoutAuthor: 'Rosa foetida',
        scientificNameAuthorship: 'Herrm.',
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
        commonNames: [
          'Austrian copper rose',
          'Austrian yellow rose',
          'Austrian-briar',
          ,
        ],
        scientificName: 'Rosa foetida Herrm.',
      },
      images: [
        {
          organ: 'flower',
          author: 'Irmgard Groß',
          license: 'cc-by-sa',
          date: {
            timestamp: 1637787853042,
            string: 'November 24, 2021',
          },
          url: {
            o: 'https://bs.plantnet.org/image/o/935eacea6c5d0c1060941d35c9add3031db9ccde',
            m: 'https://bs.plantnet.org/image/m/935eacea6c5d0c1060941d35c9add3031db9ccde',
            s: 'https://bs.plantnet.org/image/s/935eacea6c5d0c1060941d35c9add3031db9ccde',
          },
          citation: 'Irmgard Groß / Pl@ntNet, cc-by-sa',
        },
        {
          organ: 'flower',
          author: 'Annemarie Ahrens-Stehle',
          license: 'cc-by-sa',
          date: {
            timestamp: 1638551584108,
            string: 'December 3, 2021',
          },
          url: {
            o: 'https://bs.plantnet.org/image/o/5ce744237b76450b48084b5a3ae3a743f7e11f9a',
            m: 'https://bs.plantnet.org/image/m/5ce744237b76450b48084b5a3ae3a743f7e11f9a',
            s: 'https://bs.plantnet.org/image/s/5ce744237b76450b48084b5a3ae3a743f7e11f9a',
          },
          citation: 'Annemarie Ahrens-Stehle / Pl@ntNet, cc-by-sa',
        },
        {
          organ: 'flower',
          author: 'Annemarie Ahrens-Stehle',
          license: 'cc-by-sa',
          date: {
            timestamp: 1630959670618,
            string: 'September 6, 2021',
          },
          url: {
            o: 'https://bs.plantnet.org/image/o/437047d43ad5e124c95885d893d2da61438ffa7d',
            m: 'https://bs.plantnet.org/image/m/437047d43ad5e124c95885d893d2da61438ffa7d',
            s: 'https://bs.plantnet.org/image/s/437047d43ad5e124c95885d893d2da61438ffa7d',
          },
          citation: 'Annemarie Ahrens-Stehle / Pl@ntNet, cc-by-sa',
        },
        {
          organ: 'flower',
          author: 'Annemarie Ahrens-Stehle',
          license: 'cc-by-sa',
          date: {
            timestamp: 1633470148605,
            string: 'October 5, 2021',
          },
          url: {
            o: 'https://bs.plantnet.org/image/o/c902e5c2748b30f6cde8c13493ca3dda12f52d86',
            m: 'https://bs.plantnet.org/image/m/c902e5c2748b30f6cde8c13493ca3dda12f52d86',
            s: 'https://bs.plantnet.org/image/s/c902e5c2748b30f6cde8c13493ca3dda12f52d86',
          },
          citation: 'Annemarie Ahrens-Stehle / Pl@ntNet, cc-by-sa',
        },
      ],
      gbif: {
        id: '3006902',
      },
    },
    {
      score: 0.00281,
      species: {
        scientificNameWithoutAuthor: 'Rosa glauca',
        scientificNameAuthorship: 'Pourr.',
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
        commonNames: ['Redleaf rose', 'Glaucous rose', 'Red-leaved rose'],
        scientificName: 'Rosa glauca Pourr.',
      },
      images: [
        {
          organ: 'flower',
          author: 'Asd Syr',
          license: 'cc-by-sa',
          date: {
            timestamp: 1615545007278,
            string: 'March 12, 2021',
          },
          url: {
            o: 'https://bs.plantnet.org/image/o/bbb15ad4b29b68d8d3212466a44154edf1755306',
            m: 'https://bs.plantnet.org/image/m/bbb15ad4b29b68d8d3212466a44154edf1755306',
            s: 'https://bs.plantnet.org/image/s/bbb15ad4b29b68d8d3212466a44154edf1755306',
          },
          citation: 'Asd Syr / Pl@ntNet, cc-by-sa',
        },
        {
          organ: 'flower',
          author: 'Annemarie Ahrens-Stehle',
          license: 'cc-by-sa',
          date: {
            timestamp: 1629756254029,
            string: 'August 23, 2021',
          },
          url: {
            o: 'https://bs.plantnet.org/image/o/e10706a5a8c5a534df31b6b9e4b6f500ad6d1e7d',
            m: 'https://bs.plantnet.org/image/m/e10706a5a8c5a534df31b6b9e4b6f500ad6d1e7d',
            s: 'https://bs.plantnet.org/image/s/e10706a5a8c5a534df31b6b9e4b6f500ad6d1e7d',
          },
          citation: 'Annemarie Ahrens-Stehle / Pl@ntNet, cc-by-sa',
        },
        {
          organ: 'flower',
          author: 'Annemarie Ahrens-Stehle',
          license: 'cc-by-sa',
          date: {
            timestamp: 1629755588841,
            string: 'August 23, 2021',
          },
          url: {
            o: 'https://bs.plantnet.org/image/o/9a46ab05bbbf4522184dbdf20ec2240e71273b6e',
            m: 'https://bs.plantnet.org/image/m/9a46ab05bbbf4522184dbdf20ec2240e71273b6e',
            s: 'https://bs.plantnet.org/image/s/9a46ab05bbbf4522184dbdf20ec2240e71273b6e',
          },
          citation: 'Annemarie Ahrens-Stehle / Pl@ntNet, cc-by-sa',
        },
        {
          organ: 'flower',
          author: 'Annemarie Ahrens-Stehle',
          license: 'cc-by-sa',
          date: {
            timestamp: 1629753608528,
            string: 'August 23, 2021',
          },
          url: {
            o: 'https://bs.plantnet.org/image/o/92ecfc991801c27ad1d84c92738e639c0575f068',
            m: 'https://bs.plantnet.org/image/m/92ecfc991801c27ad1d84c92738e639c0575f068',
            s: 'https://bs.plantnet.org/image/s/92ecfc991801c27ad1d84c92738e639c0575f068',
          },
          citation: 'Annemarie Ahrens-Stehle / Pl@ntNet, cc-by-sa',
        },
      ],
      gbif: {
        id: '3003709',
      },
    },
    {
      score: 0.00248,
      species: {
        scientificNameWithoutAuthor: 'Camellia japonica',
        scientificNameAuthorship: 'L.',
        genus: {
          scientificNameWithoutAuthor: 'Camellia',
          scientificNameAuthorship: '',
          scientificName: 'Camellia',
        },
        family: {
          scientificNameWithoutAuthor: 'Theaceae',
          scientificNameAuthorship: '',
          scientificName: 'Theaceae',
        },
        commonNames: [
          'Camellia',
          'Camellia Albino Botti',
          'Camellia Don Pedro',
          ,
        ],
        scientificName: 'Camellia japonica L.',
      },
      images: [
        {
          organ: 'flower',
          author: 'Lacey Dillon',
          license: 'cc-by-sa',
          date: {
            timestamp: 1457807487000,
            string: 'March 12, 2016',
          },
          url: {
            o: 'https://bs.plantnet.org/image/o/f42ef02f09f015e291edd5ba247d979a46876b1d',
            m: 'https://bs.plantnet.org/image/m/f42ef02f09f015e291edd5ba247d979a46876b1d',
            s: 'https://bs.plantnet.org/image/s/f42ef02f09f015e291edd5ba247d979a46876b1d',
          },
          citation: 'Lacey Dillon / Pl@ntNet, cc-by-sa',
        },
        {
          organ: 'flower',
          author: 'Dixie La Pierre',
          license: 'cc-by-sa',
          date: {
            timestamp: 1620504692735,
            string: 'May 8, 2021',
          },
          url: {
            o: 'https://bs.plantnet.org/image/o/5c7a92e0b1e1221323fdd1729c421928c9a15eb1',
            m: 'https://bs.plantnet.org/image/m/5c7a92e0b1e1221323fdd1729c421928c9a15eb1',
            s: 'https://bs.plantnet.org/image/s/5c7a92e0b1e1221323fdd1729c421928c9a15eb1',
          },
          citation: 'Dixie La Pierre / Pl@ntNet, cc-by-sa',
        },
        {
          organ: 'flower',
          author: 'Michael Cockrell',
          license: 'cc-by-sa',
          date: {
            timestamp: 1592297688087,
            string: 'June 16, 2020',
          },
          url: {
            o: 'https://bs.plantnet.org/image/o/e3e8af059b339c30a80f16390866aa9fe77b3903',
            m: 'https://bs.plantnet.org/image/m/e3e8af059b339c30a80f16390866aa9fe77b3903',
            s: 'https://bs.plantnet.org/image/s/e3e8af059b339c30a80f16390866aa9fe77b3903',
          },
          citation: 'Michael Cockrell / Pl@ntNet, cc-by-sa',
        },
        {
          organ: 'flower',
          author: 'Andrés Martínez Reche',
          license: 'cc-by-sa',
          date: {
            timestamp: 1619182412248,
            string: 'April 23, 2021',
          },
          url: {
            o: 'https://bs.plantnet.org/image/o/55d29e1a4a30620283c6cc9a44eda36f24ab37e3',
            m: 'https://bs.plantnet.org/image/m/55d29e1a4a30620283c6cc9a44eda36f24ab37e3',
            s: 'https://bs.plantnet.org/image/s/55d29e1a4a30620283c6cc9a44eda36f24ab37e3',
          },
          citation: 'Andrés Martínez Reche / Pl@ntNet, cc-by-sa',
        },
        {
          organ: 'flower',
          author: 'Daniel Rosendo',
          license: 'cc-by-sa',
          date: {
            timestamp: 1594633166191,
            string: 'July 13, 2020',
          },
          url: {
            o: 'https://bs.plantnet.org/image/o/efafa50e379bfc649ef3dce8e3ad9019fe13a963',
            m: 'https://bs.plantnet.org/image/m/efafa50e379bfc649ef3dce8e3ad9019fe13a963',
            s: 'https://bs.plantnet.org/image/s/efafa50e379bfc649ef3dce8e3ad9019fe13a963',
          },
          citation: 'Daniel Rosendo / Pl@ntNet, cc-by-sa',
        },
        {
          organ: 'flower',
          author: 'La Joyeuse Randonneuse',
          license: 'cc-by-sa',
          date: {
            timestamp: 1647885602858,
            string: 'March 21, 2022',
          },
          url: {
            o: 'https://bs.plantnet.org/image/o/e48c36eb958fe731cc199612711d1443cce73dff',
            m: 'https://bs.plantnet.org/image/m/e48c36eb958fe731cc199612711d1443cce73dff',
            s: 'https://bs.plantnet.org/image/s/e48c36eb958fe731cc199612711d1443cce73dff',
          },
          citation: 'La Joyeuse Randonneuse / Pl@ntNet, cc-by-sa',
        },
      ],
      gbif: {
        id: '3189636',
      },
    },
    {
      score: 0.00159,
      species: {
        scientificNameWithoutAuthor: 'Rosa elliptica',
        scientificNameAuthorship: 'Tausch',
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
        commonNames: ['Elliptical Rose'],
        scientificName: 'Rosa elliptica Tausch',
      },
      images: [
        {
          organ: 'flower',
          author: 'Elsa Bordier',
          license: 'cc-by-sa',
          date: {
            timestamp: 1579069664637,
            string: 'January 15, 2020',
          },
          url: {
            o: 'https://bs.plantnet.org/image/o/a6264ab822e0adf7cb1e89534df67fd0c439bbd1',
            m: 'https://bs.plantnet.org/image/m/a6264ab822e0adf7cb1e89534df67fd0c439bbd1',
            s: 'https://bs.plantnet.org/image/s/a6264ab822e0adf7cb1e89534df67fd0c439bbd1',
          },
          citation: 'Elsa Bordier / Pl@ntNet, cc-by-sa',
        },
        {
          organ: 'flower',
          author: 'kokoss kokoss',
          license: 'cc-by-sa',
          date: {
            timestamp: 1586186955277,
            string: 'April 6, 2020',
          },
          url: {
            o: 'https://bs.plantnet.org/image/o/5083c0294c8bdd2d43795fc6ca423bd1c088fc7b',
            m: 'https://bs.plantnet.org/image/m/5083c0294c8bdd2d43795fc6ca423bd1c088fc7b',
            s: 'https://bs.plantnet.org/image/s/5083c0294c8bdd2d43795fc6ca423bd1c088fc7b',
          },
          citation: 'kokoss kokoss / Pl@ntNet, cc-by-sa',
        },
        {
          organ: 'flower',
          author: 'ANJA Becker',
          license: 'cc-by-sa',
          date: {
            timestamp: 1584427095158,
            string: 'March 17, 2020',
          },
          url: {
            o: 'https://bs.plantnet.org/image/o/7c5ad840fa6b2fbc0f74edae8e7410083dbb11ae',
            m: 'https://bs.plantnet.org/image/m/7c5ad840fa6b2fbc0f74edae8e7410083dbb11ae',
            s: 'https://bs.plantnet.org/image/s/7c5ad840fa6b2fbc0f74edae8e7410083dbb11ae',
          },
          citation: 'ANJA Becker / Pl@ntNet, cc-by-sa',
        },
        {
          organ: 'flower',
          author: 'jean-marc stockman',
          license: 'cc-by-sa',
          date: {
            timestamp: 1588511010128,
            string: 'May 3, 2020',
          },
          url: {
            o: 'https://bs.plantnet.org/image/o/432b49d47b87e7ea23446c31a0c4dbd574106942',
            m: 'https://bs.plantnet.org/image/m/432b49d47b87e7ea23446c31a0c4dbd574106942',
            s: 'https://bs.plantnet.org/image/s/432b49d47b87e7ea23446c31a0c4dbd574106942',
          },
          citation: 'jean-marc stockman / Pl@ntNet, cc-by-sa',
        },
      ],
      gbif: {
        id: '3003248',
      },
    },
    {
      score: 0.00121,
      species: {
        scientificNameWithoutAuthor: 'Rosa centifolia',
        scientificNameAuthorship: 'L.',
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
        commonNames: ['Cabbage Rose', 'Hundred-leaved Rose', 'Provence Rose'],
        scientificName: 'Rosa centifolia L.',
      },
      images: [
        {
          organ: 'flower',
          author: 'Dieter Albrecht',
          license: 'cc-by-sa',
          date: {
            timestamp: 1593274586276,
            string: 'June 27, 2020',
          },
          url: {
            o: 'https://bs.plantnet.org/image/o/a3bbc5df54f224872bf2613e39aa07d955c63524',
            m: 'https://bs.plantnet.org/image/m/a3bbc5df54f224872bf2613e39aa07d955c63524',
            s: 'https://bs.plantnet.org/image/s/a3bbc5df54f224872bf2613e39aa07d955c63524',
          },
          citation: 'Dieter Albrecht / Pl@ntNet, cc-by-sa',
        },
        {
          organ: 'flower',
          author: 'Dieter Albrecht',
          license: 'cc-by-sa',
          date: {
            timestamp: 1623251929296,
            string: 'June 9, 2021',
          },
          url: {
            o: 'https://bs.plantnet.org/image/o/5268098fe403342d52e7fb6e8dddd8f43422f079',
            m: 'https://bs.plantnet.org/image/m/5268098fe403342d52e7fb6e8dddd8f43422f079',
            s: 'https://bs.plantnet.org/image/s/5268098fe403342d52e7fb6e8dddd8f43422f079',
          },
          citation: 'Dieter Albrecht / Pl@ntNet, cc-by-sa',
        },
        {
          organ: 'flower',
          author: 'Dieter Albrecht',
          license: 'cc-by-sa',
          date: {
            timestamp: 1623246955188,
            string: 'June 9, 2021',
          },
          url: {
            o: 'https://bs.plantnet.org/image/o/5b817be233a74d98c1fad3fff0fedc6f30ba8a13',
            m: 'https://bs.plantnet.org/image/m/5b817be233a74d98c1fad3fff0fedc6f30ba8a13',
            s: 'https://bs.plantnet.org/image/s/5b817be233a74d98c1fad3fff0fedc6f30ba8a13',
          },
          citation: 'Dieter Albrecht / Pl@ntNet, cc-by-sa',
        },
        {
          organ: 'flower',
          author: 'Dieter Albrecht',
          license: 'cc-by-sa',
          date: {
            timestamp: 1623251929296,
            string: 'June 9, 2021',
          },
          url: {
            o: 'https://bs.plantnet.org/image/o/a77b36a5bdb34e1c2652fe4b0f470cd6cca6a724',
            m: 'https://bs.plantnet.org/image/m/a77b36a5bdb34e1c2652fe4b0f470cd6cca6a724',
            s: 'https://bs.plantnet.org/image/s/a77b36a5bdb34e1c2652fe4b0f470cd6cca6a724',
          },
          citation: 'Dieter Albrecht / Pl@ntNet, cc-by-sa',
        },
      ],
      gbif: {
        id: '3002410',
      },
    },
    {
      score: 0.00114,
      species: {
        scientificNameWithoutAuthor: 'Ranunculus asiaticus',
        scientificNameAuthorship: 'L.',
        genus: {
          scientificNameWithoutAuthor: 'Ranunculus',
          scientificNameAuthorship: '',
          scientificName: 'Ranunculus',
        },
        family: {
          scientificNameWithoutAuthor: 'Ranunculaceae',
          scientificNameAuthorship: '',
          scientificName: 'Ranunculaceae',
        },
        commonNames: [
          'Persian buttercup',
          'Persian crowfoot',
          'Asian buttercup',
          ,
        ],
        scientificName: 'Ranunculus asiaticus L.',
      },
      images: [
        {
          organ: 'flower',
          author: 'Fabrice Rubio',
          license: 'cc-by-sa',
          date: {
            timestamp: 1643732386333,
            string: 'February 1, 2022',
          },
          url: {
            o: 'https://bs.plantnet.org/image/o/76869c58e485110c15c8bb4782e2ade3b6320244',
            m: 'https://bs.plantnet.org/image/m/76869c58e485110c15c8bb4782e2ade3b6320244',
            s: 'https://bs.plantnet.org/image/s/76869c58e485110c15c8bb4782e2ade3b6320244',
          },
          citation: 'Fabrice Rubio / Pl@ntNet, cc-by-sa',
        },
        {
          organ: 'flower',
          author: 'Muhammad Ahsan',
          license: 'cc-by-sa',
          date: {
            timestamp: 1607268738652,
            string: 'December 6, 2020',
          },
          url: {
            o: 'https://bs.plantnet.org/image/o/e0485313e99b33f9269ad72cd64f9ea54a896bec',
            m: 'https://bs.plantnet.org/image/m/e0485313e99b33f9269ad72cd64f9ea54a896bec',
            s: 'https://bs.plantnet.org/image/s/e0485313e99b33f9269ad72cd64f9ea54a896bec',
          },
          citation: 'Muhammad Ahsan / Pl@ntNet, cc-by-sa',
        },
        {
          organ: 'flower',
          author: 'rtld melle',
          license: 'cc-by-sa',
          date: {
            timestamp: 1602790863352,
            string: 'October 15, 2020',
          },
          url: {
            o: 'https://bs.plantnet.org/image/o/206d9b8ca337a3b2e09f8138190b51828def8eb1',
            m: 'https://bs.plantnet.org/image/m/206d9b8ca337a3b2e09f8138190b51828def8eb1',
            s: 'https://bs.plantnet.org/image/s/206d9b8ca337a3b2e09f8138190b51828def8eb1',
          },
          citation: 'rtld melle / Pl@ntNet, cc-by-sa',
        },
        {
          organ: 'flower',
          author: 'nils guerard',
          license: 'cc-by-sa',
          date: {
            timestamp: 1590429269998,
            string: 'May 25, 2020',
          },
          url: {
            o: 'https://bs.plantnet.org/image/o/69cc049bac04b54da628c2042216ca30ed5ec8bf',
            m: 'https://bs.plantnet.org/image/m/69cc049bac04b54da628c2042216ca30ed5ec8bf',
            s: 'https://bs.plantnet.org/image/s/69cc049bac04b54da628c2042216ca30ed5ec8bf',
          },
          citation: 'nils guerard / Pl@ntNet, cc-by-sa',
        },
        {
          organ: 'flower',
          author: 'Fabrice Rubio',
          license: 'cc-by-sa',
          date: {
            timestamp: 1643733943382,
            string: 'February 1, 2022',
          },
          url: {
            o: 'https://bs.plantnet.org/image/o/24730cd05d38a4cf799c9a22500bc0aefaf444cf',
            m: 'https://bs.plantnet.org/image/m/24730cd05d38a4cf799c9a22500bc0aefaf444cf',
            s: 'https://bs.plantnet.org/image/s/24730cd05d38a4cf799c9a22500bc0aefaf444cf',
          },
          citation: 'Fabrice Rubio / Pl@ntNet, cc-by-sa',
        },
        {
          organ: 'flower',
          author: 'ConecTudo',
          license: 'cc-by-sa',
          date: {
            timestamp: 1632143840212,
            string: 'September 20, 2021',
          },
          url: {
            o: 'https://bs.plantnet.org/image/o/0f0175263b17b6fd0e008ceb1789cc502a63ce3b',
            m: 'https://bs.plantnet.org/image/m/0f0175263b17b6fd0e008ceb1789cc502a63ce3b',
            s: 'https://bs.plantnet.org/image/s/0f0175263b17b6fd0e008ceb1789cc502a63ce3b',
          },
          citation: 'ConecTudo / Pl@ntNet, cc-by-sa',
        },
      ],
      gbif: {
        id: '7721054',
      },
    },
    {
      score: 0.00107,
      species: {
        scientificNameWithoutAuthor: 'Rosa × damascena',
        scientificNameAuthorship: 'Herrm.',
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
        commonNames: [
          'Portland rose',
          'York-and-Lancaster rose',
          'Damask rose',
          ,
        ],
        scientificName: 'Rosa × damascena Herrm.',
      },
      images: [
        {
          organ: 'flower',
          author: 'Nicole Enriquez Durand',
          license: 'cc-by-sa',
          date: {
            timestamp: 1652195576368,
            string: 'May 10, 2022',
          },
          url: {
            o: 'https://bs.plantnet.org/image/o/28fc3e89713fa7b492c17c965b59969880add03f',
            m: 'https://bs.plantnet.org/image/m/28fc3e89713fa7b492c17c965b59969880add03f',
            s: 'https://bs.plantnet.org/image/s/28fc3e89713fa7b492c17c965b59969880add03f',
          },
          citation: 'Nicole Enriquez Durand / Pl@ntNet, cc-by-sa',
        },
      ],
      gbif: {
        id: '3008478',
      },
    },
    {
      score: 0.00106,
      species: {
        scientificNameWithoutAuthor: 'Rosa abietina',
        scientificNameAuthorship: 'Gren. ex H.Christ',
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
        commonNames: ['Pine Rose', 'Patio Rose'],
        scientificName: 'Rosa abietina Gren. ex H.Christ',
      },
      images: [
        {
          organ: 'flower',
          author: 'Mejía Pilonieta Eduardo',
          license: 'cc-by-sa',
          date: {
            timestamp: 1579788994887,
            string: 'January 23, 2020',
          },
          url: {
            o: 'https://bs.plantnet.org/image/o/69152bfaf1a365ab60939b0163e8c11391dbea8f',
            m: 'https://bs.plantnet.org/image/m/69152bfaf1a365ab60939b0163e8c11391dbea8f',
            s: 'https://bs.plantnet.org/image/s/69152bfaf1a365ab60939b0163e8c11391dbea8f',
          },
          citation: 'Mejía Pilonieta Eduardo / Pl@ntNet, cc-by-sa',
        },
      ],
      gbif: {
        id: '3005999',
      },
    },
  ],
  version: '2022-05-12 (6.0)',
};
export const CameraImage = ({route, navigation}) => {
  const {path, type} = route?.params;
  const [detecting, setDeteting] = useState(false);
  const goBack = () => {
    navigation.goBack();
  };
  const detectPhoto = () => {
    setDeteting(true);
    const data = new FormData();
    data.append('images', {
      name: 'image',
      type: 'image/jpeg',
      uri:
        type === 'capture'
          ? Platform.OS === 'android'
            ? `file://${path}`
            : path
          : path,
    });
    console.log(JSON.stringify(data));
    // setTimeout(() => {
    //   const result = res?.results as PlantResult[];
    //   const filterResult = result?.filter(re => Number(re.score) * 100 >= 20); // only accept the result score > 30%
    //   if (filterResult.length) {
    //     navigation.navigate('Camera-Result', {
    //       results: filterResult,
    //     });
    //   } else {
    //     navigation.navigate('Camera-Error', {path: path, type});
    //   }
    //   setDeteting(false);
    // }, 5000);
    axios
      .post('http://192.168.1.3:8000/identify', data, {
        headers: {
          // Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        params: {
          project: 'all',
          include_related_images: true,
        },
      })
      .then(res => {
        const result = res.data?.results as PlantResult[];
        console.log(result);
        const filterResult = result?.filter(re => Number(re.score) * 100 >= 5); // only accept the result score > 30%
        if (filterResult.length) {
          navigation.navigate('Camera-Result', {
            results: filterResult,
          });
        } else {
          navigation.navigate('Camera-Error', {path: path, type});
        }
        setDeteting(false);
      })
      .catch(error => {
        console.log('error', error);
        navigation.navigate('Camera-Error', {path: path, type});
        setDeteting(false);
      });
  };
  console.log(path, type);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goBack} style={styles.closeButton}>
        <Svg width="44" height="44" viewBox="0 0 44 44" fill="none">
          <Path
            opacity="0.4"
            d="M22 40.3333C32.1252 40.3333 40.3333 32.1252 40.3333 22C40.3333 11.8748 32.1252 3.66667 22 3.66667C11.8748 3.66667 3.66667 11.8748 3.66667 22C3.66667 32.1252 11.8748 40.3333 22 40.3333Z"
            fill="#222222"
          />
          <Path
            d="M23.9433 22L28.16 17.7833C28.6917 17.2517 28.6917 16.3717 28.16 15.84C27.6283 15.3083 26.7483 15.3083 26.2167 15.84L22 20.0567L17.7833 15.84C17.2517 15.3083 16.3717 15.3083 15.84 15.84C15.3083 16.3717 15.3083 17.2517 15.84 17.7833L20.0567 22L15.84 26.2167C15.3083 26.7483 15.3083 27.6283 15.84 28.16C16.115 28.435 16.4633 28.5633 16.8117 28.5633C17.16 28.5633 17.5083 28.435 17.7833 28.16L22 23.9433L26.2167 28.16C26.4917 28.435 26.84 28.5633 27.1883 28.5633C27.5367 28.5633 27.885 28.435 28.16 28.16C28.6917 27.6283 28.6917 26.7483 28.16 26.2167L23.9433 22Z"
            fill="white"
          />
        </Svg>
      </TouchableOpacity>
      <View style={styles.imageView}>
        {path && (
          <Image
            style={styles.image}
            source={{
              uri:
                type === 'capture'
                  ? Platform.OS === 'android'
                    ? `file:///${path}`
                    : path
                  : path,
            }}
          />
        )}
      </View>
      {detecting ? (
        // eslint-disable-next-line react-native/no-inline-styles
        <View style={{...styles.buttonContainer, alignItems: 'center'}}>
          <Svg width="44" height="44" viewBox="0 0 44 44" fill="none">
            <Path
              d="M40.3333 17.875C39.5816 17.875 38.9583 17.2517 38.9583 16.5V12.8333C38.9583 8.10332 35.8966 5.04166 31.1666 5.04166H12.8333C8.10329 5.04166 5.04163 8.10332 5.04163 12.8333V16.5C5.04163 17.2517 4.41829 17.875 3.66663 17.875C2.91496 17.875 2.29163 17.2517 2.29163 16.5V12.8333C2.29163 6.52666 6.52663 2.29166 12.8333 2.29166H31.1666C37.4733 2.29166 41.7083 6.52666 41.7083 12.8333V16.5C41.7083 17.2517 41.085 17.875 40.3333 17.875Z"
              fill="#678F58"
            />
            <Path
              d="M31.1666 41.7083H12.8333C6.52663 41.7083 2.29163 37.4733 2.29163 31.1667V27.5C2.29163 26.7483 2.91496 26.125 3.66663 26.125C4.41829 26.125 5.04163 26.7483 5.04163 27.5V31.1667C5.04163 35.8967 8.10329 38.9583 12.8333 38.9583H31.1666C35.8966 38.9583 38.9583 35.8967 38.9583 31.1667V27.5C38.9583 26.7483 39.5816 26.125 40.3333 26.125C41.085 26.125 41.7083 26.7483 41.7083 27.5V31.1667C41.7083 37.4733 37.4733 41.7083 31.1666 41.7083Z"
              fill="#678F58"
            />
            <Path
              d="M40.3333 23.375H3.66663C2.91496 23.375 2.29163 22.7517 2.29163 22C2.29163 21.2483 2.91496 20.625 3.66663 20.625H40.3333C41.085 20.625 41.7083 21.2483 41.7083 22C41.7083 22.7517 41.085 23.375 40.3333 23.375Z"
              fill="#678F58"
            />
            <Path
              opacity="0.4"
              d="M30.25 16.5H13.75C13.2367 16.5 12.8334 16.0967 12.8334 15.5833V11.9167C12.8334 10.4133 14.0617 9.16666 15.5834 9.16666H28.4167C29.9384 9.16666 31.1667 10.4133 31.1667 11.9167V15.5833C31.1667 16.0967 30.7634 16.5 30.25 16.5Z"
              fill="#678F58"
            />
            <Path
              opacity="0.4"
              d="M30.25 27.5H13.75C13.2367 27.5 12.8334 27.9033 12.8334 28.4167V32.0833C12.8334 33.5867 14.0617 34.8333 15.5834 34.8333H28.4167C29.9384 34.8333 31.1667 33.5867 31.1667 32.0833V28.4167C31.1667 27.9033 30.7634 27.5 30.25 27.5Z"
              fill="#678F58"
            />
          </Svg>
          <Text style={{...TextStyle.bodyText, color: theme.color.primary}}>
            {'Detecting...'}
          </Text>
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <Button
            onPress={detectPhoto}
            textStyle={{color: theme.color.white}}
            text={'Use this photo'}
          />
          <Button
            onPress={goBack}
            buttonStyle={styles.retakeButton}
            text={'Retake'}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    padding: SAFE_AREA_PADDING.paddingLeft,
  },
  imageView: {
    // flex: 1,
    padding: '10%',
    height: '60%',
    marginTop: theme.spacing.double,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: theme.spacing.double,
  },
  buttonContainer: {
    paddingVertical: '10%',
    paddingHorizontal: '15%',
    width: '100%',
  },
  retakeButton: {
    marginTop: theme.spacing.double,
    backgroundColor: theme.color.white,
    borderWidth: 1,
    borderColor: theme.color.dark,
  },
  closeButton: {
    // position: 'absolute',
    // left: SAFE_AREA_PADDING.paddingLeft,
    marginTop: SAFE_AREA_PADDING.paddingTop,
  },
});
