import PageContainer from '@components/common/PageContainers';
import InviteNotifications from '@components/home/InviteNotifications';
import PageTitle from '@components/common/PageTitle';
import BodyText from '@components/common/BodyText';

export default function Tavern() {
  return (
    <PageContainer>
      <PageTitle
        text="The Emberstone Tavern"
      />
      <BodyText textSize="md">Welcome to the Emberstone Tavern.</BodyText>
      <InviteNotifications />
    </PageContainer>
  );
}
