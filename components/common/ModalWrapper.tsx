import { ReactNode } from 'react';
import { Modal, View, StyleSheet } from 'react-native';
import Colors from '@constants/Colors';

export default function ModalWrapper({
  visible,
  setModalVisible,
  children
}: {
  visible: boolean
  setModalVisible: (visible: boolean) => void
  children: ReactNode
}) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        setModalVisible(!visible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {children}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalView: {
    borderColor: Colors.BORDER.BASE,
    borderWidth: 1,
    backgroundColor: Colors.BACKGROUND.LIGHTEN,
    width: '98%',
    height: '98%',
    padding: 20,
    borderRadius: 5,
    alignItems: 'center'
  }
});
