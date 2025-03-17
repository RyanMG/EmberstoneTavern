import { View } from "react-native";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, Redirect } from "expo-router";

import PageLoading from "@components/common/PageLoading";
import PageContainer from "@components/common/PageContainers";
import CampaignGameForm from "@components/campaigns/games/campaignGameForm";

import { reportGame } from "@api/gameApi";
import { fetchCampaign } from "@api/campaignApi";
import Campaign from "@classes/Campaign";
import { TNewCampaignGame } from "@definitions/campaign";

import { useNotification } from "@context/NotificationContext";

export default function NewGamePage() {

  const { id } = useLocalSearchParams<{ id: string }>();
  const { showNotification } = useNotification();

  const { isPending, error, data: campaign } = useQuery<Campaign>({
    queryKey: ['campaign', {id: id}],
    queryFn: () => fetchCampaign(id!),
  })

  const reportGameMutation = useMutation({
    mutationFn: (newGame: TNewCampaignGame) => reportGame(newGame),
    onSuccess: () => {
      showNotification('Game reported successfully');
      // queryClient.invalidateQueries({ queryKey: ['campaign', {id: id}] });
      // router.push(`/campaigns/${campaign.id}`);
    }
  });

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
        <CampaignGameForm campaign={campaign} reportGameMutation={reportGameMutation} />
      </View>
    </PageContainer>
  );
}
