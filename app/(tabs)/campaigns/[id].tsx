import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { View, StyleSheet } from "react-native";

import PageContainer from "@components/common/PageContainers";
import PageTitle from "@components/common/PageTitle";
import PageLoading from "@components/common/PageLoading";
import CampaignIcon from "@components/campaigns/CampaignIcon";
import BodyText from "@components/common/BodyText";

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

  console.log('data', data)
  return (
    <PageContainer>
      <PageTitle
        text="Campaign Details"
        back="/campaigns"
      />
      <View style={styles.container}>
        <View style={styles.mainDetails}>
          <CampaignIcon iconLink={data.iconLink} />
          <View style={{display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', padding: 15}}>
            <BodyText textSize="xl" bold={true}>{data.title}</BodyText>
            <BodyText textSize="md" italic={true}>{data.description}</BodyText>
          </View>
        </View>
      </View>

    </PageContainer>
  );
}

const styles=StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    gap: 2,
    width: '100%'
  },
  mainDetails: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    width: '100%'
  }
});
