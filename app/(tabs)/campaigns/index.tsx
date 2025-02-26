import { View } from 'react-native';

import PageContainer from "@components/common/PageContainers";
import PageTitle from "@components/common/PageTitle";
import UserCampaignList from "@/components/campaigns/campaignsList/UserCampaignList";
import CampaignsListActionButtons from '@components/campaigns/campaignsList/CampaignsListActionButtons';
import InviteNotifications from '@/components/campaigns/invites/InviteNotifications';

export default function Campaigns() {
  return (
    <PageContainer>
      <PageTitle
        text="Campaigns"
      />
      <View style={{ display: 'flex', flexDirection: 'column', width: '100%', flex: 1 }}>
        <UserCampaignList />
        <InviteNotifications />
      </View>
      <CampaignsListActionButtons />
    </PageContainer>
  );
}
