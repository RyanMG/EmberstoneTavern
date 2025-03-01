import { TCampaign } from "@definitions/campaign";
import { View, StyleSheet } from "react-native";
import COLORS from "@constants/colors";

import CampaignIcon from '../CampaignIcon';
import { Link } from "expo-router";
import BodyText from "@components/common/BodyText";

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
      <View style={styles.cardContainer}>
        <CampaignIcon iconLink={campaign.iconLink} />
        <View style={{display: 'flex', flexDirection: 'column', flex: 10, justifyContent: 'flex-start', alignItems: 'flex-start', padding: 15}}>
          <BodyText textSize="lg" bold={true}>{campaign.title}</BodyText>
        </View>
      </View>
    </Link>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
    height: 60,
    backgroundColor: COLORS.BACKGROUND.BROWN,
    borderColor: COLORS.BORDER.DARKEN,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15
  }
});
