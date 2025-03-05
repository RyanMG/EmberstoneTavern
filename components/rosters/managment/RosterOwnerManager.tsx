import { View } from 'react-native';

import RosterGeneral from '@/components/rosters/RosterGeneral';
import RegimentManagment from '@/components/rosters/regiment/RegimentManagment';
import CreateGeneral from '@/components/rosters/CreateGeneral';

import Roster from '@classes/Roster';

export default function RosterOwnerManager({
  rosterData
}: {
  rosterData: Roster;
}) {

  return (
    <>
      {!rosterData.general && (
        <CreateGeneral regimentId={rosterData.regiments[0].id} rosterId={rosterData.id} campaignId={rosterData.campaignId} />
      )}

      {rosterData.general && (
        <View style={{display: 'flex', flexDirection: 'column', gap: 10, width: '100%'}}>
          <RosterGeneral general={rosterData.general} />
          <RegimentManagment roster={rosterData} />
        </View>
      )}
    </>
  );
}
