import { View, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';

import ModalWrapper from '@components/common/ModalWrapper';
import ModalHeader from '@components/common/ModalHeader';
import Button from '@components/common/forms/Button';
import Colors from '@/lib/constants/Colors';
import BodyText from '@components/common/BodyText';
import InputElementWithButton from '@components/common/forms/InputElementWithButton';
import Spacer from '@components/common/Spacer';

import { inviteMemberByEmail } from '@api/campaignInvitesApi';
import { TCampaign } from '@definitions/campaign';
import { isValidEmail } from '@utils/formUtils';
import { useNotification } from '@context/NotificationContext';

export default function InviteMembersModal({
  visible,
  setModalVisible,
  campaign
}: {
  visible: boolean
  setModalVisible: (visible: boolean) => void
  campaign: TCampaign
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
    <ModalWrapper visible={visible} setModalVisible={setModalVisible}>
      <View style={{display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between', width: '100%'}}>
        <View>
          <ModalHeader text="Invite Members" />

          <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <View style={styles.inviteCodeBlock}>
              <BodyText textSize="sm">Campaign invite code:</BodyText>
              <BodyText textSize="lg" bold={true}>{campaign.campaignCode}</BodyText>
            </View>
          </View>
          <BodyText textSize="md" center={true} italic={true}>Invite people to your campaign using their email address.</BodyText>
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