import { View, StyleSheet } from 'react-native';

import ModalWrapper from '@components/common/ModalWrapper';
import ModalHeader from '@components/common/ModalHeader';
import Button from '@components/common/forms/Button';
import Colors from '@/lib/constants/Colors';
import BodyText from '@components/common/BodyText';
import { TCampaign } from '@definitions/campaign';

export default function InviteMembersModal({
  visible,
  setModalVisible,
  campaign
}: {
  visible: boolean
  setModalVisible: (visible: boolean) => void
  campaign: TCampaign
}) {

  return (
    <ModalWrapper visible={visible} setModalVisible={setModalVisible}>
      <View style={{display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between', width: '100%'}}>
        <View>
          <ModalHeader text="Join A Campaign" />

          <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <View style={styles.inviteCodeBlock}>
              <BodyText textSize="sm">Campaign invite code:</BodyText>
              <BodyText textSize="lg" bold={true}>{campaign.campaignCode}</BodyText>
            </View>
          </View>
        </View>

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
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  inviteCodeBlock: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    borderColor: Colors.BORDER.DARKEN,
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginBottom: 20,
    marginTop: 20
  }
});