import { View, FlatList } from 'react-native';
import NoResultsBox from '@components/common/NoResultsBox';
import { useQuery } from '@tanstack/react-query';
import { fetchInvites } from '@api/campaignApi';
import { TCampaignInvite } from '@definitions/campaign';
import BodyText from '@components/common/BodyText';

const InviteNotification = ({ invite }: { invite: TCampaignInvite }) => {
  return (
    <View>
      <BodyText>{invite.owner.firstName} {invite.owner.lastName} invited you to join {invite.campaignOverview.title}</BodyText>
    </View>
  )
}

export default function InviteNotifications() {

  const { data: invites, isSuccess, isError, isLoading } = useQuery({
    queryKey: ['invites'],
    queryFn: fetchInvites,
  });

  if (isLoading) return null;
  if (isError) return null;

  if (isSuccess) {
    if (invites.length === 0) {
      return <NoResultsBox text="No invite notifications" />
    }
    return (
      <View>
        {invites.length > 0 && (
          <FlatList
            data={invites}
            renderItem={({ item }) => <InviteNotification invite={item} />}
            keyExtractor={item => item.id.toString()}
          />
        )}
      </View>
    );
  }
}