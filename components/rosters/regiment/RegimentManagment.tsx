import { FlatList } from 'react-native';

import IconButton from '@/components/common/forms/IconButton';
import NoResultsBox from '@components/common/NoResultsBox';
import RegimentListItem from './RegimentListItem';

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
      <>
        <FlatList
          data={regiments}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <RegimentListItem regiment={item} />}
        />

        <IconButton
          iconName="plus-box"
          iconSize={48}
          onPress={() => {
          }}
        />
      </>

    </>
  );
}
