import { StyleSheet, View } from 'react-native';
import { TCampaignInvite } from '@definitions/campaign';

import Button from '@components/common/forms/Button';
import BodyText from '@components/common/BodyText';

export default function InviteNotificationItem({
  invite,
  acceptInvite,
  declineInvite
}: {
  invite: TCampaignInvite;
  acceptInvite: (id: number) => void;
  declineInvite: (id: number) => void;
}) {

  return (
    <View style={styles.inviteNotification}>
      <View style={styles.inviteText}>
        <BodyText textSize="sm" bold={true}>
          {invite.owner.firstName} {invite.owner.lastName}
        </BodyText>

        <BodyText textSize="sm" italic={true}>
          invited you to join
        </BodyText>

        <BodyText textSize="sm" bold={true}>
          {invite.campaignOverview.title}
        </BodyText>
      </View>

      <View style={styles.actions}>
        <Button
          iconOnly={true}
          iconName="check"
          onPress={() => {
            acceptInvite(invite.id);
          }}
        />

        <Button
          iconOnly={true}
          iconName="close"
          onPress={() => {
            declineInvite(invite.id);
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  inviteNotification: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    width: '100%'
  },
  inviteText: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    gap: 5
  },
  icon: {

  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5
  }
})