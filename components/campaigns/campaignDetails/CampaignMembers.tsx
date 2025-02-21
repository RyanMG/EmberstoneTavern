import { View, FlatList } from "react-native";
import { Link } from "expo-router";

import BodyText from "@components/common/BodyText";

import { TPerson } from "@definitions/person";
import { TCampaign } from "@definitions/campaign";

function MemberNameLink({
  member,
 campaignId
}: {
  member: TPerson
  campaignId: TCampaign['id']
}) {
  return (
    <Link
      push
      href={{
        pathname: `/profile/${member.id}` as '/profile/[id]',
        params: { id: member.id, back: `/campaigns/${campaignId}` as '/campaigns/[id]' },
      }}
    >
      <BodyText textSize="md" bold={true} link={true}>{member.firstName} {member.lastName}</BodyText>
    </Link>
  );
}

export default function CampaignMembers({
  campaign
}: {
  campaign: TCampaign
}) {
  return (
    <View style={{display: 'flex', flexDirection: 'column', gap: 10}}>
      <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: 10}}>
        <BodyText textSize="md">Campaign owner:</BodyText>
        <MemberNameLink member={campaign.owner} campaignId={campaign.id} />
      </View>
      <BodyText textSize="md">Campaign members</BodyText>
      <FlatList
        data={campaign.members}
        renderItem={({ item }) => <MemberNameLink member={item} campaignId={campaign.id} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
}
