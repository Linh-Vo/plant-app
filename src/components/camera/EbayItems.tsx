import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, Linking, ActivityIndicator} from 'react-native';
import {TextStyle} from '../../styles/base';
import {EbayItems} from '../../types';
import Touchable from '../../components/CustomTouchable';
import axios from 'axios';
import {API_URL} from 'react-native-dotenv';
import {theme} from '../../theme/theme';

const EbayItem = ({plantName}) => {
  const [ebayItems, setItems] = useState<EbayItems[] | []>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`${API_URL}/ebay-items`, {
        params: {
          plant_name: plantName,
        },
      })
      .then(res => {
        setLoading(false);
        const data = res.data;
        const items =
          (data?.findItemsAdvancedResponse &&
            data?.findItemsAdvancedResponse[0]?.searchResult[0]?.item) ||
          [];
        setItems(items);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [plantName]);
  if (loading) {
    return <ActivityIndicator size={'small'} color={theme.color.primary} />;
  }
  return ebayItems?.length > 0 ? (
    <View style={{marginTop: theme.spacing.triple}}>
      <Text
        // eslint-disable-next-line react-native/no-inline-styles
        style={{...TextStyle.bodyText, opacity: 0.6}}>
        {'Where to buy'}
      </Text>
      <ScrollView
        style={{marginTop: theme.spacing.double}}
        showsVerticalScrollIndicator={false}>
        {ebayItems.map((it, idx) => (
          <Touchable
            key={idx}
            onPress={() => Linking.openURL(`${it.viewItemURL[0]}`)}
            it={it}
          />
        ))}
      </ScrollView>
    </View>
  ) : null;
};

export default EbayItem;
