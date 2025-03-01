import { View, StyleSheet } from 'react-native';
import { useMutation, useQuery,useQueryClient } from '@tanstack/react-query';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState, useEffect } from 'react';

import PageContainer from '@/components/common/PageContainers';
import InputElement from '@/components/common/forms/InputElement';
import SelectElement from '@/components/common/forms/SelectElement';
import PageLoading from '@/components/common/PageLoading';

import Button from '@/components/common/forms/Button';
import Spacer from '@/components/common/Spacer';

import { createFormSelectOptions } from '@utils/formUtils';
import { useAuth } from '@context/AuthContext';
import { useNotification } from '@context/NotificationContext';
import { createCampaignRoster } from '@api/rosterApi';
import { fetchGrandAlliances, fetchFactionsByGrandAlliance } from '@api/sigmarDataApi';
import { TRoster } from '@definitions/roster';
import { TFaction } from '@definitions/sigmar';

export default function CreateNewRosterPage() {
  const { id }: {id: string} = useLocalSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { showNotification } = useNotification();
  const { authState } = useAuth();

  const [name, setName] = useState<string>('');
  const [grandAllianceId, setGrandAllianceId] = useState<number | "">("");
  const [factionId, setFactionId] = useState<number | "">("");
  const [factionOptions, setFactionOptions] = useState<TFaction[]>([])

  const grandAllianceQuery = useQuery({
    queryKey: ['grandAlliance'],
    queryFn: () => fetchGrandAlliances(),
  })

  const factionQuery = useQuery({
    queryKey: ['factions', grandAllianceId],
    queryFn: () => {
      return fetchFactionsByGrandAlliance(Number(grandAllianceId!));
    },
    enabled: !!grandAllianceId,
  })

  const { mutate: createRoster } = useMutation({
    mutationFn: () => {
      return createCampaignRoster(id, {
        name: name,
        campaignId: id,
        playerId: authState.activeUser?.getId(),
        grandAllianceId: Number(grandAllianceId!),
        factionId: Number(factionId!),
        emberstoneTotal: 0,
        emberStoneVault: 0,
        pointTotal: 0,
        hasFactionTerrain: false
      } as TRoster);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['campaignRoster', {campaignId: id}],
      })
      router.replace(`/(tabs)/campaigns/${id}/rosters/${id}`);
    }
  })

  useEffect(() => {
    if (factionQuery.isSuccess && factionQuery.data.length > 0) {
      setFactionOptions(factionQuery.data);
    }
  }, [factionQuery])

  if (grandAllianceQuery.isPending) {
    return <PageContainer><PageLoading /></PageContainer>
  }

  if (grandAllianceQuery.isError || factionQuery.isError) {
    showNotification("Error fetching data for creating a new campaign");
    return null;
  }

  return (
    <PageContainer>
      <View style={styles.container}>
        <InputElement
          label="Roster Name"
          value={name}
          onChangeText={setName}
        />
        <Spacer />

        <SelectElement
          label="Grand Alliance"
          placeholder="Select a Grand Alliance for this roster"
          onSelectValue={value => setGrandAllianceId(value)}
          value={grandAllianceId}
          options={createFormSelectOptions(grandAllianceQuery.data, {
            labelKey: 'name',
            valueKey: 'id',
          })}
          />

        <Spacer />

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
        <Spacer />

        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', gap: 10}}>
          <Button
            title="Cancel"
            theme="secondary"
            onPress={() => {
              router.replace(`/(tabs)/campaigns/${id}`);
            }}
          />
          <Button
            title="Create Roster"
            disabled={!name || !grandAllianceId || !factionId}
            onPress={() => createRoster()}
          />
        </View>

      </View>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20
  }
});