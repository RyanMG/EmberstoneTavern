import Campaign from '@classes/Campaign';
import { TDialogContent } from '@definitions/ui';
import { deleteCampaign } from '@api/campaignApi';

import { View } from 'react-native';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useQueryClient } from '@tanstack/react-query';
import Button from '@components/common/forms/Button';
import Dialog from '@components/common/Dialog';
import InviteMembersModal from '@components/campaigns/InviteMembersModal';

export default function CampaignOwnerActions({
  campaign
}: {
  campaign: Campaign
}) {
  const router = useRouter();
  const [dialogContent, setDialogContent] = useState<TDialogContent>(null);
  const [inviteMembersModalVisible, setInviteMembersModalVisible] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => deleteCampaign(campaign.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activeCampaigns'] });
      queryClient.invalidateQueries({ queryKey: ['completedCampaigns'] });
      router.replace('/(tabs)/campaigns');
    }
  })

  return (
    <>
      <View style={{marginBottom: 10, width: '100%'}}>
        <Button
          title="Invite Members"
          onPress={() => setInviteMembersModalVisible(true)}
        />
      </View>

      <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between',  width: '100%'}}>
        <View style={{width: '48%'}}>
          <Button
            title="Edit"
            onPress={() => router.push(`/campaigns/${campaign.id}/edit`)}
          />
        </View>
        <View style={{width: '48%'}}>
          <Button
            title="Delete"
            theme="destroy"
            onPress={() => setDialogContent({
              title: 'Delete Campaign',
              body: `Are you sure you want to delete the campaign "${campaign.title}"? This action cannot be undone!`,
              actionLabel: 'Yes, Delete',
              action: () => mutate()
            })}
          />
        </View>
      </View>

      <Dialog dialogContent={dialogContent} setDialogContent={setDialogContent} />
      <InviteMembersModal visible={inviteMembersModalVisible} setModalVisible={() => setInviteMembersModalVisible(false)} campaign={campaign} />
    </>
  )
}
