import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { UseMutationResult } from '@tanstack/react-query';

import InputElement from '@components/common/forms/InputElement';
import SelectElement from '@components/common/forms/SelectElement';
import Button from '@components/common/forms/Button';

import { TFaction, TGrandAlliance } from '@definitions/sigmar';
import { GenericHTTPResponse } from '@definitions/api';
import { TRoster } from '@definitions/roster';

import { createFormSelectOptions } from '@utils/formUtils';

interface IRosterFormProps {
  saveText: string;
  cancelRoute: '/(tabs)/campaigns/[id]/rosters/[rosterId]' | '/(tabs)/campaigns/[id]';
  name: string;
  setName: (name: string) => void;
  grandAllianceOptions: TGrandAlliance[];
  grandAllianceId: number | '';
  setGrandAllianceId: (id: number | '') => void;
  factionId: number | '';
  setFactionId: (id: number | '') => void;
  factionOptions: TFaction[];
  rosterMutation: UseMutationResult<GenericHTTPResponse<TRoster>, Error, void, unknown>;
}

export default function RosterForm({
  saveText,
  cancelRoute,
  name,
  setName,
  grandAllianceOptions,
  grandAllianceId,
  setGrandAllianceId,
  factionId,
  setFactionId,
  factionOptions,
  rosterMutation
}: IRosterFormProps) {
  const router = useRouter();

  return (
    <View style={{display: 'flex', flexDirection: 'column', gap: 20, width: '100%'}}>
      <InputElement
        label="Roster Name"
        value={name}
        onChangeText={setName}
      />

      <SelectElement
        label="Grand Alliance"
        placeholder="Select a Grand Alliance for this roster"
        onSelectValue={value => setGrandAllianceId(value)}
        value={grandAllianceId}
        options={createFormSelectOptions(grandAllianceOptions, {
          labelKey: 'name',
          valueKey: 'id',
        })}
        />

      <SelectElement
        label="Faction"
        placeholder="Select a faction for this roster"
        disabled={!grandAllianceId}
        onSelectValue={value => setFactionId(value)}
        value={factionId}
        options={createFormSelectOptions(factionOptions, {
          labelKey: 'name',
          valueKey: 'id',
        })}
      />

      <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', gap: 10}}>
        <Button
          title="Cancel"
          theme="secondary"
          disabled={rosterMutation.isPending}
          onPress={() => {
            router.replace(cancelRoute);
          }}
        />
        <Button
          title={saveText}
          disabled={!name || !grandAllianceId || !factionId || rosterMutation.isPending}
          onPress={() => rosterMutation.mutate()}
        />
      </View>
    </View>
  )
};
