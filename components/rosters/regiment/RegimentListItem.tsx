import { View, FlatList, Image } from 'react-native';;
import { UseMutateFunction } from '@tanstack/react-query';

import Card from '@components/common/Card';
import BodyText from '@components/common/BodyText';
import Divider from '@components/common/Divider';
import IconButton from '@components/common/forms/IconButton';

import Regiment from '@classes/Regiment';
import Unit from '@classes/Unit';
import { GenericHTTPResponse } from '@definitions/api';

const unitTypeImageMap = {
  infantry: require('@images/unit_types/infantry.svg'),
  cavalry: require('@images/unit_types/cavalry.svg'),
  wizard: require('@images/unit_types/wizard.svg'),
  priest: require('@images/unit_types/priest.svg'),
  beast: require('@images/unit_types/beast.svg'),
  monster: require('@images/unit_types/monster.svg'),
  warmachine: require('@images/unit_types/war_machine.svg'),
}

/**
 * Individual unit row in the regiment list
 */
function UnitListItem({ unit }: { unit: Unit }) {

  return (
    <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 5, paddingLeft: 5, paddingRight: 10, width: '100%'}}>
      <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10}}>
        <Image
          style={{height: 25, width: 25}}
          source={unitTypeImageMap[unit.unitType.name.toLowerCase() as keyof typeof unitTypeImageMap]}
        />
        <BodyText>{unit.unitName}</BodyText>
        <BodyText italic={true}>{unit.warscrollName}</BodyText>
      </View>

      <BodyText textSize="sm" italic={true}>{unit.path.name} - Rank {unit.pathRank}</BodyText>
     </View>
  );
}

/**
 * A regiment listing
 */
export default function RegimentListItem({
  regiment,
  deleteRegiment
}: {
  regiment: Regiment
  deleteRegiment: UseMutateFunction<GenericHTTPResponse<number>, Error, number, unknown>
}) {

  return (
    <Card>
      <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingHorizontal: 10, paddingBottom: 10, width: '100%'}}>

        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 5, width: '100%', height: 40}}>
          <BodyText italic={true}>{regiment.getRegimentName()}</BodyText>
          {regiment.isDeletable() && (
            <IconButton
              iconName="trash-can"
              iconSize={20}
              theme="white"
              onPress={() => deleteRegiment(regiment.id)}
            />
          )}

        </View>

        <Divider size='sm' />
        <FlatList
          data={regiment.units}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <UnitListItem unit={item} />}
        />
      </View>
    </Card>
  );
};
