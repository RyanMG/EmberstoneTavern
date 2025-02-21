import PageContainer from '@components/common/PageContainers';
import PageTitle from '@components/common/PageTitle';
import UserCampaignList from '@components/campaigns/UserCampaignList';

import { useAuth } from '@/lib/context/AuthContext';
import { Redirect } from 'expo-router';

export default function Campaigns() {
  const { authState } = useAuth();

  if (!authState?.authenticated) return <Redirect href="/" />

  return (
    <PageContainer>
      <PageTitle
        text="Campaigns"
      />
      <UserCampaignList />
    </PageContainer>
  );
}
