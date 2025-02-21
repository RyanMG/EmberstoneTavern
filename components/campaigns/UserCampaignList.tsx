import { useQuery } from '@tanstack/react-query';
import { View, FlatList } from 'react-native';

import PageLoading from '@components/AppLoadingScreen';
import { useNotification } from '@/lib/context/NotificationContext';
import CampaignCard from '@components/campaigns/CampaignCard';
import SectionHeader from '@components/common/SectionHeader';

import { TCampaign } from '@definitions/campaign';
import { fetchActiveUserCampaigns } from '@/lib/api/campaignApi';

export default function UserCampaignList() {
  const { isPending, error, data } = useQuery<TCampaign[]>({
    queryKey: ['campaigns'],
    queryFn: fetchActiveUserCampaigns,
  })
  const { showNotification } = useNotification();

  if (isPending) return <PageLoading />
  if (error) {
    showNotification(error.message);
    return null;
  }

  return (
    <View style={{ display: 'flex', flexDirection: 'column', flex: 1, width: '100%' }}>
      <SectionHeader text="Active campaigns" />
      <FlatList
        data={data}
        renderItem={({ item }) => <CampaignCard campaign={item} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
}
