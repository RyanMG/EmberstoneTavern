import { View } from 'react-native';
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';

import ModalWrapper from '@components/common/ModalWrapper';
import InputElement from '@components/common/forms/InputElement';
import SelectElement from '@components/common/forms/SelectElement';
import Checkbox from '@components/common/forms/Checkbox';
import Spacer from '@components/common/Spacer';
import Button from '@components/common/forms/Button';

import { createFormSelectOptions } from '@utils/formUtils';

import { TUnit, TPath, TUnitType } from '@definitions/unit';
import type { GenericHTTPResponse } from '@definitions/api';
import { TRegiment, TRoster } from '@definitions/roster';
import { fetchPaths, fetchUnitTypes, saveNewRosterUnit } from '@api/unitApi';
import { useNotification } from '@context/NotificationContext';

export type TUnitManagmentDetails = {
  regimentId: TRegiment['id'];
  rosterId: TRoster['id'];
  unitNameLabel: string;
  saveButtonLabel: string;
  unitTypePlaceHolder: string;
  unitPathPlaceHolder: string;
}

interface IUnitManagmentModalProps {
  visible: boolean
  closeModal: () => void;
  title: string
  unitManagmentDetails: TUnitManagmentDetails | null
  successActions: {
    routeOnSuccess: '/(tabs)/campaigns/[id]/rosters/[rosterId]' | null;
    onSuccessMessage: string;
  },
  failureActions: {
    onFailureMessage: string;
  }
}

export default function UnitManagmentModal({
  visible,
  closeModal,
  title,
  unitManagmentDetails,
  successActions,
  failureActions
}: IUnitManagmentModalProps) {

  const { showNotification } = useNotification();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [unitName, setUnitName] = useState<string>("");
  const [warscrollName, setWarscrollName] = useState<string>("");
  const [unitCost, setUnitCost] = useState<string>("");
  const [isHero, setIsHero] = useState<boolean>(false);
  const [unitTypeId, setUnitTypeId] = useState<TUnitType['id'] | null>(null);
  const [generalPathId, setGeneralPathId] = useState<TPath['id'] | null>(null);

  const unitTypeQuery = useQuery({
    queryKey: ['unitTypes'],
    queryFn: () => fetchUnitTypes(),
  })

  const pathQuery = useQuery({
    queryKey: ['paths'],
    queryFn: () => fetchPaths(isHero, unitTypeId!),
    enabled: !!unitTypeId,
  })

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['paths'] })
  }, [unitTypeId, isHero])

  const saveUnitMutation = useMutation<GenericHTTPResponse<TUnit | string>>({
    mutationFn: () => saveNewRosterUnit(unitManagmentDetails!.rosterId, unitManagmentDetails!.regimentId, {
      regimentId: unitManagmentDetails!.regimentId,
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
      isHero,
      emberstoneWeapon: null
    } as unknown as TUnit),
    onSuccess: (data: GenericHTTPResponse<TUnit | string>) => {
      if (data.success) {
        if (successActions.routeOnSuccess !== null) {
          router.replace(successActions.routeOnSuccess);
        }

        showNotification(successActions.onSuccessMessage);

      } else {
        if (data.message === 'There is an existing general present for this campaign') {
          showNotification(data.message);
          queryClient.invalidateQueries({ queryKey: ['campaignRoster', {id: unitManagmentDetails!.rosterId}] });
          closeModal();

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

  const closeUnitModal = () => {
    setUnitName("");
    setWarscrollName("");
    setUnitCost("");
    setIsHero(false);
    setUnitTypeId(null);
    setGeneralPathId(null);
    closeModal();
  }

  return (
    <ModalWrapper
      visible={visible}
      closeModal={closeUnitModal}
      title={title}
    >
      <View style={{width: '100%'}}>
        <View style={{display: 'flex', flexDirection: 'column', gap: 10}}>
          <InputElement
            label={`${unitManagmentDetails?.unitNameLabel} (Optional)` || "Name (Optional)"}
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

          <Checkbox
            label="Is this a hero unit?"
            isChecked={isHero}
            setChecked={setIsHero}
          />

          <SelectElement
            label="Unit Type"
            onSelectValue={value => setUnitTypeId(value)}
            placeholder={unitManagmentDetails?.unitTypePlaceHolder || "Select a Unit Type"}
            value={unitTypeId}
            options={createFormSelectOptions(unitTypeQuery.data || [], {
              labelKey: 'name',
              valueKey: 'id',
            })}
          />

          <SelectElement
            label="Path (Optional)"
            onSelectValue={value => setGeneralPathId(value)}
            placeholder={unitManagmentDetails?.unitPathPlaceHolder || "Select a Path"}
            disabled={!unitTypeId || pathQuery.data?.length === 0}
            value={generalPathId}
            options={createFormSelectOptions(pathQuery.data || [], {
              labelKey: 'name',
              valueKey: 'id',
            })}
          />
          <Spacer />
          <Button
            title={unitManagmentDetails?.saveButtonLabel || "Save Unit"}
            disabled={saveUnitMutation.isPending || !unitTypeId || !warscrollName || !unitCost}
            onPress={() => saveUnitMutation.mutate()}
          />
        </View>
      </View>
    </ModalWrapper>
  );
}
