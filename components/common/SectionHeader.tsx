import { Text, View, StyleSheet } from 'react-native';
import Colors from '@/lib/constants/colors';
import { Button } from 'react-native-paper'

export default function SectionHeader({
  text,
  headerButtonAction,
  headerButtonLabel
}: {
  text: string
  headerButtonAction?: () => void
  headerButtonLabel?: string
}) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>{text}</Text>
      {headerButtonAction && (
        <Button onPress={headerButtonAction} mode="text" rippleColor="transparent" textColor={Colors.TEXT.GREEN}>{headerButtonLabel}</Button>
      )}
    </View>

  );
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER.DARKEN50,
    marginTop: 3,
    marginBottom: 10,
    paddingBottom: 3
  },
  text:{
    fontSize: 18,
    color: Colors.TEXT.DARKEN50,
    fontWeight: 'bold',
  }
})
