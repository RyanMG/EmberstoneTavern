import { View, StyleSheet } from "react-native";
import Colors from "@constants/Colors";
import BodyText from "@components/common/BodyText";

export default function NoResultsBox({
  text
}: {
  text: string
}) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.box}>
        <BodyText>{text}</BodyText>
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
    borderColor: Colors.BORDER.BASE,
    borderRadius: 5,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10
  }
})
