import PageContainer from "@/components/common/PageContainers";
import EditCampaignForm from "@/components/campaigns/createOrEditCampaign/EditCampaignForm";
import PageLoading from "@components/common/PageLoading";
import { fetchCampaign, fetchCampaignSettings } from "@api/campaignApi";
import { useNotification } from "@context/NotificationContext";
import { Redirect, useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";

export default function CampaignPage() {
  let { id }: { id: string } = useLocalSearchParams();
  const campaignDataQuery = useQuery({
    queryKey: ['campaign', { id }],
    queryFn: () => fetchCampaign(id!),
  })

  const campaignSettingsQuery = useQuery({
    queryKey: ['campaignSettings'],
    queryFn: () => fetchCampaignSettings(),
  })

  const { showNotification } = useNotification();

  if (campaignDataQuery.isPending || campaignSettingsQuery.isPending) return <PageLoading />

  if (campaignDataQuery.isError || campaignSettingsQuery.isError) {
    showNotification("Error fetching data for editing a campaign");
    return <Redirect href={`/campaigns/${id}`} />
  }

  return (
    <PageContainer>
      <EditCampaignForm campaignData={campaignDataQuery.data!} campaignSettings={campaignSettingsQuery.data!} />
    </PageContainer>

  )
}
