import { Redirect, useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { View } from 'react-native';

import { getRosterById } from '@api/rosterApi';
import Roster from "@classes/Roster"
import { useNotification } from '@context/NotificationContext';
import { useAuth } from '@context/AuthContext';

import PageContainer from '@/components/common/PageContainers';

import BodyText from '@/components/common/BodyText';
import PageLoading from '@/components/common/PageLoading';
import Spacer from '@/components/common/Spacer';
import Divider from '@/components/common/Divider';

import UserRosterActions from '@/components/rosters/managment/UserRosterActions';
import RosterOwnerManager from '@/components/rosters/managment/RosterOwnerManager';
import RosterViewOnly from '@/components/rosters/RosterViewOnly';

export default function RosterPage() {
  let {
    id: campaignId,
    rosterId
  }: {
    id: string;
    rosterId: string
  } = useLocalSearchParams();
  const { authState } = useAuth();

  const { isPending, error, data } = useQuery<Roster>({
    queryKey: ['campaignRoster', {id: rosterId}],
    queryFn: () => getRosterById(rosterId!),
  })
  const { showNotification } = useNotification();

  if (isPending) return <PageLoading />
  if (error) {
    showNotification(error.message);
    return <Redirect href={`/campaigns/${campaignId}`} />
  }

  if (data === null) {
    showNotification('Roster not found');
    return <Redirect href={`/campaigns/${campaignId}`} />
  }

  return (
    <PageContainer>
      <View style={{display: 'flex', flexDirection: 'column', flex: 1, width: '100%', alignItems: 'center'}}>
        <BodyText textSize="xl" bold={true}>{data.name}</BodyText>
        <Spacer size="sm" />
        <BodyText textSize="sm" italic={true}>{data.faction?.name}</BodyText>
        <Divider />

        <View style={{display: 'flex', flexDirection: 'column', flex: 1, width: '100%', alignItems: 'center', overflow: 'scroll'}}>
          {authState.activeUser?.isSameAs(data.playerId) && (
            <RosterOwnerManager rosterData={data} />
          )}
          {authState.activeUser?.isNotTheSameAs(data.playerId) && (
            <RosterViewOnly rosterData={data} />
          )}
        </View>

      </View>

      {authState.activeUser?.getId() === data.playerId && (
        <UserRosterActions rosterId={rosterId!} campaignId={campaignId} />
      )}
    </PageContainer>
  );
}
