import { View, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { fetchInvites, acceptCampaignInvite, declineCampaignInvite } from '@api/campaignInvitesApi';
import { TCampaignInvite } from '@definitions/campaign';

import InviteNotificationItem from '@/components/campaigns/invites/InviteNotificationItem';
import SectionHeader from '@components/common/SectionHeader';

export default function InviteNotifications() {

  const [pendingInvites, setPendingInvites] = useState<TCampaignInvite[]>([]);
  const queryClient = useQueryClient()

  const { data: invites, isSuccess: isFetchInvitesSuccess, isError, isLoading } = useQuery({
    queryKey: ['invites'],
    queryFn: fetchInvites,
  });

  const { mutate: acceptInvite } = useMutation({
    mutationFn: (id: number) => acceptCampaignInvite(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invites'] });
      queryClient.invalidateQueries({ queryKey: ['activeCampaigns'] });
    }
  });
  const { mutate: declineInvite } = useMutation({
    mutationFn: (id: number) => declineCampaignInvite(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invites'] });
    }
  });

  useEffect(() => {
    if (isFetchInvitesSuccess) {
      setPendingInvites(invites);
    }
  }, [invites, isFetchInvitesSuccess]);

  if (isLoading) return null;
  if (isError) return null;

  return (
    <View style={{width: '100%', marginTop: 10}}>
      {pendingInvites.length > 0 && (
        <View style={{display: 'flex', flexDirection: 'column', width: '100%', flex: 1}}>
          <SectionHeader text="Pending campaign invites" />
          <FlatList
            data={pendingInvites}
            renderItem={({ item }) => <InviteNotificationItem invite={item} acceptInvite={acceptInvite} declineInvite={declineInvite} />}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      )}
    </View>
  );
}
