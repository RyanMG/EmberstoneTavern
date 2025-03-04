import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';

import RosterForm from '@/components/rosters/RosterForm';

import { TRoster } from '@definitions/roster';
import { TGrandAlliance, TFaction } from '@definitions/sigmar';
import { GenericHTTPResponse } from '@definitions/api';
import { createCampaignRoster } from '@api/rosterApi';
import { fetchFactionsByGrandAlliance } from '@api/sigmarDataApi';

interface EditRosterFormProps {
  campaignId: string;
  rosterId: string;
  roster: TRoster;
  grandAlliances: TGrandAlliance[];
}

export default function EditRosterForm({
  campaignId,
  rosterId,
  roster,
  grandAlliances
 }: EditRosterFormProps) {

  const queryClient = useQueryClient();
  const router = useRouter();

  const [name, setName] = useState<string>(roster.name || '');
  const [grandAllianceId, setGrandAllianceId] = useState<number | "">(roster.grandAllianceId || "");
  const [factionId, setFactionId] = useState<number | "">(roster.factionId || "");
  const [factionOptions, setFactionOptions] = useState<TFaction[]>([])

  const factionQuery = useQuery({
    queryKey: ['factions', grandAllianceId],
    queryFn: () => {
      return fetchFactionsByGrandAlliance(Number(grandAllianceId!));
    }
  })

  const createRosterMutation = useMutation<GenericHTTPResponse<TRoster>>({
    mutationFn: () => {
      return createCampaignRoster({
        name: name,
        campaignId: campaignId,
        playerId: roster.playerId,
        grandAllianceId: Number(grandAllianceId!),
        factionId: Number(factionId!),
        emberstoneTotal: 0,
        emberStoneVault: 0,
        pointTotal: 0,
        hasFactionTerrain: false
      } as TRoster);
    },
    onSuccess: ({data}: {data: TRoster}) => {
      queryClient.invalidateQueries({
        queryKey: ['campaignRoster', {campaignId: campaignId}],
      })
      router.replace(`/(tabs)/campaigns/${campaignId}/rosters/${data.id}`);
    }
  })

  useEffect(() => {
    if (factionQuery.isSuccess && factionQuery.data.length > 0) {
      setFactionOptions(factionQuery.data);
    }
  }, [factionQuery])

  return (
    <RosterForm
      saveText="Update Roster"
      cancelRoute={`/(tabs)/campaigns/${campaignId}/rosters/${rosterId}` as '/(tabs)/campaigns/[id]/rosters/[rosterId]'}
      name={name}
      setName={setName}
      grandAllianceOptions={grandAlliances}
      grandAllianceId={grandAllianceId}
      setGrandAllianceId={setGrandAllianceId}
      factionId={factionId}
      setFactionId={setFactionId}
      factionOptions={factionOptions}
      rosterMutation={createRosterMutation}
    />
  );
}
