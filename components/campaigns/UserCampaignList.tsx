import { useQuery } from '@tanstack/react-query';
import { View, FlatList } from 'react-native';
import { useState } from 'react';

import PageLoading from '@components/AppLoadingScreen';
import { useNotification } from '@/lib/context/NotificationContext';
import CampaignCard from '@components/campaigns/CampaignCard';
import CompletedCampaignsList from '@components/campaigns/CompletedCampaignsList';
import SectionHeader from '@components/common/SectionHeader';
import Spacer from '@components/common/Spacer';
import NoResultsBox from '@components/common/NoResultsBox';
import Button from '@components/common/forms/Button';

import { TCampaign } from '@definitions/campaign';
import { fetchActiveUserCampaigns } from '@/lib/api/campaignApi';

export default function UserCampaignList() {
  const [showCompletedCampaigns, setShowCompletedCampaigns] = useState<boolean>(false)
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
    <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', width: '100%' }}>
      <SectionHeader text="Active campaigns" />

      {data.length === 0 && (
        <NoResultsBox text="No active campaigns" />
      )}
      {data.length > 0 && (
        <FlatList
          data={data}
          renderItem={({ item }) => <CampaignCard campaign={item} />}
          keyExtractor={item => item.id}
        />
      )}

      <Spacer />
      <SectionHeader text="Completed campaigns" headerButtonLabel={showCompletedCampaigns ? "Hide completed" : "Show completed"} headerButtonAction={() => setShowCompletedCampaigns(!showCompletedCampaigns)} />

      {showCompletedCampaigns && (
        <>
          <CompletedCampaignsList />
        </>
      )}

    </View>
  );
}
