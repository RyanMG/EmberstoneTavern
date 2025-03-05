import { View } from 'react-native';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';

import ModalWrapper from '@components/common/ModalWrapper';
import InputElement from '@components/common/forms/InputElement';
import SelectElement from '@components/common/forms/SelectElement';
import Spacer from '@components/common/Spacer';
import Button from '@components/common/forms/Button';

import { createFormSelectOptions } from '@utils/formUtils';

import { TUnit, TPath, TUnitType } from '@definitions/unit';
import type { GenericHTTPResponse } from '@definitions/api';
import { TRegiment, TRoster } from '@definitions/roster';
import { fetchPaths, fetchUnitTypes, saveNewRosterUnit } from '@api/unitApi';
import { useNotification } from '@context/NotificationContext';

export default function UnitManagmentModal({
  visible,
  setModalVisible,
  title,
  regimentId,
  rosterId,
  successActions,
  failureActions
}: {
  visible: boolean
  setModalVisible: (visible: boolean) => void
  title: string
  regimentId: TRegiment['id'];
  rosterId: TRoster['id'];
  successActions: {
    routeOnSuccess: '/(tabs)/campaigns/[id]/rosters/[rosterId]';
    onSuccessMessage: string;
  },
  failureActions: {
    onFailureMessage: string;
  }
}) {

  const { showNotification } = useNotification();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [unitName, setUnitName] = useState<string>("");
  const [warscrollName, setWarscrollName] = useState<string>("");
  const [unitCost, setUnitCost] = useState<string>("");
  const [unitTypeId, setUnitTypeId] = useState<TUnitType['id'] | null>(null);
  const [generalPathId, setGeneralPathId] = useState<TPath['id'] | null>(null);

  const unitTypeQuery = useQuery({
    queryKey: ['unitTypes'],
    queryFn: () => fetchUnitTypes(),
  })

  const pathQuery = useQuery({
    queryKey: ['paths'],
    queryFn: () => fetchPaths(true, unitTypeId!),
    enabled: !!unitTypeId,
  })
  const saveUnitMutation = useMutation<GenericHTTPResponse<TUnit | string>>({
    mutationFn: () => saveNewRosterUnit(rosterId, regimentId, {
      regimentId: regimentId,
      unitName,
      warscrollName,
      unitCost: Number(unitCost),
      unitTypeId: unitTypeId!,
      battleWounds: 0,
      battleScars: [],
      isReinforced: false,
      pathId: generalPathId,
      pathRank: 1,
      isGeneral: true,
      isHero: true,
      emberstoneWeapon: null
    } as unknown as TUnit),
    onSuccess: (data: GenericHTTPResponse<TUnit | string>) => {
      if (data.success) {
        router.replace(successActions.routeOnSuccess);
        showNotification(successActions.onSuccessMessage);

      } else {
        if (data.message === 'There is an existing general present for this campaign') {
          showNotification(data.message);
          queryClient.invalidateQueries({ queryKey: ['campaignRoster', {id: rosterId}] });
          setModalVisible(false);

        } else {
          showNotification(failureActions.onFailureMessage);
        }
      }
    },
    onError: (error) => {
      showNotification(failureActions.onFailureMessage);
    }
  })

  if (unitTypeQuery.isError || pathQuery.isError) {
    showNotification("Error fetching data for unit creation");
  }

  return (
    <ModalWrapper
      visible={visible}
      setModalVisible={setModalVisible}
      title={title}
    >
      <View style={{width: '100%'}}>
        <View style={{display: 'flex', flexDirection: 'column', gap: 10}}>
          <InputElement
            label="General's Name"
            onChangeText={setUnitName}
            value={unitName}
          />

          <InputElement
            label="Warscroll Name"
            keyboardType="default"
            onChangeText={setWarscrollName}
            value={warscrollName}
          />

          <InputElement
            label="Unit Point Cost"
            keyboardType="default"
            onChangeText={val => setUnitCost(val.replace(/\D/g, ""))}
            value={unitCost}
          />

          <SelectElement
            label="Unit Type"
            onSelectValue={value => setUnitTypeId(value)}
            placeholder="Select your general's unit type"
            value={unitTypeId}
            options={createFormSelectOptions(unitTypeQuery.data || [], {
              labelKey: 'name',
              valueKey: 'id',
            })}
          />

          <SelectElement
            label="Path"
            onSelectValue={value => setGeneralPathId(value)}
            placeholder="Select a Path for your general"
            disabled={!unitTypeId}
            value={generalPathId}
            options={createFormSelectOptions(pathQuery.data || [], {
              labelKey: 'name',
              valueKey: 'id',
            })}
          />
          <Spacer />
          <Button
            title="Add This General"
            disabled={saveUnitMutation.isPending || !unitTypeId || !warscrollName || !unitCost}
            onPress={() => saveUnitMutation.mutate()}
          />
        </View>
      </View>
    </ModalWrapper>
  );
}
