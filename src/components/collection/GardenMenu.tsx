import React, {useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import {TextStyle} from '../../styles/base';
import {theme} from '../../theme/theme';
import {Button} from '../Button';
import ModalBlock from '../ModalBlock';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {
  CollectionState,
  deletePlant,
  renamePlant,
  selectCollections,
} from '../../store/slices/collection';
import {ErrorModal} from '../../components/ErrorModal';
import {PlantResult} from '../../types';

interface GardenMenuProps {
  isVisible: boolean;
  backDropPress: () => void;
  plant: PlantResult;
  collection: CollectionState;
}
const ModalBody = ({backDropPress, setVisible}) => {
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
            onPress={() => {
              setVisible({visible: true, title: 'Rename Plant'});
              backDropPress();
            }}
            style={styles.button}>
            <Text style={TextStyle.bodyText}>{'Rename Plant'}</Text>
          </TouchableOpacity>
          <View style={styles.horizontalLine} />
          <TouchableOpacity
            onPress={() => {
              setVisible({visible: true, title: 'Delete Plant'});
              backDropPress();
            }}
            style={styles.button}>
            <Text style={{...TextStyle.bodyText, color: theme.color.danger}}>
              {'Delete Plant'}
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
    </>
  );
};
export const GardenMenu = ({
  isVisible,
  backDropPress,
  plant,
  collection,
}: GardenMenuProps) => {
  const [isSubMenuVisible, setSubmenuVisible] = useState({
    visible: false,
    title: '',
  });
  const [errorVisible, setErrorVisible] = useState(false);
  const collections = useAppSelector(selectCollections);
  const dispatch = useAppDispatch();
  const removePlant = () => () => {
    dispatch(
      deletePlant({
        collectionId: collection?.id,
        plant: plant,
      }),
    );
    setSubmenuVisible({
      visible: false,
      title: '',
    });
    backDropPress();
  };
  const changePlantName = (newName: string) => () => {
    const existedCollection = collections.find(e => e.name === newName);
    if (!existedCollection) {
      dispatch(
        renamePlant({
          collectionId: collection?.id,
          plant,
          newName,
        }),
      );
      setSubmenuVisible({
        visible: false,
        title: '',
      });
      backDropPress();
      return true;
    } else {
      setErrorVisible(true);
      return false;
    }
  };

  return (
    <>
      <View style={{...styles.container}}>
        {isVisible && (
          <Modal
            useNativeDriver={true}
            isVisible={isVisible}
            hasBackdrop={true}
            statusBarTranslucent
            style={{...styles.modal}}
            backdropColor={theme.color.dark}
            deviceHeight={Dimensions.get('screen').height}
            backdropOpacity={0.8}
            onBackdropPress={() => {}}
            animationIn={'fadeInUp'}
            animationOut={'fadeOutDown'}>
            <View style={styles.modalBody}>
              <ModalBody
                setVisible={setSubmenuVisible}
                backDropPress={backDropPress}
              />
            </View>
          </Modal>
        )}
        {isSubMenuVisible.visible && (
          <ModalBlock
            inputPlaceHolder="Name your plant"
            deleteTile="Are you sure to delete this plant?"
            title={isSubMenuVisible.title}
            isDeleteModal={isSubMenuVisible.title === 'Delete Plant'}
            onBackdropPress={() => {
              setSubmenuVisible({
                visible: false,
                title: '',
              });
              backDropPress();
            }}
            extraAction={
              isSubMenuVisible.title === 'Delete Plant'
                ? removePlant
                : changePlantName
            }
            defaultColName={plant?.species?.scientificNameWithoutAuthor || ''}
            isVisible={isSubMenuVisible.visible}>
            {errorVisible && (
              <ErrorModal
                isVisible={errorVisible}
                backdropPress={() => setErrorVisible(false)}
                message={'Plant name already existed!'}
              />
            )}
          </ModalBlock>
        )}
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
