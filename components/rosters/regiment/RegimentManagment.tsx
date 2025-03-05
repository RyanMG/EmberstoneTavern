import { FlatList, View } from 'react-native';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import NoResultsBox from '@components/common/NoResultsBox';
import RegimentListItem from './RegimentListItem';
import Button from '@components/common/forms/Button';
import UnitManagementModal, { TUnitManagmentDetails} from '@components/rosters/managment/UnitManagementModal';

import Regiment from '@classes/Regiment';
import Roster from '@classes/Roster';
import { createNewRegiment, deleteRegiment } from '@api/rosterApi';
import { TRegiment } from '@definitions/roster';
import { GenericHTTPResponse } from '@definitions/api';
import { useNotification } from '@context/NotificationContext';

export default function RegimentManagment({
  roster
}: {
  roster: Roster;
}) {
  const { showNotification } = useNotification();
  const [regimentList, setRegimentList] = useState<Regiment[]>(roster.regiments);
  const [unitManagmentDetails, setUnitManagmentDetails] = useState<TUnitManagmentDetails | null>(null);

  const addRegimentMutation = useMutation({
    mutationFn: createNewRegiment,
    onSuccess: (saveResp: GenericHTTPResponse<TRegiment>) => {
      if (saveResp.success) {
        roster.regiments.push(new Regiment(saveResp.data as TRegiment));
        showNotification("New regiment created.");
        setRegimentList(roster.regiments);

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
            deleteRegiment={deleteRegimentMutation.mutate}
            addNewUnit={(regimentId: number) => setUnitManagmentDetails({
              regimentId,
              rosterId: roster.id,
              unitNameLabel: "Unit Name",
              saveButtonLabel: "Add This Unit",
              unitTypePlaceHolder: "Select your unit type",
              unitPathPlaceHolder: "Select a Path for your unit"
            })}
            />}
        />

        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', width: '100%'}}>
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
          closeModal={() => setUnitManagmentDetails(null)}
          title="Add a new unit"
          unitManagmentDetails={unitManagmentDetails}
          successActions={{
            routeOnSuccess: null,
            onSuccessMessage: "Unit created."
          }}
          failureActions={{
            onFailureMessage: "Failed to create new unit."
          }}
        />

      </>
    </>
  );
}
