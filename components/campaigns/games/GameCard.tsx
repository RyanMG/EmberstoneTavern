import { Link } from "expo-router";
import { View } from "react-native";

import Card from "@components/common/Card";
import BodyText from "@/components/common/text/BodyText";
import IconButton from "@components/common/forms/IconButton";

import { TCampaignGame } from "@definitions/campaign";
import { formatDateForDisplay } from "@utils/dateUtils";

export default function GameCard({ game }: { game: TCampaignGame }) {
  return (
    <Card>
      <Link
        style={{display: 'flex', flexDirection: 'column', gap: 3, width: '100%', padding: 5}}
        href={`/campaigns/${game.campaignId}/games/${game.id}`}
      >
        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{display: 'flex', flexDirection: 'column'}}>
            <BodyText textSize="md" bold={true}>{game.winner!.getFullName()} vs {game.opponent!.getFullName()}</BodyText>
            <BodyText textSize="sm" italic={true}>{game.missionPlayed}</BodyText>
            <BodyText textSize="sm" italic={true}>Played on {formatDateForDisplay(game.gameDate)}</BodyText>
          </View>
        </View>
      </Link>
    </Card>
  );
}
