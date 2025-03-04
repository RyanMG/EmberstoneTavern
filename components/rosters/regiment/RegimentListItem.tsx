import { Text } from 'react-native';

import Card from '@components/common/Card';

import { TRegiment } from '@definitions/roster';

export default function RegimentListItem({
  regiment
}: {
  regiment: TRegiment
}) {
  console.log(regiment);
  return (
    <Card>
      <Text>Regiment</Text>
    </Card>
  );
};
