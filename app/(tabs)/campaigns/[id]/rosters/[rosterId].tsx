import { Redirect, useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';

import { getRosterById } from '@api/rosterApi';
import type { TRoster } from '@definitions/roster';
import { useNotification } from '@context/NotificationContext';

import PageContainer from '@/components/common/PageContainers';
import BodyText from '@/components/common/BodyText';
import PageLoading from '@/components/common/PageLoading';
import Spacer from '@/components/common/Spacer';

export default function CreateNewRosterPage() {
  let {
    id,
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
    return <Redirect href={`/campaigns/${id}`} />
  }

  if (data === null) {
    showNotification('Roster not found');
    return <Redirect href={`/campaigns/${id}`} />
  }

  return (
    <PageContainer>
      <BodyText textSize="xl" bold={true}>{data.name}</BodyText>
      <Spacer size="sm" />
      <BodyText textSize="sm" italic={true}>{data.faction?.name}</BodyText>
    </PageContainer>
  );
}
