import { View } from "react-native";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import DateTimePicker, { DateType } from 'react-native-ui-datepicker';

import ModalWrapper from "@components/common/ModalWrapper";
import InputElement from "@components/common/forms/InputElement";
import SelectElement from "@components/common/forms/SelectElement";
import Button from "@components/common/forms/Button";
import Spacer from "@components/common/Spacer";

import { reportGame } from "@api/gameApi";
import Campaign from "@classes/Campaign";
import { createFormSelectOptions } from "@/lib/utils/formUtils";

export default function ReportGameModal({
  visible,
  setModalVisible,
  campaign
}: {
  visible: boolean;
  setModalVisible: (visible: boolean) => void;
  campaign: Campaign;
}) {

  const [winner, setWinner] = useState<string | null>(null);
  const [opponent, setOpponent] = useState<string | null>(null);
  const [missionPlayed, setMissionPlayed] = useState<string>('');
  const [twist, setTwist] = useState<string>('');
  const [rounds, setRounds] = useState<string>('0');
  const [winnerScore, setWinnerScore] = useState<string>('0');
  const [opponentScore, setOpponentScore] = useState<string>('0');
  const [gameDate, setGameDate] = useState<Date>(new Date());

  const reportGameMutation = useMutation({
    mutationFn: () => reportGame({
      campaignId: campaign.id,
      gameDate: gameDate.toISOString(),
      winner: winner!,
      opponent: opponent!,
      missionPlayed,
      twist,
      rounds: Number(rounds),
      winnerScore: Number(winnerScore),
      opponentScore: Number(opponentScore)
    }),
    onSuccess: () => {
      // @TODO
      setModalVisible(false);
    }
  });


  return (
    <ModalWrapper visible={visible} closeModal={() => setModalVisible(false)} title="Report A Game">
      <View style={{display: 'flex', flexDirection: 'column', gap: 10, maxHeight: '100%', overflow: 'auto'}}>
        <DateTimePicker
          mode="single"
          date={gameDate}
          onChange={({date}: {date: DateType}) => {
            if (!date) return;
            if (date instanceof Date) {
              setGameDate(date);
            } else {
              // @ts-ignore
              setGameDate(new Date(date));
            }
          }}
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
          onPress={() => reportGameMutation.mutate()}
        />
      </View>
    </ModalWrapper>
  );
}
