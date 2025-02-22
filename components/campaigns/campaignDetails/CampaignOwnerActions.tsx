import { TCampaign } from '@definitions/campaign';
import { TDialogContent } from '@definitions/ui';

import { View } from 'react-native';

import { useState } from 'react';

import Button from '@components/common/forms/Button';
import Dialog from '@components/common/Dialog';
import InviteMembersModal from '@components/campaigns/InviteMembersModal';

export default function CampaignOwnerActions({
  campaign
}: {
  campaign: TCampaign
}) {
  const [dialogContent, setDialogContent] = useState<TDialogContent>(null);
  const [inviteMembersModalVisible, setInviteMembersModalVisible] = useState<boolean>(false);

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
      </View>

      <Dialog dialogContent={dialogContent} setDialogContent={setDialogContent} />
      <InviteMembersModal visible={inviteMembersModalVisible} setModalVisible={() => setInviteMembersModalVisible(false)} campaign={campaign} />
    </>
  )
}
