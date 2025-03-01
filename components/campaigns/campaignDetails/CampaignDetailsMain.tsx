import CampaignIcon from "@components/campaigns/CampaignIcon";
import BodyText from "@components/common/BodyText";

import Campaign from "@classes/Campaign";

import { View, StyleSheet } from "react-native";

export default function CampaignDetailsMain({
  campaign
}: {
  campaign: Campaign
}) {
  return (
    <>
      <View style={styles.mainDetails}>
        <CampaignIcon iconLink={campaign.iconLink} />
        <View style={{display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', paddingLeft: 15}}>
          <BodyText textSize="xl" bold={true}>{campaign.title}</BodyText>
          <BodyText textSize="md" italic={true}>Set in: {campaign.campaignSetting?.name}</BodyText>
        </View>
      </View>
      <BodyText textSize="md" italic={true}>{campaign.description}</BodyText>
    </>

  );
}

const styles = StyleSheet.create({
  mainDetails: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    marginBottom: 10,
    width: '100%'
  }
});
