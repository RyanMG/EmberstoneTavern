import { View } from "react-native";

import BodyText from "@/components/common/BodyText";

import Roster from "@classes/Roster";
import NoResultsBox from "../common/NoResultsBox";

export default function RosterViewOnly({
  rosterData
}: {
  rosterData: Roster
}) {
  return (
    <View>
      {rosterData.general === null && (
        <NoResultsBox text="This roster has not yet been started" />
      )}
      {rosterData.general !== null && (
        <BodyText textSize="lg" bold={true}>{rosterData.general?.unitName}</BodyText>
      )}
    </View>
  );
}
