import { FlatList } from 'react-native';
import { TCampaign } from '@definitions/campaign';

import NoResultsBox from '@components/common/NoResultsBox';
import CampaignCard from './CampaignCard';
import PageLoading from '@components/common/PageLoading';

import { useQuery } from '@tanstack/react-query';
import { getActiveUserCompletedCampaigns } from '@api/campaignApi';
import { useNotification } from '@context/NotificationContext';

export default function CompletedCampaignsList() {
  const { showNotification } = useNotification();
  const { isPending, error, data } = useQuery<TCampaign[]>({
    queryKey: ['completedCampaigns'],
    queryFn: getActiveUserCompletedCampaigns,
  })

  if (isPending) return <PageLoading />
  if (error) {
    showNotification(error.message);
    return null;
  }

  return (
    <>
      {data.length === 0 && (
        <NoResultsBox text="No completed campaigns" />
      )}
      {data.length > 0 && (
        <FlatList
          data={data}
          renderItem={({ item }) => <CampaignCard campaign={item} />}
          keyExtractor={item => item.id}
        />
      )}
    </>
  );
}