import React from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
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
}
export default function ModalBlock(props: ModalBlockProps) {
  return (
    <View style={styles.container}>
      <Modal
        avoidKeyboard={true}
        statusBarTranslucent
        onBackdropPress={props.onBackdropPress}
        isVisible={props.isVisible}
        animationIn={'fadeInUp'}
        animationOut={'fadeOutDown'}
        backdropColor={theme.color.dark}
        backdropOpacity={0.8}>
        <View style={styles.modalBody}>
          <View style={styles.headerView}>
            <Text style={TextStyle.titleText}>{props.title}</Text>
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
                {'Are you sure you want to delete collection?'}
              </Text>
              <Button
                textStyle={{color: theme.color.white}}
                onPress={() => {}}
                text="Confirm"
              />
            </>
          ) : (
            <>
              <TextInput
                placeholderTextColor={'#22222299'}
                style={styles.input}
                placeholder="Name your collection"
              />
              <Button
                textStyle={{color: theme.color.white}}
                onPress={() => {}}
                text="Save"
              />
            </>
          )}
        </View>
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
    ...TextStyle.h4Text,
    paddingVertical: theme.spacing.double,
    textAlign: 'center',
    fontSize: 20,
    color: theme.color.danger,
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
