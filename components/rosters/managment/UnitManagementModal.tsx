import { View } from 'react-native';
import { useState, useEffect } from 'react';
import { useQuery, useQueryClient, UseMutationResult } from '@tanstack/react-query';

import ModalWrapper from '@components/common/ModalWrapper';
import InputElement from '@components/common/forms/InputElement';
import SelectElement from '@components/common/forms/SelectElement';
import Checkbox from '@components/common/forms/Checkbox';
import Spacer from '@components/common/Spacer';
import Button from '@components/common/forms/Button';

import { createFormSelectOptions } from '@utils/formUtils';

import { TRegiment } from '@definitions/roster';
import { TNewUnit, TUnit, TPath, TUnitType } from '@definitions/unit';
import { GenericHTTPResponse } from '@definitions/api';
import { fetchPaths, fetchUnitTypes } from '@api/unitApi';
import { useNotification } from '@context/NotificationContext';

export type TUnitManagmentDetails = {
  regimentId: TRegiment['id'];
  unitNameLabel: string;
  saveButtonLabel: string;
  unitTypePlaceHolder: string;
  unitPathPlaceHolder: string;
}

interface IUnitManagmentModalProps {
  visible: boolean;
  closeModal: () => void;
  title: string;
  isGeneral?: boolean;
  isHero?: boolean;
  unitManagmentDetails: TUnitManagmentDetails | null;
  createUnitMutation: UseMutationResult<GenericHTTPResponse<string | TUnit>, Error, TNewUnit, unknown>
}

export default function UnitManagmentModal({
  visible,
  closeModal,
  title,
  isHero = false,
  isGeneral = false,
  createUnitMutation,
  unitManagmentDetails
}: IUnitManagmentModalProps) {

  const { showNotification } = useNotification();
  const queryClient = useQueryClient();

  const [unitName, setUnitName] = useState<string>("");
  const [warscrollName, setWarscrollName] = useState<string>("");
  const [unitCost, setUnitCost] = useState<string>("");
  const [isHeroUnit, setIsHeroUnit] = useState<boolean>(isGeneral || isHero);
  const [unitTypeId, setUnitTypeId] = useState<TUnitType['id']>();
  const [pathId, setPathId] = useState<TPath['id']>();

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

  if (unitTypeQuery.isError || pathQuery.isError) {
    showNotification("Error fetching data for unit creation");
  }

  useEffect(() => {
    if (visible) return;
    setUnitName("");
    setWarscrollName("");
    setUnitCost("");
    setIsHeroUnit((isGeneral || isHero) ? true : false);
    setUnitTypeId(undefined);
    setPathId(undefined);
  }, [visible])

  return (
    <ModalWrapper
      visible={visible}
      closeModal={closeModal}
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
            disabled={isGeneral || isHero}
            isChecked={isHeroUnit}
            setChecked={setIsHeroUnit}
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
            onSelectValue={setPathId}
            placeholder={unitManagmentDetails?.unitPathPlaceHolder || "Select a Path"}
            disabled={!unitTypeId || pathQuery.data?.length === 0}
            value={pathId}
            options={createFormSelectOptions(pathQuery.data || [], {
              labelKey: 'name',
              valueKey: 'id',
            })}
          />
          <Spacer />
          <Button
            title={unitManagmentDetails?.saveButtonLabel || "Save Unit"}
            disabled={createUnitMutation.isPending || !unitTypeId || !warscrollName || !unitCost}
            onPress={() =>
              createUnitMutation.mutate({
                regimentId: unitManagmentDetails?.regimentId!,
                unitName,
                warscrollName,
                unitCost: Number(unitCost),
                unitTypeId: unitTypeId!,
                battleWounds: 0,
                battleScars: [],
                isReinforced: false,
                pathId,
                pathRank: 1,
                isGeneral: false,
                isHero
              })
            }
          />
        </View>
      </View>
    </ModalWrapper>
  );
}
