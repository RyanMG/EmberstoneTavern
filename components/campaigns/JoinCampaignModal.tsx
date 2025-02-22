import { Text, StyleSheet } from 'react-native';
import Button from '@components/common/forms/Button';
import ModalWrapper from '@components/common/ModalWrapper';

export default function JoinCampaignModal({
  visible,
  setModalVisible
}: {
  visible: boolean
  setModalVisible: (visible: boolean) => void
}) {
  return (
    <ModalWrapper visible={visible} setModalVisible={setModalVisible}>
      <Text style={styles.modalText}>Join a Campaign</Text>
      <Button
        title="Close"
        onPress={() => {
          setModalVisible(!visible);
        }}
      />
    </ModalWrapper>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});