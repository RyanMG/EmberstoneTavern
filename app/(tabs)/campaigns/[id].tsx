import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { View, StyleSheet } from "react-native";

import PageContainer from "@components/common/PageContainers";
import PageTitle from "@components/common/PageTitle";
import PageLoading from "@components/common/PageLoading";
import CampaignDetailsMain from "@components/campaigns/campaignDetails/CampaignDetailsMain";
import CampaignMembers from "@components/campaigns/campaignDetails/CampaignMembers";
import CampaignActionButtons from "@/components/campaigns/campaignDetails/CampaignDetailsActionButtons";
import Spacer from "@components/common/Spacer";

import { TCampaign } from "@definitions/campaign";
import { fetchCampaign } from "@api/campaignApi";
import { useNotification } from "@context/NotificationContext";

export default function CampaignPage() {
  let { id }: { id: string } = useLocalSearchParams();

  const { isPending, error, data } = useQuery<TCampaign>({
    queryKey: ['campaign'],
    queryFn: () => fetchCampaign(id!),
  })
  const { showNotification } = useNotification();

  if (isPending) return <PageLoading />
  if (error) {
    showNotification(error.message);
    return null;
  }

  return (
    <PageContainer>
      <PageTitle
        text="Campaign Details"
        back="/campaigns"
      />
      <View style={styles.container}>
        <View>
          <CampaignDetailsMain campaign={data} />
          <Spacer />
          <CampaignMembers campaign={data} />
        </View>

        <CampaignActionButtons campaign={data} />
      </View>

    </PageContainer>
  );
}

const styles=StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
    gap: 2,
    width: '100%'
  }
});
