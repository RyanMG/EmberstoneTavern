import { View } from 'react-native';

import IconButton from '@/components/common/forms/IconButton';
import NoResultsBox from '@components/common/NoResultsBox';

import { TRegiment } from '@definitions/roster';

export default function RegimentManagment({
  regiments
}: {
  regiments: TRegiment[];
}) {
  return (
    <>
      {regiments.length === 0 && (
        <NoResultsBox text="This roster has no regiments assigned to it. Use the + button to add one." />
      )}
      <View style={{position: 'absolute', bottom: 10, right: 10}}>
        <IconButton
          iconName="plus-box"
          iconSize={48}
          onPress={() => {

          }}
        />
      </View>
    </>
  );
}
