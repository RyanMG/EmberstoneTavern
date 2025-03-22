import { TRoster } from '@definitions/roster';
import { View } from 'react-native';
import { Link } from 'expo-router';

import BodyText from '@/components/common/text/BodyText';
import Card from '@components/common/Card';

export default function RosterItemCard({
  campaignId,
  roster
}: {
  campaignId: string;
  roster: TRoster
}) {
  return (
    <Link
      push
      href={`/campaigns/${campaignId}/rosters/${roster.id}`}
    >
      <Card>
        <View style={{width: '100%', padding: 10}}>
          <BodyText textSize="lg" bold={true}>{roster.name}</BodyText>
          <BodyText textSize="md" italic={true}>{roster.faction?.name}</BodyText>
        </View>
      </Card>
    </Link>
  );
}
