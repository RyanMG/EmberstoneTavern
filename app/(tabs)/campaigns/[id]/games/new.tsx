import { View } from "react-native";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter, Redirect } from "expo-router";

import PageLoading from "@components/common/PageLoading";
import PageContainer from "@components/common/PageContainers";
import CampaignGameForm from "@/components/campaigns/games/CampaignGameForm";

import { reportGame } from "@api/gameApi";
import { fetchCampaign } from "@api/campaignApi";
import Campaign from "@classes/Campaign";
import { TNewCampaignGame } from "@definitions/campaign";

import { useNotification } from "@context/NotificationContext";

export default function NewGamePage() {

  const { id: campaignId } = useLocalSearchParams<{ id: string }>();
  const { showNotification } = useNotification();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { isPending, error, data: campaign } = useQuery<Campaign>({
    queryKey: ['campaign', {id: campaignId}],
    queryFn: () => fetchCampaign(campaignId!),
  })

  const reportGameMutation = useMutation({
    mutationFn: (newGame: TNewCampaignGame) => reportGame(newGame),
    onSuccess: () => {
      showNotification('Game reported successfully');
      queryClient.invalidateQueries({ queryKey: ['campaignGames', {id: campaignId}] });
      router.push(`/campaigns/${campaignId}/games`);
    }
  });

  const saveGame = (game: TNewCampaignGame) => {
    reportGameMutation.mutate(game);
  }

  if (isPending) return <PageLoading />
  if (error) {
    showNotification(error.message);
    return <Redirect href="/campaigns" />
  }

  if (campaign === null) {
    showNotification('Campaign not found');
    return <Redirect href="/campaigns" />
  }

  return (
    <PageContainer>
      <View style={{ width: '100%' }}>
        <CampaignGameForm
          campaign={campaign}
          saveGame={saveGame}
          savePending={reportGameMutation.isPending}
          buttonTitle="Report Game"
        />
      </View>
    </PageContainer>
  );
}
