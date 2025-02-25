import PageContainer from "@components/common/PageContainers";
import PageTitle from "@components/common/PageTitle";
import UserCampaignList from "@/components/campaigns/campaignsList/UserCampaignList";
import CampaignsListActionButtons from '@components/campaigns/campaignsList/CampaignsListActionButtons';

export default function Campaigns() {
  return (
    <PageContainer>
      <PageTitle
        text="Campaigns"
      />
      <UserCampaignList />
      <CampaignsListActionButtons />
    </PageContainer>
  );
}
