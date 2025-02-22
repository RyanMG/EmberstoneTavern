import { View, Text, StyleSheet } from 'react-native';
import InputElement from '@components/common/forms/InputElement';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import {
  useMutation
} from '@tanstack/react-query';

import {
  TCampaign
} from '@definitions/campaign';

import Button from '@components/common/forms/Button';
import ModalWrapper from '@components/common/ModalWrapper';
import Spacer from '@components/common/Spacer';
import FormErrorText from '@components/common/text/FormErrorText';
import Colors from '@/lib/constants/Colors';

import { createCampaign } from '@api/campaignApi';
import { useNotification } from '@context/NotificationContext';

export default function CreateNewCampaignModal({
  visible,
  setModalVisible
}: {
  visible: boolean
  setModalVisible: (visible: boolean) => void
}) {
  const [title, setTitle] = useState<TCampaign['title']>('');
  const [description, setDescription] = useState<TCampaign['description']>('');
  const [iconLink, setIconLink] = useState<TCampaign['iconLink']>('');

  const router = useRouter();
  const { showNotification } = useNotification();

  const {
    isPending,
    isError,
    isSuccess,
    data,
    mutate
  } = useMutation({
    mutationFn: (campaign: TCampaign) => {
      return createCampaign(campaign);
    },
  })

  useEffect(() => {
    if (isSuccess) {
      setModalVisible(!visible);
      showNotification('Campaign created.');
      router.push(`/campaigns/${data.id}`);
    }
  }, [isSuccess])

  return (
    <ModalWrapper visible={visible} setModalVisible={setModalVisible}>
      <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', flex: 1, width: '100%'}}>
        <View style={{width: '100%', flex: 1}}>
          <Text style={styles.modalHeader}>Create New Campaign</Text>
          <Spacer />
          <InputElement
            label="Campaign Title"
            value={title}
            onChangeText={text => setTitle(text)}
          />
          <Spacer />
          <InputElement
            label="Campaign Description"
            value={description}
            onChangeText={text => setDescription(text)}
          />
          <Spacer />
          <InputElement
            label="Campaign Icon Link"
            value={iconLink}
            onChangeText={text => setIconLink(text)}
          />
          <Spacer />
          <Button
            title={isPending ? "Saving..." : "Save"}
            theme="primary"
            disabled={isPending || (title === '' || description === '')}
            onPress={() => {

              mutate({ title, description, iconLink } as TCampaign);
            }}
          />
          {isError && <FormErrorText errorText="Error saving campaign." />}
        </View>

        <View style={{display: 'flex', flexDirection: 'row', gap: 10, justifyContent: 'flex-end', alignItems: 'center', width: '100%'}}>
          <Button
            title="Close"
            theme="secondary"
            disabled={isPending}
            onPress={() => {
              setModalVisible(!visible);
            }}
          />
        </View>

      </View>
    </ModalWrapper>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
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