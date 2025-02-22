import { TCampaign } from "@definitions/campaign";
import { View, StyleSheet } from "react-native";
import Colors from "@constants/Colors";

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
          <BodyText textSize="lg">{campaign.title}</BodyText>
          <BodyText textSize="sm" italic={true}>{campaign.description}</BodyText>
        </View>
      </View>
    </Link>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
    height: 75,
    backgroundColor: Colors.BACKGROUND.BROWN,
    borderColor: Colors.BORDER.DARKEN,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
