import { Redirect, useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { View } from 'react-native';

import { getRosterById } from '@api/rosterApi';
import type { TRoster } from '@definitions/roster';
import { useNotification } from '@context/NotificationContext';

import PageContainer from '@/components/common/PageContainers';
import RegimentManagment from '@/components/rosters/RegimentManagment';
import BodyText from '@/components/common/BodyText';
import PageLoading from '@/components/common/PageLoading';
import Spacer from '@/components/common/Spacer';
import Divider from '@/components/common/Divider';
import CreateGeneral from '@/components/rosters/CreateGeneral';
import UserRosterActions from '@/components/rosters/UserRosterActions';

export default function CreateNewRosterPage() {
  let {
    id: campaignId,
    rosterId
  }: {
    id: string;
    rosterId: string
  } = useLocalSearchParams();

  const { isPending, error, data } = useQuery<TRoster>({
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

        {!data.general && (
          <CreateGeneral regimentId={data.regiments[0].id} />
        )}

        {data.general && (
          <RegimentManagment regiments={data.regiments} />
        )}
      </View>

      <UserRosterActions rosterId={rosterId!} campaignId={campaignId} />
    </PageContainer>
  );
}
