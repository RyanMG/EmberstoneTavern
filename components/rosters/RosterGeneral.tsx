import { View } from "react-native";

import Card from "@components/common/Card";
import BodyText from "@components/common/BodyText";
import IconButton from "@components/common/forms/IconButton";
import Spacer from "@components/common/Spacer";

import Unit from "@classes/Unit";

export default function RosterGeneral({ general }: { general: Unit }) {
  return (
    <Card>
      <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: 10, width: '100%'}}>
        <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
          <View style={{display: 'flex', flexDirection: 'row', alignItems: 'baseline', gap: 8}}>
            <BodyText>Currently led by</BodyText>
            <BodyText bold={true}>{general.unitName}</BodyText>
            <BodyText textSize="sm" italic={true}>- {general.warscrollName}</BodyText>
          </View>
          <Spacer size="sm" />
          <View style={{display: 'flex', flexDirection: 'row', alignItems: 'baseline', gap: 8}}>
            <BodyText>General's Path:</BodyText>
            <BodyText bold={true}>{general.path?.name}</BodyText>
            <BodyText textSize="sm" italic={true}>- Rank {general.pathRank}</BodyText>
          </View>
        </View>

        <View style={{display: 'flex', flexDirection: 'column'}}>
          <IconButton
            iconName="pencil"
            iconSize={24}
            theme="white"
            onPress={() => {
              console.log("TODO: edit general")
            }}
          />
        </View>

      </View>
    </Card>
  );
}
