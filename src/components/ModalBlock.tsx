import React, {useState} from 'react';
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import Svg, {Path} from 'react-native-svg';
import {TextStyle} from '../styles/base';
import {theme} from '../theme/theme';
import {Button} from './Button';

interface ModalBlockProps {
  isVisible: boolean;
  onBackdropPress: () => void;
  title: string;
  isDeleteModal?: boolean;
  extraAction: any;
  defaultColName?: string;
  children?: any;
  inputPlaceHolder?: string;
  deleteTile?: string;
}
export default function ModalBlock(props: ModalBlockProps) {
  const [collectionName, setName] = useState(props.defaultColName || '');
  return (
    <View style={styles.container}>
      <Modal
        backdropTransitionOutTiming={0}
        useNativeDriver={true}
        avoidKeyboard={true}
        statusBarTranslucent
        deviceHeight={Dimensions.get('screen').height}
        onBackdropPress={props.onBackdropPress}
        isVisible={props.isVisible}
        animationIn={'fadeInUp'}
        animationOut={'fadeOutDown'}
        backdropColor={theme.color.dark}
        backdropOpacity={0.8}>
        {!props.children && (
          <View style={styles.modalBody}>
            <View style={styles.headerView}>
              <Text
                style={{
                  ...TextStyle.titleText,
                  fontFamily: theme.font.familyBold,
                }}>
                {props.title}
              </Text>
              <Pressable onPress={props.onBackdropPress}>
                <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <Path
                    opacity="0.4"
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    fill="#222222"
                  />
                  <Path
                    d="M13.06 11.9999L15.36 9.69986C15.65 9.40986 15.65 8.92986 15.36 8.63986C15.07 8.34986 14.59 8.34986 14.3 8.63986L12 10.9399L9.7 8.63986C9.41 8.34986 8.93 8.34986 8.64 8.63986C8.35 8.92986 8.35 9.40986 8.64 9.69986L10.94 11.9999L8.64 14.2999C8.35 14.5899 8.35 15.0699 8.64 15.3599C8.79 15.5099 8.98 15.5799 9.17 15.5799C9.36 15.5799 9.55 15.5099 9.7 15.3599L12 13.0599L14.3 15.3599C14.45 15.5099 14.64 15.5799 14.83 15.5799C15.02 15.5799 15.21 15.5099 15.36 15.3599C15.65 15.0699 15.65 14.5899 15.36 14.2999L13.06 11.9999Z"
                    fill="#222222"
                  />
                </Svg>
              </Pressable>
            </View>
            {props.isDeleteModal ? (
              <>
                <Text style={styles.deleteText}>
                  {props.deleteTile ||
                    'Are you sure to delete this collection?'}
                </Text>
                <View
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{flexDirection: 'row', marginTop: 16}}>
                  <Button
                    // eslint-disable-next-line react-native/no-inline-styles
                    buttonStyle={{
                      flex: 1,
                      marginRight: 8,
                      borderWidth: 1,
                      backgroundColor: theme.color.white,
                    }}
                    onPress={props.onBackdropPress}
                    text="No"
                  />
                  <Button
                    // eslint-disable-next-line react-native/no-inline-styles
                    buttonStyle={{
                      flex: 1,
                      marginLeft: 8,
                      backgroundColor: theme.color.danger,
                    }}
                    textStyle={{color: theme.color.white}}
                    onPress={props.extraAction()}
                    text="Yes"
                  />
                </View>
              </>
            ) : (
              <>
                <TextInput
                  onChangeText={text => setName(text)}
                  placeholderTextColor={'#22222299'}
                  style={styles.input}
                  defaultValue={collectionName}
                  placeholder={props.inputPlaceHolder || 'Name your collection'}
                />
                <Button
                  isDisable={
                    collectionName === props.defaultColName || !collectionName
                  }
                  textStyle={{color: theme.color.white}}
                  onPress={() => {
                    if (props.extraAction(collectionName)()) {
                      setName('');
                    } else {
                      setName(collectionName);
                    }
                  }}
                  text="Save"
                />
              </>
            )}
          </View>
        )}
        {props.children}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.double,
  },
  modalBody: {
    padding: theme.spacing.double,
    backgroundColor: theme.color.white,
    borderRadius: theme.spacing.double,
    // height: 188,
  },
  deleteText: {
    ...TextStyle.bodyText,
    textAlign: 'center',
    paddingVertical: 16,
  },
  headerView: {flexDirection: 'row', justifyContent: 'space-between'},
  input: {
    ...TextStyle.bodyText,
    borderColor: 'rgba(34, 34, 34, 0.1)',
    padding: theme.spacing.double,
    borderRadius: theme.radius.xMedium,
    borderWidth: 1,
    borderStyle: 'solid',
    marginVertical: theme.spacing.double,
  },
});
