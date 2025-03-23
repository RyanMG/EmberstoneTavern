import { View } from "react-native";
import { useState } from "react";
import dayjs from 'dayjs';

import InputElement from "@components/common/forms/InputElement";
import SelectElement from "@components/common/forms/SelectElement";
import Button from "@components/common/forms/Button";
import DateModal from "@components/common/forms/DateModal";
import Spacer from "@components/common/Spacer";

import Campaign from "@classes/Campaign";
import { createFormSelectOptions } from "@/lib/utils/formUtils";
import { TNewCampaignGame, TCampaignGame } from "@definitions/campaign";

interface ICampaignGameFormProps {
  campaign: Campaign;
  saveGame: (game: TNewCampaignGame) => void;
  game?: TCampaignGame;
  savePending: boolean;
  buttonTitle: string;
}

export default function CampaignGameForm({
  campaign,
  saveGame,
  game,
  savePending,
  buttonTitle
}: ICampaignGameFormProps) {

  const [winnerId, setWinnerId] = useState<string | null>(game?.winnerId || null);
  const [opponentId, setOpponentId] = useState<string | null>(game?.opponentId || null);
  const [missionPlayed, setMissionPlayed] = useState<string>(game?.missionPlayed || '');
  const [twist, setTwist] = useState<string>(game?.twist || '');
  const [rounds, setRounds] = useState<string>(game?.rounds?.toString() || '');
  const [winnerScore, setWinnerScore] = useState<string>(game?.winnerScore?.toString() || '');
  const [opponentScore, setOpponentScore] = useState<string>(game?.opponentScore?.toString() || '');
  const [gameDate, setGameDate] = useState<dayjs.Dayjs>(game?.gameDate ? dayjs(game.gameDate) : dayjs());

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
        title={buttonTitle}
        disabled={savePending || (winnerId === null || opponentId === null || missionPlayed === '' || isNaN(Number(rounds)) || Number(rounds) < 1)}
        onPress={() => saveGame({
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
