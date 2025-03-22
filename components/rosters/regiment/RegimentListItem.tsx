import { View, FlatList, Image } from 'react-native';
import { useState } from 'react';
import { useMutation, UseMutateFunction, useQueryClient } from '@tanstack/react-query';

import Card from '@components/common/Card';
import BodyText from '@/components/common/text/BodyText';
import Divider from '@components/common/Divider';
import IconButton from '@components/common/forms/IconButton';
import UnitManagementModal, { TUnitManagmentDetails} from '@components/rosters/managment/UnitManagementModal';
import Dialog from '@components/common/Dialog';

import Regiment from '@classes/Regiment';
import Unit from '@classes/Unit';
import { TNewUnit, TUnit } from '@definitions/unit';
import { TRoster } from '@definitions/roster';
import { GenericHTTPResponse } from '@definitions/api';
import { TDialogContent } from '@definitions/ui';
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
    <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 5, width: '100%'}}>
      <Image
        style={{height: 20, width: 20}}
        source={unitTypeImageMap[unit.getUnitTypeForIcon() as keyof typeof unitTypeImageMap]}
      />

      <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', width: 150}}>
        <BodyText>{unit.unitName}</BodyText>
      </View>

      <View style={{ flex: 1 }}>
        <BodyText italic={true}>{unit.warscrollName}</BodyText>
      </View>

      <View style={{display: 'flex', flexDirection: 'row', width: 48}}>
        <IconButton
          iconName="eye"
          iconSize={20}
          theme="white"
          onPress={() => console.log('TODO')}
        />
      </View>
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
  const [dialogContent, setDialogContent] = useState<TDialogContent | null>(null);
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
        <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingHorizontal: 10, paddingBottom: 8, width: '100%'}}>

          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 5, width: '100%', height: 40}}>
            <BodyText italic={true}>{regiment.getRegimentName()}</BodyText>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <IconButton
                iconName="trash-can"
                disabled={!regiment.isDeletable()}
                iconSize={20}
                theme="white"
                onPress={() => setDialogContent({
                  title: 'Confirm Delete',
                  body: `Are you sure you want to delete this regiment?`,
                  actionLabel: 'Delete',
                  action: () => deleteRegiment(regiment.id)
                })}
              />
              <IconButton
                iconName="plus-box"
                disabled={regiment.isFull()}
                iconSize={20}
                theme="white"
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

          <Divider size='sm' />
          <FlatList
            data={regimentUnits}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => <UnitListItem unit={item} />}
          />
        </View>
      </Card>
      <UnitManagementModal
        visible={!!unitManagmentDetails}
        closeModal={() => setUnitManagmentDetails(null)}
        title="Add a new unit"
        unitManagmentDetails={unitManagmentDetails}
        createUnitMutation={saveUnitMutation}
      />

      <Dialog
        dialogContent={dialogContent}
        setDialogContent={setDialogContent}
      />
    </>
  );
};
