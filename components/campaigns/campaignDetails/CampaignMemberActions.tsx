import { View } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useQueryClient } from '@tanstack/react-query';

import Campaign from '@classes/Campaign';
import Person from '@classes/Person';
import { TDialogContent } from '@definitions/ui';

import { useAuth } from '@context/AuthContext';
import { useNotification } from '@context/NotificationContext';

import { removeUserFromCampaign } from '@api/campaignApi';

import Button from '@components/common/forms/Button';
import Dialog from '@components/common/Dialog';
import ReportGameModal from '@components/campaigns/games/ReportGameModal';

export default function CampaignMemberActions({
  campaign
}: {
  campaign: Campaign
}) {
  const { authState } = useAuth();
  const { showNotification } = useNotification();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [dialogContent, setDialogContent] = useState<TDialogContent>(null);
  const [reportGameModalVisible, setReportGameModalVisible] = useState(false);

  const member: Person | undefined = campaign.findMemberById(authState?.activeUser?.getId()!);

  if (!member) return null;

  return (
    <>
      <View style={{display: 'flex', flexDirection: 'row', gap: 10, width: '100%'}}>
        <View style={{width: '48%'}}>
          {member.hasRoster() ? (
            <Button
              title="Report Game"
              onPress={() => setReportGameModalVisible(true)}
            />
          ): (
            <Button
              title="Create An Army"
              onPress={() => {
                router.push(`/campaigns/${campaign.id}/rosters/new`);
              }}
            />
          )}
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
      <ReportGameModal visible={reportGameModalVisible} setModalVisible={setReportGameModalVisible} campaign={campaign} />
    </>
  )
}
