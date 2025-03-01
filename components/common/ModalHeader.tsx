import { StyleSheet, Text } from 'react-native';
import COLORS from '@constants/colors';

export default function ModalHeader({
  text
}: {
  text: string
}) {
  return (
    <Text style={styles.modalHeader}>
      {text}
    </Text>
  );
}

const styles = StyleSheet.create({
  modalHeader: {
    color: COLORS.TEXT.GREEN,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 24,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER.GREEN,
    paddingBottom: 4,
  }
});