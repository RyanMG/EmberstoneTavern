import { View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { Redirect, useLocalSearchParams, useRouter } from "expo-router";

import PageContainer from "@components/common/PageContainers";
import PendingScreen from "@components/common/PendingScreen";
import BodyText from "@components/common/text/BodyText";
import Spacer from "@components/common/Spacer";
import Divider from "@components/common/Divider";
import IconButton from "@components/common/forms/IconButton";

import { TCampaignGame } from "@definitions/campaign";
import { fetchGame } from "@api/gameApi";
import { useNotification } from "@context/NotificationContext";
import { useAuth } from "@context/AuthContext";
import { formatDateForDisplay } from "@utils/dateUtils";
import COLORS from "@constants/colors";
import React from "react";

function DataRow({
  label,
  value
}: {
  label: string;
  value: string;
}) {
  return (
    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
      <BodyText italic={true} textSize="lg">{label}:</BodyText>
      <BodyText bold={true} textSize="lg">{value === "" ? "-" : value}</BodyText>
    </View>
  );
}

export default function GameDetails() {
  const { id: campaignId, gameId } = useLocalSearchParams<{ id: string, gameId: string }>();
  const { showNotification } = useNotification();
  const { authState } = useAuth();
  const router = useRouter();

  const { isPending, error, data: game } = useQuery<TCampaignGame>({
    queryKey: ['campaignGame', {id: campaignId, gameId}],
    queryFn: () => fetchGame(campaignId!, gameId!),
  })

  if (isPending) return <PendingScreen />;

  if (error) {
    showNotification(error.message);
    return <Redirect href="/campaigns/[id]/games" />
  }

  const {
    gameDate,
    winner,
    opponent,
    missionPlayed,
    twist,
    rounds,
    winnerScore,
    opponentScore,
    story
  } = game;

  return (
    <PageContainer>
      <View style={{display: 'flex', flexDirection: 'column', flex: 1, width: '100%', justifyContent: 'space-between'}}>
        <View style={{display: 'flex', flex: 1, flexDirection: 'column', width: '100%', gap: 10}}>
          <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: 10}}>
            <BodyText bold={true} textSize="2xl">{missionPlayed}</BodyText>
            {(authState.activeUser?.isSameAs(winner!.id) || authState.activeUser?.isSameAs(opponent!.id)) && (
              <IconButton iconName="pencil" onPress={() => {
                router.push(`/campaigns/${campaignId}/games/${gameId}/edit`);
              }} />
            )}
          </View>


          <DataRow label="Winner" value={winner!.getFullName()} />
          <DataRow label="Opponent" value={opponent!.getFullName()} />
          <DataRow label="Final Score" value={`${winnerScore}vp to ${opponentScore}vp`} />
          <DataRow label="Game Date" value={formatDateForDisplay(gameDate)} />
          <DataRow label="Twist" value={twist} />
          <DataRow label="Rounds Played" value={rounds.toString()} />
          <Spacer />

          <View style={{display: 'flex', flexDirection: 'column', width: '100%', borderWidth: 1, borderColor: COLORS.BORDER.BASE, borderRadius: 5, paddingHorizontal: 10, paddingTop: 5, paddingBottom: 10}}>
            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: 10}}>
              <BodyText bold={true} center={true} textSize="xl">Story</BodyText>
              {(authState.activeUser?.isSameAs(winner!.id) || authState.activeUser?.isSameAs(opponent!.id)) && (
                <IconButton iconName="pencil" onPress={() => {
                  router.push(`/campaigns/${campaignId}/games/${gameId}/edit`);
                }} />
              )}
            </View>

            <Divider />
            <View style={{paddingVertical: 10}}>
              {(story === "" || story === null) && <BodyText center={true} italic={true} textSize="sm">This historical document is currently blank</BodyText>}
              {story !== "" && <BodyText textSize="sm">{story}</BodyText>}
            </View>

          </View>
        </View>
      </View>

    </PageContainer>
  );
}
