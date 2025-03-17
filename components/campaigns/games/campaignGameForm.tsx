import { View } from "react-native";
import { useState } from "react";
import { UseMutationResult } from "@tanstack/react-query";

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

  const [winner, setWinner] = useState<string | null>(null);
  const [opponent, setOpponent] = useState<string | null>(null);
  const [missionPlayed, setMissionPlayed] = useState<string>('');
  const [twist, setTwist] = useState<string>('');
  const [rounds, setRounds] = useState<string>('0');
  const [winnerScore, setWinnerScore] = useState<string>('0');
  const [opponentScore, setOpponentScore] = useState<string>('0');
  const [gameDate, setGameDate] = useState<Date>(new Date());

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
        value={winner}
        onSelectValue={setWinner}
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
        disabled={winner === null}
        options={createFormSelectOptions([campaign.owner, ...campaign.members].filter(member => member.id !== winner), { labelFunction: (member) => member.getFullName(), valueKey: 'id' })}
        value={opponent}
        onSelectValue={setOpponent}
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
        disabled={reportGameMutation.isPending || (winner === null || opponent === null || missionPlayed === '' || isNaN(Number(rounds)) || Number(rounds) < 1)}
        onPress={() => reportGameMutation.mutate({
          campaignId: campaign.id,
          gameDate: gameDate.toISOString(),
          winner: winner!,
          opponent: opponent!,
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
