import { View } from "react-native";
import { useState } from "react";

import { TRegiment } from "@definitions/roster";

import Button from "@components/common/forms/Button";
import BodyText from "@components/common/BodyText";
import UnitManagmentModal from "./UnitManagmentModal";

export default function CreateGeneral({
  regimentId
}: {
  regimentId: TRegiment['id'];
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
      />
    </View>
  );
}