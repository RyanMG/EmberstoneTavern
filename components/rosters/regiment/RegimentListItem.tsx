import { View, FlatList, Image } from 'react-native';
import { useState } from 'react';
import { useMutation, UseMutateFunction, useQueryClient } from '@tanstack/react-query';

import Card from '@components/common/Card';
import BodyText from '@components/common/BodyText';
import Divider from '@components/common/Divider';
import IconButton from '@components/common/forms/IconButton';
import UnitManagementModal, { TUnitManagmentDetails} from '@components/rosters/managment/UnitManagementModal';

import Regiment from '@classes/Regiment';
import Unit from '@classes/Unit';
import { TNewUnit, TUnit } from '@definitions/unit';
import { TRoster } from '@definitions/roster';
import { GenericHTTPResponse } from '@definitions/api';
import { saveNewRosterUnit } from '@api/unitApi';
import { useNotification } from '@context/NotificationContext';

const unitTypeImageMap = {
  general: require('@images/unit_types/general.svg'),
  hero: require('@images/unit_types/hero.svg'),
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
          style={{height: 20, width: 20}}
          source={unitTypeImageMap[unit.getUnitTypeForIcon() as keyof typeof unitTypeImageMap]}
        />
        <BodyText>{unit.unitName}</BodyText>
        <BodyText italic={true}>{unit.warscrollName}</BodyText>
      </View>

      {unit.path && (
          <BodyText textSize="sm" italic={true}>{unit.path.name} - Rank {unit.pathRank}</BodyText>
      )}

     </View>
  );
}

/**
 * A regiment listing
 */
export default function RegimentListItem({
  regiment,
  rosterId,
  deleteRegiment
}: {
  regiment: Regiment
  rosterId: TRoster['id']
  deleteRegiment: UseMutateFunction<GenericHTTPResponse<number>, Error, number, unknown>
}) {

  const queryClient = useQueryClient();
  const { showNotification } = useNotification();

  const [unitManagmentDetails, setUnitManagmentDetails] = useState<TUnitManagmentDetails | null>(null);
  const [regimentUnits, setRegimentUnits] = useState<Unit[]>(regiment.units);

  const saveUnitMutation = useMutation<GenericHTTPResponse<TUnit | string>, Error, TNewUnit>({
    mutationFn: (unitData: TNewUnit) => saveNewRosterUnit(rosterId, unitData.regimentId, {...unitData, isGeneral: false}),
    onSuccess: (data: GenericHTTPResponse<TUnit | string>) => {
      if (data.success) {
        showNotification("Unit created successfully");
        queryClient.invalidateQueries({ queryKey: ['campaignRoster', {id: rosterId}] });
        setRegimentUnits([...regimentUnits, new Unit(data.data as TUnit)])

      } else {
        showNotification("Error creating unit");
      }
      setUnitManagmentDetails(null);
    },
    onError: () => {
      showNotification("Error creating unit");
    }
  })

  return (
    <>
      <Card>
        <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingHorizontal: 10, width: '100%'}}>

          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 5, width: '100%', height: 40}}>
            <BodyText italic={true}>{regiment.getRegimentName()}</BodyText>
            <IconButton
              iconName="trash-can"
              disabled={!regiment.isDeletable()}
              iconSize={20}
              theme="white"
              onPress={() => deleteRegiment(regiment.id)}
            />

          </View>

          <Divider size='sm' />
          <FlatList
            data={regimentUnits}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => <UnitListItem unit={item} />}
          />

          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', gap: 10}}>
            <IconButton
              iconName="plus-box"
              disabled={regiment.isFull()}
              iconSize={32}
              onPress={() => setUnitManagmentDetails({
                regimentId: regiment.id,
                unitNameLabel: "Unit Name",
                saveButtonLabel: "Add This Unit",
                unitTypePlaceHolder: "Select your unit type",
                unitPathPlaceHolder: "Select a Path for your unit"
              })}
            />
          </View>

        </View>
      </Card>
      <UnitManagementModal
        visible={!!unitManagmentDetails}
        closeModal={() => setUnitManagmentDetails(null)}
        title="Add a new unit"
        unitManagmentDetails={unitManagmentDetails}
        createUnitMutation={saveUnitMutation}
      />
    </>
  );
};
