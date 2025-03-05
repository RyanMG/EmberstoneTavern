import { View } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { TRegiment, TRoster } from "@definitions/roster";
import { TUnit, TNewUnit } from "@definitions/unit";
import { TCampaign } from "@definitions/campaign";

import Button from "@components/common/forms/Button";
import BodyText from "@components/common/BodyText";

import UnitManagmentModal, { TUnitManagmentDetails } from "@/components/rosters/managment/UnitManagementModal";
import { GenericHTTPResponse } from "@definitions/api";
import { saveNewRosterUnit } from "@api/unitApi";
import { useNotification } from "@context/NotificationContext";

export default function CreateGeneral({
  regimentId,
  rosterId,
  campaignId
}: {
  regimentId: TRegiment['id'];
  rosterId: TRoster['id'];
  campaignId: TCampaign['id'];
}) {

  const router = useRouter();
  const queryClient = useQueryClient();
  const { showNotification } = useNotification();

  const [unitManagmentDetails, setUnitManagmentDetails] = useState<TUnitManagmentDetails | null>(null);

  const saveUnitMutation = useMutation<GenericHTTPResponse<TUnit | string>, Error, TNewUnit>({
    mutationFn: (unitData: TNewUnit) => saveNewRosterUnit(rosterId, regimentId, {...unitData, isGeneral: true}),
    onSuccess: (data: GenericHTTPResponse<TUnit | string>) => {
      if (data.success) {
          router.replace(`/(tabs)/campaigns/${campaignId}/rosters/${rosterId}` as '/(tabs)/campaigns/[id]/rosters/[rosterId]');
          showNotification("General created successfully");

      } else {
        if (data.message === 'There is an existing general present for this campaign') {
          showNotification(data.message);
          queryClient.invalidateQueries({ queryKey: ['campaignRoster', {id: rosterId}] });

        } else {
          showNotification("Error creating general");
        }
      }
    },
    onError: (error) => {
      showNotification("Error creating general");
    }
  })

  return (
    <View style={{display: 'flex', flexDirection: 'column', gap: 15, marginTop: 10}}>
      <BodyText textSize="sm" italic={true}>Get started by creating a general to lead your army.</BodyText>
      <Button
        title="Create a General"
        onPress={() => {
          setUnitManagmentDetails({
            regimentId,
            unitNameLabel: "General Name",
            saveButtonLabel: "Add This General",
            unitTypePlaceHolder: "Select your general's unit type",
            unitPathPlaceHolder: "Select a Path for your general"
          });
        }}
      />
      <UnitManagmentModal
        title="Create a General"
        isGeneral={true}
        visible={!!unitManagmentDetails}
        closeModal={() => setUnitManagmentDetails(null)}
        unitManagmentDetails={unitManagmentDetails}
        createUnitMutation={saveUnitMutation}
      />
    </View>
  );
}