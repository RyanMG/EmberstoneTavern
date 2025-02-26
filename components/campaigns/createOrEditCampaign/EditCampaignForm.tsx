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

import { updateCampaign } from '@api/campaignApi';
import { useNotification } from '@context/NotificationContext';
import { createFormSelectOptions } from '@utils/formUtils';

export default function EditCampaignForm({
  campaignData,
  campaignSettings
}: {
  campaignData: TCampaign;
  campaignSettings: TCampaignSetting[]
}) {

  const [title, setTitle] = useState<TCampaign['title']>(campaignData.title);
  const [description, setDescription] = useState<TCampaign['description']>(campaignData.description);
  const [iconLink, setIconLink] = useState<TCampaign['iconLink']>(campaignData.iconLink);

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
      return updateCampaign(campaign);
    },
  })

  useEffect(() => {
    if (isSuccess) {
      showNotification('Campaign updated.');
      router.push(`/campaigns/${data.id}`);
    }
  }, [isSuccess])

  return (
    <View style={{display: 'flex', flexDirection: 'column', width: '100%', paddingLeft: 20, paddingRight: 20}}>
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
        disabled={true}
        placeholder="Setting cannot be changed once campaign is created"
        onSelectValue={value => {}}
        value={{}}
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
          mutate({
            id: campaignData.id,
            title,
            description,
            iconLink
          } as TCampaign);
        }}
      />
      {isError && <FormErrorText errorText="Error saving campaign." />}
    </View>
  );
}
