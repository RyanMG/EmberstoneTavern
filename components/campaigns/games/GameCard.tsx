import { Link } from "expo-router";

import Card from "@components/common/Card";
import BodyText from "@components/common/BodyText";

import { TCampaignGame } from "@definitions/campaign";
import { formatDateForDisplay } from "@utils/dateUtils";

export default function GameCard({ game }: { game: TCampaignGame }) {
  return (
    <Card>
      <Link
        style={{display: 'flex', flexDirection: 'column', gap: 3, width: '100%', padding: 5}}
        href={`/campaigns/${game.campaignId}/games/${game.id}`}
      >
        <BodyText textSize="md" bold={true}>{game.winner.getFullName()} vs {game.opponent.getFullName()}</BodyText>
        <BodyText textSize="sm" italic={true}>{game.missionPlayed}</BodyText>
        <BodyText textSize="sm" italic={true}>Played on {formatDateForDisplay(game.gameDate)}</BodyText>
      </Link>
    </Card>
  );
}
