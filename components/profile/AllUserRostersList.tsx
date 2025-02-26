import { View } from 'react-native';

import SectionHeader from '@components/common/SectionHeader';
import RosterItemCard from '@components/rosters/RosterItemCard';
import NoResultsBox from '@components/common/NoResultsBox';

import { useQuery } from '@tanstack/react-query';
import { getAllUserRosters } from '@api/rosterApi';
import { TRoster } from '@definitions/roster';

import FormErrorText from '@components/common/text/FormErrorText';
import { FlatList } from 'react-native';

export default function AllUserRostersList() {

  const {isPending, isError, isSuccess, data} = useQuery({
    queryKey: ['allRosters'],
    queryFn: () => getAllUserRosters()
  })

  return (
    <View>
      <SectionHeader
        text="All Created Rosters"
      />
      {isError && (
        <FormErrorText errorText="Error loading rosters" />
      )}
      {isSuccess && (
        <>
          {data.length === 0 && (
            <NoResultsBox text="No rosters created" />
          )}
          {data.length > 0 && (
            <FlatList
              data={data}
              renderItem={({ item }) => <RosterItemCard roster={item} />}
              keyExtractor={item => item.id}
            />
          )}
        </>
      )}
    </View>
  );
}