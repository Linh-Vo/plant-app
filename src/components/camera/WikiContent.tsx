import React, {useEffect, useState} from 'react';
import {View, Text, Linking, ActivityIndicator} from 'react-native';
import {TextStyle} from '../../styles/base';
import {PlantWikiInfo} from '../../types';
import axios from 'axios';
import {API_URL} from 'react-native-dotenv';
import {theme} from '../../theme/theme';

const WikiItem = ({plantName}) => {
  const [wikiInfo, setWikiInfo] = useState<PlantWikiInfo | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`${API_URL}/wiki-info`, {
        params: {
          plant_name: plantName,
        },
      })
      .then(res => {
        setLoading(false);
        setWikiInfo(res.data);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [plantName]);
  if (loading) {
    return (
      <View style={{marginTop: theme.spacing.triple}}>
        <ActivityIndicator size={'small'} color={theme.color.primary} />
      </View>
    );
  }
  return wikiInfo?.description || wikiInfo?.introduction ? (
    <View style={{marginTop: theme.spacing.triple}}>
      <Text
        // eslint-disable-next-line react-native/no-inline-styles
        style={{...TextStyle.bodyText, opacity: 0.6}}>
        {'Description'}
      </Text>
      <Text
        style={{
          ...TextStyle.titleText,
          marginTop: theme.spacing.base,
        }}>
        {(wikiInfo?.description?.length && wikiInfo?.description?.join()) ||
          wikiInfo?.introduction}
      </Text>
      <Text
        style={{
          ...TextStyle.titleText,
          color: theme.color.primary,
          marginTop: theme.spacing.base,
        }}
        onPress={() =>
          Linking.openURL(`https://en.wikipedia.org/wiki/${plantName}`)
        }>
        {'Read more on Wikipedia'}
      </Text>
    </View>
  ) : null;
};

export default WikiItem;
