import { FlatList, View } from "react-native";
import { useLocalSearchParams, Redirect } from "expo-router";
import { useQuery } from "@tanstack/react-query";

import PageContainer from "@components/common/PageContainers";
import PendingScreen from "@components/common/PendingScreen";
import GameCard from "@components/campaigns/games/GameCard";
import NoResultsBox from "@components/common/NoResultsBox";

import { TCampaignGame } from "@definitions/campaign";
import { fetchCampaignGames } from "@api/gameApi";
import { useNotification } from "@context/NotificationContext";

export default function CampaignGamesPage() {
  const { showNotification } = useNotification();
  const { id: campaignId } = useLocalSearchParams<{ id: string }>();

  const { isPending, error, data: games } = useQuery<TCampaignGame[]>({
    queryKey: ['campaignGames', {id: campaignId}],
    queryFn: () => fetchCampaignGames(campaignId!),
  })

  if (isPending) return <PendingScreen />;

  if (error) {
    showNotification(error.message);
    return <Redirect href="/campaigns" />
  }

  if (!games) {
    return (
      <PageContainer>
        <NoResultsBox text={`No games recorded for this campaign`} />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <View style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
        <FlatList
          data={games}
          renderItem={({ item }) => <GameCard game={item} />}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>

    </PageContainer>
  );
}
