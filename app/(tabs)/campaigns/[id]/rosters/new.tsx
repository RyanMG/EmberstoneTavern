import { useMutation, useQuery,useQueryClient } from '@tanstack/react-query';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState, useEffect } from 'react';

import PageContainer from '@/components/common/PageContainers';
import PageLoading from '@/components/common/PageLoading';
import RosterForm from '@/components/rosters/RosterForm';

import { useAuth } from '@context/AuthContext';
import { useNotification } from '@context/NotificationContext';
import { createCampaignRoster } from '@api/rosterApi';
import { fetchGrandAlliances, fetchFactionsByGrandAlliance } from '@api/sigmarDataApi';
import { TRoster } from '@definitions/roster';
import { TFaction } from '@definitions/sigmar';
import { GenericHTTPResponse } from '@definitions/api';

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

  const createRosterMutation = useMutation<GenericHTTPResponse<TRoster['id']>>({
    mutationFn: () => {
      return createCampaignRoster({
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
    onSuccess: ({data}: {data: TRoster['id']}) => {
      queryClient.invalidateQueries({
        // Need to invalidate the campaign and the roster
        predicate: (query: {queryKey: [string, {id?: string}]}) => {
          return (query.queryKey[0] === 'campaign' && query.queryKey[1]?.id === id) ||
            (query.queryKey[0] === 'campaignRoster' && query.queryKey[1]?.id === id);
        }
      })
      router.replace(`/(tabs)/campaigns/${id}/rosters/${data}`);
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
      <RosterForm
        name={name}
        saveText="Create Roster"
        cancelRoute={`/(tabs)/campaigns/${id}` as '/(tabs)/campaigns/[id]/rosters/[rosterId]'}
        setName={setName}
        grandAllianceOptions={grandAllianceQuery.data || []}
        grandAllianceId={grandAllianceId}
        setGrandAllianceId={setGrandAllianceId}
        factionId={factionId}
        setFactionId={setFactionId}
        factionOptions={factionOptions}
        rosterMutation={createRosterMutation}
      />
    </PageContainer>
  );
}
