import { View, FlatList } from "react-native";
import { Link } from "expo-router";

import BodyText from "@/components/common/text/BodyText";

import Person from "@classes/Person";
import Campaign from "@classes/Campaign";

function MemberNameLink({
  member,
  campaignId
}: {
  member: Person
  campaignId: Campaign['id']
}) {

  return (
    <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10}}>

      <Link
        push
        href={{
          pathname: `/profile/${member.id}` as '/profile/[id]',
          params: { id: member.id, back: `/campaigns/${campaignId}` as '/campaigns/[id]' },
        }}
      >
        <BodyText textSize="md" bold={true} link={true}>{member.getFullName()}</BodyText>
      </Link>

      {member.hasRoster() && (
        <Link
          push
          href={{
            pathname: `/campaigns/${campaignId}/rosters/${member.roster!.id}` as '/campaigns/[id]/rosters/[rosterId]',
            params: { id: member.id, rosterId: member.roster!.id!, back: `/campaigns/${campaignId}` as '/campaigns/[id]' },
          }}
        >
          <BodyText textSize="md" italic={true}>"{member.roster!.name}"</BodyText>
        </Link>
      )}

      {!member.hasRoster() && (
        <BodyText textSize="md" italic={true}>No roster yet created</BodyText>
      )}
    </View>
  );
}

export default function CampaignMembers({
  campaign
}: {
  campaign: Campaign
}) {
  return (
    <View style={{display: 'flex', flexDirection: 'column', gap: 10}}>
      <View style={{display: 'flex', flexDirection: 'column', gap: 3}}>
        <BodyText textSize="md">Campaign owner:</BodyText>
        <MemberNameLink member={campaign.owner} campaignId={campaign.id} />
      </View>
      <View style={{display: 'flex', flexDirection: 'column', gap: 3}}>
        <BodyText textSize="md">Campaign members</BodyText>
        <FlatList
          data={campaign.members}
          renderItem={({ item }) => <MemberNameLink member={item} campaignId={campaign.id} />}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
}
