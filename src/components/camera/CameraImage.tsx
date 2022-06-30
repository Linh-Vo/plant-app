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
import LottieView from 'lottie-react-native';
import {theme} from '../../theme/theme';
import {Button} from '../../components/Button';
import Svg, {Path} from 'react-native-svg';
import {SAFE_AREA_PADDING} from '../../utils/constants';
import {TextStyle} from '../../styles/base';
import {PlantResult} from '../../types';

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
      .post('http://192.168.1.3:8088/identify', data, {
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
        const filterResult = result?.filter(re => Number(re.score) * 100 >= 5); // only accept the result score > 30%
        if (filterResult?.length) {
          navigation.navigate('Camera-Result', {
            results: filterResult,
          });
        } else {
          const params = {path: path, type};
          if (res.data?.statusCode === 404) {
            params.errorText = 'No plants found';
          } else if (res.data?.statusCode === 429) {
            params.errorText = 'Server error, please try again!';
          }
          navigation.navigate('Camera-Error', params);
        }
        setDeteting(false);
      })
      .catch(error => {
        console.log('error', error);
        navigation.navigate('Camera-Error', {
          path: path,
          type,
          errorText: 'Server error, please try again!',
        });
        setDeteting(false);
      });
  };
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
          <View style={{width: 80, height: 80}}>
            <LottieView
              source={require('../../assets/images/scanning.json')}
              autoPlay
              loop
            />
          </View>
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
