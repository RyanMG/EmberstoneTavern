import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams, useRouter } from 'expo-router';

import PageContainer from '@/components/common/PageContainers';
import PageLoading from '@/components/common/PageLoading';
import EditRosterForm from '@/components/rosters/EditRosterForm';

import { useNotification } from '@context/NotificationContext';
import { getRosterById } from '@api/rosterApi';
import { fetchGrandAlliances } from '@api/sigmarDataApi';

export default function EditRoster() {
  const { id, rosterId }: {id: string, rosterId: string} = useLocalSearchParams();
  const router = useRouter();
  const { showNotification } = useNotification();

  const rosterQuery = useQuery({
    queryKey: ['roster', rosterId],
    queryFn: () => getRosterById(rosterId),
  })
  const grandAllianceQuery = useQuery({
    queryKey: ['grandAlliance'],
    queryFn: () => fetchGrandAlliances(),
  })

  if (rosterQuery.isPending || grandAllianceQuery.isPending) return <PageContainer><PageLoading /></PageContainer>

  if (rosterQuery.isError || grandAllianceQuery.isError) {
    router.replace(`/campaigns/${id}/rosters/${rosterId}`);
    showNotification("Error fetching data edit roster");
    return null;
  }

  return (
    <PageContainer>
      <EditRosterForm campaignId={id} rosterId={rosterId} roster={rosterQuery.data} grandAlliances={grandAllianceQuery.data} />
    </PageContainer>
  );
}
