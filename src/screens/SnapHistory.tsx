import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import FocusAwareStatusBar from '../components/FocusStatusBar';
import {theme} from '../theme/theme';
import {Container, TextStyle} from '../styles/base';
import {ResultBlock} from '../components/ResultBlock';
import {useAppSelector} from '../hooks/redux';
import {selectScanHistoryState} from '../store/slices/scan';
import FastImage from 'react-native-fast-image';
import {Button} from '../components/Button';

export const SnapHistoryScreen = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const scanHistory = useAppSelector(selectScanHistoryState) || [];
  return (
    <View style={{...styles.container, paddingTop: insets.top}}>
      <FocusAwareStatusBar
        backgroundColor={'transparent'}
        translucent
        barStyle={'dark-content'}
      />
      <Text style={{...TextStyle.h4Text, paddingVertical: theme.spacing.base}}>
        {'Scan history'}
      </Text>
      {scanHistory.length ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          style={{marginTop: theme.spacing.triple}}
          data={scanHistory}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => (
            <View
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                marginBottom:
                  index === scanHistory.length - 1 ? 40 + insets.bottom / 2 : 0,
              }}>
              <ResultBlock plant={item} isScanBlock={true} scanHistory={item} />
            </View>
          )}
        />
      ) : (
        <View style={{...Container.center}}>
          <View style={{width: '70%', height: '25%'}}>
            <FastImage
              resizeMode="contain"
              style={Container.fullScreen}
              source={require('../assets/images/empty-plant.png')}
            />
          </View>
          <Text style={styles.emptyText}>{'No scans in here'}</Text>
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
    marginBottom: 14,
  },
  emptyText: {
    ...TextStyle.titleText,
    opacity: 0.6,
    marginVertical: theme.spacing.double,
  },
});
