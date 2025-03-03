import { View, StyleSheet } from "react-native";
import COLORS from "@constants/colors";
import BodyText from "@components/common/BodyText";

export default function NoResultsBox({
  text
}: {
  text: string
}) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.box}>
        <BodyText textSize="sm" center={true}>{text}</BodyText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 10,
    marginBottom: 10
  },
  box: {
    borderWidth: 1,
    borderColor: COLORS.BORDER.BASE,
    borderRadius: 5,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10
  }
})
