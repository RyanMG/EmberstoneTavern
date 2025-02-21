import { TCampaign } from "@definitions/campaign";
import { View, Text, StyleSheet } from "react-native";
import Colors from "@constants/Colors";

import CampaignIcon from './CampaignIcon';

export default function CampaignCard({
  campaign
}: {
  campaign: TCampaign;
}) {
  return (
    <View style={styles.cardContainer}>
      <CampaignIcon iconLink={campaign.iconLink} />
      <View style={{display: 'flex', flexDirection: 'column', flex: 10, justifyContent: 'center', alignItems: 'center'}}>
        <Text>{campaign.title}</Text>
        <Text>{campaign.description}</Text>
      </View>
    </View>
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
