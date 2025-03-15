import { FlatList, View } from 'react-native';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import NoResultsBox from '@components/common/NoResultsBox';
import RegimentListItem from './RegimentListItem';
import Button from '@components/common/forms/Button';
import BodyText from '@components/common/BodyText';
import UnitManagementModal, { TUnitManagmentDetails} from '@components/rosters/managment/UnitManagementModal';

import Regiment from '@classes/Regiment';
import Roster from '@classes/Roster';
import Unit from '@classes/Unit';

import { createNewRegiment, deleteRegiment } from '@api/rosterApi';
import { saveNewRosterUnit } from '@api/unitApi';

import { TRegiment } from '@definitions/roster';
import { GenericHTTPResponse } from '@definitions/api';
import { useNotification } from '@context/NotificationContext';
import { TNewUnit, TUnit } from '@definitions/unit';

export default function RegimentManagment({
  roster
}: {
  roster: Roster;
}) {
  const { showNotification } = useNotification();
  const queryClient = useQueryClient();

  const [regimentList, setRegimentList] = useState<Regiment[]>(roster.regiments);
  const [unitManagmentDetails, setUnitManagmentDetails] = useState<TUnitManagmentDetails | null>(null);

  const addRegimentMutation = useMutation({
    mutationFn: createNewRegiment,
    onSuccess: (saveResp: GenericHTTPResponse<TRegiment>) => {
      if (saveResp.success) {
        roster.regiments.push(new Regiment(saveResp.data as TRegiment));
        setRegimentList(roster.regiments);
        setUnitManagmentDetails({
          regimentId: saveResp.data.id,
          unitNameLabel: "Hero Name",
          saveButtonLabel: "Add This Hero",
          unitTypePlaceHolder: "Select your hero type",
          unitPathPlaceHolder: "Select a Path for your hero"
        });

      } else {
        showNotification(saveResp.message);
      }
    }
  })

  const deleteRegimentMutation = useMutation({
    mutationFn: deleteRegiment,
    onSuccess: (saveResp: GenericHTTPResponse<number>) => {
      if (saveResp.success) {
        showNotification("Regiment deleted.");
        roster.regiments = roster.regiments.filter(regiment => regiment.id !== saveResp.data);
        setRegimentList(roster.regiments);

      } else {
        showNotification(saveResp.message);
      }
    }
  })

  const saveUnitMutation = useMutation<GenericHTTPResponse<TUnit | string>, Error, TNewUnit>({
    mutationFn: (unitData: TNewUnit) => saveNewRosterUnit(roster.id, unitData.regimentId, {...unitData, isGeneral: false}),
    onSuccess: (data: GenericHTTPResponse<TUnit | string>) => {
      if (data.success) {
        showNotification("Unit created successfully");
        queryClient.invalidateQueries({ queryKey: ['campaignRoster', {id: roster.id}] });
        regimentList[regimentList.length - 1].units.push(new Unit(data.data as TUnit));
        setRegimentList([...regimentList]);

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
      {regimentList.length === 0 && (
        <NoResultsBox text="This roster has no regiments assigned to it. Use the + button to add one." />
      )}
      <>
        <FlatList
          data={regimentList}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <RegimentListItem
            regiment={item}
            rosterId={roster.id}
            deleteRegiment={deleteRegimentMutation.mutate}
          />}
        />

        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
          <View style={{flex: 1, paddingLeft: 5}}>
            <BodyText italic={true} bold={true}>Point Total: {roster.getPointTotal()}</BodyText>
          </View>
          <Button
            title="Add regiment"
            disabled={roster.hasEmptyRegiment()}
            onPress={() => addRegimentMutation.mutate({
              rosterId: roster.id,
              isGeneral: false,
              isAuxiliary: false,
              units: [],
            } as unknown as TRegiment)}
          />
        </View>

        <UnitManagementModal
          visible={!!unitManagmentDetails}
          closeModal={() => {
            setUnitManagmentDetails(null);

            // If no hero was saved, delete the new regiment
            if (!saveUnitMutation.isSuccess) {
              deleteRegimentMutation.mutate(regimentList[regimentList.length - 1].id);
            }
          }}
          title="Add a hero to lead this regiment"
          isHero={true}
          unitManagmentDetails={unitManagmentDetails}
          createUnitMutation={saveUnitMutation}
        />
      </>
    </>
  );
}
