import { TRoster } from '@definitions/roster';
import { Text } from 'react-native';

export default function RosterItemCard({
  roster
}: {
  roster: TRoster
}) {
  return (
    <Text>
      {roster.name}
    </Text>
  );
}
