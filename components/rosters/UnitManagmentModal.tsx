import { View } from 'react-native';
import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';

import ModalWrapper from '@components/common/ModalWrapper';
import ModalHeader from '@components/common/ModalHeader';
import InputElement from '@components/common/forms/InputElement';
import SelectElement from '@components/common/forms/SelectElement';
import Spacer from '@components/common/Spacer';
import Button from '@components/common/forms/Button';

import { createFormSelectOptions } from '@utils/formUtils';

import { TUnit, TPath, TUnitType } from '@definitions/unit';
import { fetchPaths, fetchUnitTypes, saveNewRosterUnit } from '@api/unitApi';
import { useNotification } from '@context/NotificationContext';

export default function UnitManagmentModal({
  visible,
  setModalVisible,
  title,
  regimentId
}: {
  visible: boolean
  setModalVisible: (visible: boolean) => void
  title: string
  regimentId: number
}) {

  const { showNotification } = useNotification();

  const [unitName, setUnitName] = useState<string>("");
  const [warscrollName, setWarscrollName] = useState<string>("");
  const [unitCost, setUnitCost] = useState<string>("");
  const [unitTypeId, setUnitTypeId] = useState<TUnitType['id'] | null>(null);
  const [generalPath, setGeneralPath] = useState<TPath['id'] | null>(null);

  const unitTypeQuery = useQuery({
    queryKey: ['unitTypes'],
    queryFn: () => fetchUnitTypes(),
  })

  const pathQuery = useQuery({
    queryKey: ['paths'],
    queryFn: () => fetchPaths(true, unitTypeId!),
    enabled: !!unitTypeId,
  })
  const saveUnitMutation = useMutation({
    mutationFn: () => saveNewRosterUnit({
      regimentId: regimentId,
      unitName,
      warscrollName,
      unitCost: Number(unitCost),
      unitType: {
        id: unitTypeId!
      },
      battleWounds: 0,
      battleScars: [],
      isReinforced: false,
      path: {
        id: generalPath!
      },
      isGeneral: true,
      isHero: true,
      emberstoneWeapon: null
    } as unknown as TUnit)
  })

  if (unitTypeQuery.isError || pathQuery.isError) {
    showNotification("Error fetching data for unit creation");
  }

  return (
    <ModalWrapper
      visible={visible}
      setModalVisible={setModalVisible}
    >
      <View style={{width: '100%'}}>
        <ModalHeader text={title} />
        <Spacer />
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
            onSelectValue={value => setGeneralPath(value)}
            placeholder="Select a Path for your general"
            disabled={!unitTypeId}
            value={generalPath}
            options={createFormSelectOptions(pathQuery.data || [], {
              labelKey: 'name',
              valueKey: 'id',
            })}
          />
          <Spacer />
          <Button
            title="Add This General"
            disabled={saveUnitMutation.isPending}
            onPress={() => saveUnitMutation.mutate()}
          />
        </View>
      </View>
    </ModalWrapper>
  );
}
