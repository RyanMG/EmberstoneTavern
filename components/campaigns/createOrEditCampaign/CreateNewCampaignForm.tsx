import { View } from 'react-native';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import {
  useMutation
} from '@tanstack/react-query';

import {
  TCampaign,
  TCampaignSetting
} from '@definitions/campaign';

import Button from '@components/common/forms/Button';
import InputElement from '@components/common/forms/InputElement';
import SelectElement from '@components/common/forms/SelectElement';
import Spacer from '@components/common/Spacer';
import FormErrorText from '@components/common/text/FormErrorText';

import { createCampaign } from '@api/campaignApi';
import { useNotification } from '@context/NotificationContext';
import { createFormSelectOptions } from '@utils/formUtils';

export default function CreateNewCampaignModal({
  campaignSettings
}: {
  campaignSettings: TCampaignSetting[]
}) {

  const [title, setTitle] = useState<TCampaign['title']>('');
  const [description, setDescription] = useState<TCampaign['description']>('');
  const [settingId, setSettingId] = useState<TCampaignSetting['id']>(campaignSettings[1].id);
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
      showNotification('Campaign created.');
      router.push(`/campaigns/${data.id}`);
    }
  }, [isSuccess])

  return (
    <View style={{display: 'flex', flexDirection: 'column', flex: 1, width: '100%', paddingLeft: 20, paddingRight: 20}}>
      <InputElement
        label="Campaign Title"
        value={title}
        onChangeText={text => setTitle(text)}
      />
      <Spacer />
      <InputElement
        label="Campaign Description"
        value={description}
        isMultiline={true}
        onChangeText={text => setDescription(text)}
      />
      <Spacer />
      <SelectElement
        label="Campaign Setting"
        onSelectValue={value => setSettingId(value)}
        value={settingId}
        options={createFormSelectOptions(campaignSettings, {
          labelKey: 'name',
          valueKey: 'id',
        })}
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

          mutate({ title, description, campaignSettingId: settingId, iconLink } as TCampaign);
        }}
      />
      {isError && <FormErrorText errorText="Error saving campaign." />}
    </View>
  );
}
