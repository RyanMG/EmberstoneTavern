import PageContainer from "@/components/common/PageContainers";
import PageTitle from "@/components/common/PageTitle";
import PageLoading from '@components/common/PageLoading';
import CreateNewCampaignForm from '@/components/campaigns/createNew/CreateNewCampaignForm';

import { fetchCampaignSettings } from '@api/campaignApi';
import { useQuery } from '@tanstack/react-query';
import { useNotification } from '@context/NotificationContext';


export default function CreateNewCampaign() {

  const { showNotification } = useNotification();

  const {isPending, isError, isSuccess, data} = useQuery({
    queryKey: ['fetchCampaignSettings'],
    queryFn: () => {
      return fetchCampaignSettings();
    }
  });

  if (isError) {
    showNotification("Error fetching data for creating a new campaign");
    return null;
  }

  return (
    <PageContainer>
      <PageTitle
        text="Create New Campaign"
      />
      {isPending && <PageLoading />}
      {isSuccess && <CreateNewCampaignForm campaignSettings={data} />}
    </PageContainer>
  );
}
