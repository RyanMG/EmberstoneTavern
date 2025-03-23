import { View } from "react-native";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter, Redirect } from "expo-router";

import PageContainer from "@components/common/PageContainers";
import CampaignGameForm from "@/components/campaigns/games/CampaignGameForm";
import PendingScreen from "@components/common/PendingScreen";

import { fetchCampaign } from "@api/campaignApi";
import { updateGame, fetchGame } from "@api/gameApi";
import { useNotification } from "@context/NotificationContext";
import Campaign from "@classes/Campaign";
import { TCampaignGame, TNewCampaignGame } from "@definitions/campaign";

export default function EditGameDetails() {

  const { id: campaignId, gameId } = useLocalSearchParams<{ id: string, gameId: string }>();
  const { showNotification } = useNotification();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { isPending, error, data: campaign } = useQuery<Campaign>({
    queryKey: ['campaign', {id: campaignId}],
    queryFn: () => fetchCampaign(campaignId!),
  })

  const { isPending: gameIsPending, error: gameError, data: game } = useQuery<TCampaignGame>({
    queryKey: ['game', {id: campaignId, gameId}],
    queryFn: () => fetchGame(campaignId!, gameId!),
  })

  const editGameMutation = useMutation({
    mutationFn: (game: TCampaignGame) => updateGame(game),
    onSuccess: () => {
      showNotification('Game reported successfully');
      queryClient.invalidateQueries({ queryKey: ['campaignGames', {id: campaignId}] });
      router.push(`/campaigns/${campaignId}/games`);
    }
  });

  const saveGame = (game: TNewCampaignGame) => {
    editGameMutation.mutate({
      ...game,
      id: Number(gameId!)
    });
  };

  if (isPending || gameIsPending) return <PendingScreen />;

  if (error || gameError) {
    showNotification(error?.message || gameError?.message || 'Game not found');
    return <Redirect href={`/campaigns/${campaignId}/games/${gameId}`} />;
  }

  return (
    <PageContainer>
      <View style={{ width: '100%' }}>
        <CampaignGameForm
          campaign={campaign}
          game={game}
          saveGame={saveGame}
          savePending={editGameMutation.isPending}
          buttonTitle="Update Game"
        />
      </View>
    </PageContainer>
  );
}
