import { Text, View, StyleSheet } from 'react-native';

import ModalWrapper from '@components/common/ModalWrapper';
import Button from '@components/common/forms/Button';
import Colors from '@/lib/constants/Colors';

export default function CreateNewCampaignModal({
  visible,
  setModalVisible
}: {
  visible: boolean
  setModalVisible: (visible: boolean) => void
}) {

  return (
    <ModalWrapper visible={visible} setModalVisible={setModalVisible}>
      <View style={{width: '100%'}}>
        <Text style={styles.modalHeader}>Invite Members</Text>

        <Button
          title="Close"
          onPress={() => {
            setModalVisible(false);
          }}
        />

      </View>
    </ModalWrapper>
  );
}

const styles = StyleSheet.create({
  modalHeader: {
    color: Colors.TEXT.GREEN,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 24,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER.GREEN,
    paddingBottom: 4,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});