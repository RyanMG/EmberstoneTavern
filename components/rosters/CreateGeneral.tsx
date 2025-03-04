import { View } from "react-native";
import { useState } from "react";

import { TRegiment, TRoster } from "@definitions/roster";
import { TCampaign } from "@definitions/campaign";

import Button from "@components/common/forms/Button";
import BodyText from "@components/common/BodyText";
import UnitManagmentModal from "./UnitManagmentModal";

export default function CreateGeneral({
  regimentId,
  rosterId,
  campaignId
}: {
  regimentId: TRegiment['id'];
  rosterId: TRoster['id'];
  campaignId: TCampaign['id'];
}) {

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <View style={{display: 'flex', flexDirection: 'column', gap: 15, marginTop: 10}}>
      <BodyText textSize="sm" italic={true}>Get started by creating a general to lead your army.</BodyText>
      <Button
        title="Create a General"
        onPress={() => {
          setModalVisible(true);
        }}
      />
      <UnitManagmentModal
        title="Create a General"
        visible={modalVisible}
        setModalVisible={setModalVisible}
        regimentId={regimentId}
        rosterId={rosterId}
        successActions={{
          routeOnSuccess: `/(tabs)/campaigns/${campaignId}/rosters/${rosterId}` as '/(tabs)/campaigns/[id]/rosters/[rosterId]',
          onSuccessMessage: "General created successfully"
        }}
        failureActions={{
          onFailureMessage: "Error creating general"
        }}
      />
    </View>
  );
}