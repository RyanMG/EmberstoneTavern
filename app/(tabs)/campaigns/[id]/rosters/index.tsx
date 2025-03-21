import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import { FlatList, View } from 'react-native';

import PageContainer from '@components/common/PageContainers';
import PageLoading from '@components/common/PageLoading';
import BodyText from '@components/common/BodyText';
import RosterItemCard from '@components/rosters/RosterItemCard';

import { getAllCampaignRosters } from '@api/rosterApi';

export default function RostersPage() {

  const { id: campaignId }: {id: string} = useLocalSearchParams();

  const rostersQuery = useQuery({
    queryKey: ['campaignRosters', {campaignId}],
    queryFn: () => getAllCampaignRosters(campaignId)
  })

  return (
    <PageContainer>
      {rostersQuery.isPending && <PageLoading />}
      {rostersQuery.isError && <BodyText textSize="md">Error getting rosters</BodyText>}
      {rostersQuery.isSuccess &&
        <View style={{display: 'flex', flexDirection: 'column', gap: 10, width: '100%'}}>
          <FlatList
            data={rostersQuery.data}
            renderItem={({item}) => <RosterItemCard campaignId={campaignId!} roster={item} />}
            keyExtractor={item => item.id!}
          />
        </View>

      }
    </PageContainer>
  );
}
