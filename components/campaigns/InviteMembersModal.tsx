import { View, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';

import ModalWrapper from '@components/common/ModalWrapper';
import COLORS from '@constants/colors';
import BodyText from '@/components/common/text/BodyText';
import InputElementWithButton from '@components/common/forms/InputElementWithButton';
import Spacer from '@components/common/Spacer';
import Divider from '@components/common/Divider';

import { inviteMemberByEmail } from '@api/campaignInvitesApi';
import Campaign from '@classes/Campaign';
import { isValidEmail } from '@utils/formUtils';
import { useNotification } from '@context/NotificationContext';

export default function InviteMembersModal({
  visible,
  setModalVisible,
  campaign
}: {
  visible: boolean
  setModalVisible: (visible: boolean) => void
  campaign: Campaign
}) {

  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string | undefined>();
  const { showNotification } = useNotification();

  const { isPending, isError, isSuccess, mutate } = useMutation({
    mutationFn: () => inviteMemberByEmail(campaign.id, email)
  })

  useEffect(() => {
    if (isError) {
      setEmailError("Error inviting member");
    }
    if (isSuccess) {
      setEmail('');
      setModalVisible(false);
      showNotification(`Invite sent to ${email}`);
    }
  }, [isError, isSuccess])

  return (
    <ModalWrapper visible={visible} closeModal={() => setModalVisible(false)} title="Invite Members">
      <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
        <View style={styles.inviteCodeBlock}>
          <BodyText textSize="sm">Campaign invite code:</BodyText>
          <BodyText textSize="lg" bold={true}>{campaign.campaignCode}</BodyText>
        </View>
      </View>
      <Divider />
      <BodyText textSize="md" center={true} italic={true}>Or invite people to your campaign using their email address.</BodyText>
      <Spacer />
      <InputElementWithButton
        placeholder="Enter member's email"
        value={email}
        disabled={isPending}
        onChangeText={setEmail}
        buttonLabel="Invite"
        errorText={emailError}
        onPress={() => {
          setEmailError(undefined);

          if (!isValidEmail(email)) {
            setEmailError('Valid email is required');
            return;
          }
          mutate();
        }}
      />
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
    borderColor: COLORS.BORDER.DARKEN,
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginBottom: 20
  }
});