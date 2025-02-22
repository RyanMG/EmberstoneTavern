import Button from '@components/common/forms/Button';
import ModalWrapper from '@components/common/ModalWrapper';
import ModalHeader from '@components/common/ModalHeader';
import Spacer from '@components/common/Spacer';
import InputElement from '@components/common/forms/InputElement';
import { TCampaign } from '@definitions/campaign';

import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import {
  useMutation
} from '@tanstack/react-query';

import { joinCampaign } from '@api/campaignApi';
import { useNotification } from '@context/NotificationContext';
import FormErrorText from '../common/text/FormErrorText';

export default function JoinCampaignModal({
  visible,
  setModalVisible
}: {
  visible: boolean
  setModalVisible: (visible: boolean) => void
}) {
  const [campaignCode, setCampaignCode] = useState<TCampaign['campaignCode']>('');
  const [joinError, setJoinError] = useState<string | null>(null);
  const { showNotification } = useNotification();
  const router = useRouter();

  const {
    isPending,
    isError,
    isSuccess,
    data: addUserResponse,
    mutate
  } = useMutation({
    mutationFn: () => {
      return joinCampaign(campaignCode);
    }
  })

  useEffect(() => {
    if (isError) {
      setJoinError("Error joining campaign");
    }
  }, [isError])

  useEffect(() => {
    if (isSuccess) {
      if (addUserResponse.success) {
        setModalVisible(false);

        if (addUserResponse.message === "User is already in campaign") {
          showNotification("You are already in this campaign.");
        } else {
          showNotification("You are now part of the adventure!");
        }

        router.push(`/campaigns/${addUserResponse.data}`);
        return;
      }
      setJoinError(addUserResponse.message);
    }
  }, [isSuccess, addUserResponse])

  return (
    <ModalWrapper visible={visible} setModalVisible={setModalVisible}>
      <View style={{display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between', width: '100%'}}>
        <View>
          <ModalHeader text="Join A Campaign" />
          <Spacer size="lg" />

          <InputElement
            label="Enter A Campaign Code"
            value={campaignCode}
            onChangeText={text => setCampaignCode(text)}
          />
          <Button
            title={isPending ? "Joining..." : "Join Campaign"}
            disabled={isPending}
            onPress={() => {
              mutate();
            }}
          />
          {joinError && <FormErrorText errorText={joinError}/>}

        </View>
      </View>

      <Button
        title="Close"
        disabled={isPending}
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