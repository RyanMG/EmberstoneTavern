import PageContainer from "@components/common/PageContainers";
import PageTitle from "@components/common/PageTitle";
import UserCampaignList from "@components/campaigns/UserCampaignList";

export default function Campaigns() {
  return (
    <PageContainer>
      <PageTitle
        text="Campaigns"
      />
      <UserCampaignList />
    </PageContainer>
  );
}
