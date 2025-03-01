import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { View, StyleSheet } from "react-native";

import PageContainer from "@components/common/PageContainers";
import PageLoading from "@components/common/PageLoading";
import CampaignDetailsMain from "@components/campaigns/campaignDetails/CampaignDetailsMain";
import CampaignMembers from "@components/campaigns/campaignDetails/CampaignMembers";
import CampaignMemberActions from "@components/campaigns/campaignDetails/CampaignMemberActions";
import CampaignOwnerActions from "@components/campaigns/campaignDetails/CampaignOwnerActions";
import Spacer from "@components/common/Spacer";

import Campaign from "@classes/Campaign";
import { fetchCampaign } from "@api/campaignApi";
import { useNotification } from "@context/NotificationContext";
import { useAuth } from "@context/AuthContext";
import { Redirect } from "expo-router";

export default function CampaignPage() {
  let { id }: { id: string } = useLocalSearchParams();
  const { authState } = useAuth();

  const { isPending, error, data } = useQuery<Campaign>({
    queryKey: ['campaign', {id: id}],
    queryFn: () => fetchCampaign(id!),
  })
  const { showNotification } = useNotification();

  if (isPending) return <PageLoading />
  if (error) {
    showNotification(error.message);
    return <Redirect href="/campaigns" />
  }

  if (data === null) {
    showNotification('Campaign not found');
    return <Redirect href="/campaigns" />
  }

  return (
    <PageContainer>
      <View style={styles.container}>
        <View style={{flex: 1}}>
          <CampaignDetailsMain campaign={data} />
          <Spacer />
          <CampaignMembers campaign={data} />
        </View>

        {authState?.activeUser?.isSameAs(data.owner.id) && (
          <CampaignOwnerActions campaign={data} />
        )}
        {authState?.activeUser?.isNotTheSameAs(data.owner.id) && (
          <CampaignMemberActions campaign={data} />
        )}

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
