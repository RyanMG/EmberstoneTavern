import { View } from "react-native";
import { useState } from "react";

import { TRegiment, TRoster } from "@definitions/roster";
import { TCampaign } from "@definitions/campaign";

import Button from "@components/common/forms/Button";
import BodyText from "@components/common/BodyText";
import UnitManagmentModal, { TUnitManagmentDetails } from "@/components/rosters/managment/UnitManagementModal";

export default function CreateGeneral({
  regimentId,
  rosterId,
  campaignId
}: {
  regimentId: TRegiment['id'];
  rosterId: TRoster['id'];
  campaignId: TCampaign['id'];
}) {

  const [unitManagmentDetails, setUnitManagmentDetails] = useState<TUnitManagmentDetails | null>(null);

  return (
    <View style={{display: 'flex', flexDirection: 'column', gap: 15, marginTop: 10}}>
      <BodyText textSize="sm" italic={true}>Get started by creating a general to lead your army.</BodyText>
      <Button
        title="Create a General"
        onPress={() => {
          setUnitManagmentDetails({
            regimentId,
            rosterId,
            unitNameLabel: "General Name",
            saveButtonLabel: "Add This General",
            unitTypePlaceHolder: "Select your general's unit type",
            unitPathPlaceHolder: "Select a Path for your general"
          });
        }}
      />
      <UnitManagmentModal
        title="Create a General"
        visible={!!unitManagmentDetails}
        closeModal={() => setUnitManagmentDetails(null)}
        unitManagmentDetails={unitManagmentDetails}
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