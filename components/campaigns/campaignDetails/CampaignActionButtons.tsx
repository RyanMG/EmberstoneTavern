import { TCampaign } from '@definitions/campaign';
import { useAuth } from '@context/AuthContext';
import { removeUserFromCampaign } from '@api/campaignApi';

import { View } from 'react-native';
import { Button as PaperButton, Dialog, Portal, Text } from 'react-native-paper';
import { useState } from 'react';
import { useNotification } from '@context/NotificationContext';
import { useRouter } from 'expo-router';

import Button from '@components/common/forms/Button';
import Colors from '@constants/Colors';

export default function CampaignActionButtons({
  campaign
}: {
  campaign: TCampaign
}) {
  const { authState } = useAuth();
  const [dialogContent, setDialogContent] = useState<{
    title: string
    body: string
    actionLabel: string
    action?: () => void
  } | null>(null);
  const { showNotification } = useNotification();
  const router = useRouter();

  return (
    <>
      <View style={{display: 'flex', flexDirection: 'row', gap: 10, width: '100%'}}>
        {authState?.activeUser?.id === campaign.owner.id && (
          <>
            <View style={{width: '48%'}}>
              <Button
                title="Edit"
                onPress={() => setDialogContent({
                  title: 'Edit Campaign',
                  body: `Not done yet.`,
                  actionLabel: 'Edit',
                  action: () => console.log('Edit')
                })}
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
                  action: () => console.log('Delete')
                })}
              />
            </View>
          </>
        )}

        {authState?.activeUser?.id !== campaign.owner.id && (
          <>
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
          </>
        )}
      </View>

      <Portal>
        <Dialog visible={dialogContent !== null} onDismiss={() => setDialogContent(null)} style={{backgroundColor: Colors.BACKGROUND.GREEN, borderWidth: 1, borderRadius: 5, borderColor: Colors.BORDER.BASE}}>
          <Dialog.Title style={{color: Colors.TEXT.BASE, fontWeight: 'bold'}}>{dialogContent?.title}</Dialog.Title>
          <Dialog.Content>
            <Text style={{color: Colors.TEXT.BASE, fontSize: 16, lineHeight: 21}}>{dialogContent?.body}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <PaperButton mode="outlined" buttonColor={Colors.BACKGROUND.BROWN} textColor={Colors.TEXT.BASE} onPress={() => dialogContent?.action?.()}>{dialogContent?.actionLabel}</PaperButton>
            <PaperButton mode="outlined" buttonColor={Colors.BACKGROUND.GREEN} textColor={Colors.TEXT.BASE} onPress={() => setDialogContent(null)}>Cancel</PaperButton>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  )
}
