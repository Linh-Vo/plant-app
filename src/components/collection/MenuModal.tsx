import React, {useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import Svg, {Path} from 'react-native-svg';
import {TextStyle} from '../../styles/base';
import {theme} from '../../theme/theme';
import {Button} from '../Button';
import ModalBlock from '../ModalBlock';

const ModalBody = ({backDropPress, collectionName}) => {
  const [isVisible, setVisible] = useState({visible: false, title: ''});
  return (
    <>
      <View style={styles.modalBody}>
        <View
          style={{
            backgroundColor: theme.color.white,
            borderRadius: theme.radius.xMedium,
            marginBottom: theme.spacing.double,
          }}>
          <TouchableOpacity
            onPress={() =>
              setVisible({visible: true, title: 'Rename Collection'})
            }
            style={styles.button}>
            <Text style={TextStyle.bodyText}>{'Rename Collection'}</Text>
          </TouchableOpacity>
          <View style={styles.horizontalLine} />
          <TouchableOpacity
            onPress={() =>
              setVisible({visible: true, title: 'Delete Collection'})
            }
            style={styles.button}>
            <Text style={{...TextStyle.bodyText, color: theme.color.danger}}>
              {'Delete Collection'}
            </Text>
          </TouchableOpacity>
        </View>
        <Button
          onPress={backDropPress}
          buttonStyle={{
            backgroundColor: theme.color.white,
            borderRadius: theme.radius.xMedium,
          }}
          text="Cancel"
        />
      </View>
      <ModalBlock
        title={isVisible.title}
        isDeleteModal={isVisible.title === 'Delete Collection'}
        onBackdropPress={() => {
          backDropPress();
        }}
        isVisible={isVisible.visible}
      />
    </>
  );
};
export const MenuModal = ({isVisible, backDropPress, name}) => {
  return (
    <>
      <View style={styles.container}>
        <Modal
          isVisible={isVisible}
          hasBackdrop={true}
          style={styles.modal}
          backdropColor={theme.color.dark}
          backdropOpacity={0.8}
          onBackdropPress={() => {}}
          animationIn={'fadeInLeft'}
          animationOut={'fadeOutDown'}>
          <View style={styles.modalBody}>
            <ModalBody collectionName={name} backDropPress={backDropPress} />
          </View>
        </Modal>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: theme.spacing.double,
  },
  modal: {
    justifyContent: 'flex-end',
    paddingBottom: theme.spacing.double,
  },
  modalBody: {
    // padding: theme.spacing.double,
    // backgroundColor: 'red',
    borderRadius: theme.spacing.double,
  },
  button: {
    alignItems: 'center',
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
});
