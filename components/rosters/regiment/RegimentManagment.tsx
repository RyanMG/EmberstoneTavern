import { FlatList, View } from 'react-native';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import NoResultsBox from '@components/common/NoResultsBox';
import RegimentListItem from './RegimentListItem';
import Button from '@components/common/forms/Button';

import Regiment from '@classes/Regiment';
import { createNewRegiment, deleteRegiment } from '@api/rosterApi';
import { TRegiment } from '@definitions/roster';
import { GenericHTTPResponse } from '@definitions/api';
import { useNotification } from '@context/NotificationContext';

export default function RegimentManagment({
  rosterId,
  regiments,
}: {
  rosterId: string;
  regiments: Regiment[];
}) {
  const { showNotification } = useNotification();
  const [regimentList, setRegimentList] = useState<Regiment[]>(regiments);

  const addRegimentMutation = useMutation({
    mutationFn: createNewRegiment,
    onSuccess: (saveResp: GenericHTTPResponse<TRegiment>) => {
      if (saveResp.success) {
        regiments.push(new Regiment(saveResp.data as TRegiment));
        showNotification("New regiment created.");

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
        regiments = regiments.filter(regiment => regiment.id !== saveResp.data);
        setRegimentList(regiments);

      } else {
        showNotification(saveResp.message);
      }
    }
  })

  return (
    <>
      {regiments.length === 0 && (
        <NoResultsBox text="This roster has no regiments assigned to it. Use the + button to add one." />
      )}
      <>
        <FlatList
          data={regimentList}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <RegimentListItem regiment={item} deleteRegiment={deleteRegimentMutation.mutate} />}
        />

        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', width: '100%'}}>
          <Button
            title="Add regiment"
            onPress={() => addRegimentMutation.mutate({
              rosterId,
              isGeneral: false,
              isAuxiliary: false,
              units: [],
            } as unknown as TRegiment)}
          />
        </View>

      </>
    </>
  );
}
