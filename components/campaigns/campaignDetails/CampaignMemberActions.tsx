import { TCampaign } from '@definitions/campaign';
import { TDialogContent } from '@definitions/ui';
import { useAuth } from '@context/AuthContext';
import { removeUserFromCampaign } from '@api/campaignApi';

import { View } from 'react-native';

import { useState } from 'react';
import { useNotification } from '@context/NotificationContext';
import { useRouter } from 'expo-router';
import { useQueryClient } from '@tanstack/react-query';

import Button from '@components/common/forms/Button';
import Dialog from '@components/common/Dialog';

export default function CampaignMemberActions({
  campaign
}: {
  campaign: TCampaign
}) {
  const { authState } = useAuth();
  const [dialogContent, setDialogContent] = useState<TDialogContent>(null);
  const { showNotification } = useNotification();
  const router = useRouter();
  const queryClient = useQueryClient();

  return (
    <>
      <View style={{display: 'flex', flexDirection: 'row', gap: 10, width: '100%'}}>
        <View style={{width: '48%'}}>
          <Button
            title="Report Game"
            onPress={() => setDialogContent({
              title: 'Report Game',
              body: `Not done yet.`,
              actionLabel: 'Report',
              action: () => console.log('Report')
            })}
          />
        </View>
        <View style={{width: '48%'}}>
          <Button
            title="Leave Campaign"
            theme="destroy"
            onPress={() => setDialogContent({
              title: 'Leave Campaign',
              body: `Are you sure you want to leave the campaign "${campaign.title}"? This will wipe all campaign progress.`,
              actionLabel: 'Yes, Leave',
              action: async () => {
                const resp = await removeUserFromCampaign(campaign.id, authState?.activeUser?.id!);
                if (resp.success) {
                  showNotification('You have left the campaign.');
                  queryClient.invalidateQueries({ queryKey: ['activeCampaigns'] });
                  router.push('/');
                  setDialogContent(null);
                  return;
                }
                showNotification('There was an error removing you from the campaign.');
                setDialogContent(null);
              }
            })}
          />
        </View>
      </View>

      <Dialog dialogContent={dialogContent} setDialogContent={setDialogContent} />
    </>
  )
}
