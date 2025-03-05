import { ReactNode } from 'react';
import { Modal, View, StyleSheet } from 'react-native';
import COLORS from '@constants/colors';

import BodyText from '@components/common/BodyText';
import IconButton from '@components/common/forms/IconButton';

export default function ModalWrapper({
  visible,
  closeModal,
  children,
  title
}: {
  visible: boolean
  closeModal: () => void
  children: ReactNode
  title: string
}) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        closeModal();
      }}>
      <View style={styles.overlay} />
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <View style={{flex: 1}}>
              <BodyText textSize="xl" bold={true}>{title}</BodyText>
            </View>

            <IconButton
              iconName="close"
              theme="white"
              iconSize={28}
              onPress={() => closeModal()}
            />
          </View>

          <View style={{padding: 20, width: '100%'}}>
            {children}
          </View>

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'black',
    opacity: 0.6
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalView: {
    borderColor: COLORS.BORDER.BASE,
    borderWidth: 1,
    backgroundColor: COLORS.BACKGROUND.LIGHTEN,
    width: '95%',
    borderRadius: 5,
    alignItems: 'center'
  },
  modalHeader: {
    width: '100%',
    height: 50,
    backgroundColor: COLORS.BACKGROUND.GREEN,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER.DARKEN50
  }
});
