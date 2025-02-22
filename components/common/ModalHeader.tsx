import { StyleSheet, Text } from 'react-native';
import Colors from '@/lib/constants/Colors';

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
    color: Colors.TEXT.GREEN,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 24,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER.GREEN,
    paddingBottom: 4,
  }
});