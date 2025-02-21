import CampaignIcon from "@components/campaigns/CampaignIcon";
import BodyText from "@components/common/BodyText";

import { TCampaign } from "@definitions/campaign";

import { View, StyleSheet } from "react-native";

export default function CampaignDetailsMain({
  campaign
}: {
  campaign: TCampaign
}) {
  return (
    <View style={styles.mainDetails}>
      <CampaignIcon iconLink={campaign.iconLink} />
      <View style={{display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', padding: 15}}>
        <BodyText textSize="xl" bold={true}>{campaign.title}</BodyText>
        <BodyText textSize="md" italic={true}>{campaign.description}</BodyText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainDetails: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    width: '100%'
  }
});
