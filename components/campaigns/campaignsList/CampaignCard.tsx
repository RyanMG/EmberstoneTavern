import { TCampaign } from "@definitions/campaign";
import { View } from "react-native";

import Card from '@components/common/Card'
import CampaignIcon from '../CampaignIcon';
import { Link } from "expo-router";
import BodyText from "@/components/common/text/BodyText";

export default function CampaignCard({
  campaign
}: {
  campaign: TCampaign;
}) {
  return (
    <Link
      push
      href={`/campaigns/${campaign.id}`}
    >
      <Card>
        <CampaignIcon iconLink={campaign.iconLink} />
        <View style={{display: 'flex', flexDirection: 'column', flex: 10, justifyContent: 'flex-start', alignItems: 'flex-start', padding: 15}}>
          <BodyText textSize="lg" bold={true}>{campaign.title}</BodyText>
        </View>
      </Card>
    </Link>
  );
}
