import { View } from "react-native";
import { useState } from "react";
import { UseMutationResult } from "@tanstack/react-query";
import dayjs from 'dayjs';

import InputElement from "@components/common/forms/InputElement";
import SelectElement from "@components/common/forms/SelectElement";
import Button from "@components/common/forms/Button";
import DateModal from "@components/common/forms/DateModal";
import Spacer from "@components/common/Spacer";

import Campaign from "@classes/Campaign";
import { createFormSelectOptions } from "@/lib/utils/formUtils";
import { TCampaignGame, TNewCampaignGame } from "@definitions/campaign";

export default function CampaignGameForm({
  campaign,
  reportGameMutation
}: {campaign: Campaign, reportGameMutation: UseMutationResult<TCampaignGame, Error, TNewCampaignGame, unknown>}) {

  const [winnerId, setWinnerId] = useState<string | null>(null);
  const [opponentId, setOpponentId] = useState<string | null>(null);
  const [missionPlayed, setMissionPlayed] = useState<string>('');
  const [twist, setTwist] = useState<string>('');
  const [rounds, setRounds] = useState<string>('');
  const [winnerScore, setWinnerScore] = useState<string>('');
  const [opponentScore, setOpponentScore] = useState<string>('');
  const [gameDate, setGameDate] = useState<dayjs.Dayjs>(dayjs());

  return (
    <View style={{display: 'flex', flexDirection: 'column', gap: 10, maxHeight: '100%', overflowY: 'auto'}}>
      <DateModal
        title="Select A Date"
        selectedDate={gameDate}
        setSelectedDate={setGameDate}
      />
      <SelectElement
        label="Winning Player"
        placeholder="Who won this game?"
        options={createFormSelectOptions([campaign.owner, ...campaign.members], { labelFunction: (member) => member.getFullName(), valueKey: 'id' })}
        value={winnerId}
        onSelectValue={setWinnerId}
      />
      <InputElement
        label="Winner's Score"
        keyboardType="numeric"
        value={winnerScore}
        onChangeText={setWinnerScore}
      />
      <SelectElement
        label="Opponent"
        placeholder="Who lost this game?"
        disabled={winnerId === null}
        options={createFormSelectOptions([campaign.owner, ...campaign.members].filter(member => member.id !== winnerId), { labelFunction: (member) => member.getFullName(), valueKey: 'id' })}
        value={opponentId}
        onSelectValue={setOpponentId}
      />
      <InputElement
        label="Opponent's Score"
        keyboardType="numeric"
        value={opponentScore}
        onChangeText={setOpponentScore}
      />
      <InputElement
        label="Mission Played"
        value={missionPlayed}
        onChangeText={setMissionPlayed}
      />
      <InputElement
        label="Twist (Optional)"
        value={twist}
        onChangeText={setTwist}
      />
      <InputElement
        label="Rounds Played"
        keyboardType="numeric"
        value={rounds}
        onChangeText={setRounds}
      />
      <Spacer size="sm" />
      <Button
        title="Report Game"
        disabled={reportGameMutation.isPending || (winnerId === null || opponentId === null || missionPlayed === '' || isNaN(Number(rounds)) || Number(rounds) < 1)}
        onPress={() => reportGameMutation.mutate({
          campaignId: campaign.id,
          gameDate: gameDate.toISOString(),
          winnerId: winnerId!,
          opponentId: opponentId!,
          missionPlayed,
          twist,
          rounds: Number(rounds),
          winnerScore: Number(winnerScore),
          opponentScore: Number(opponentScore)
        })}
      />
    </View>
  );
}
