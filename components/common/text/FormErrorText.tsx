import { StyleSheet, Text } from 'react-native';
import COLORS from '@constants/colors';

export default function FormErrorText({ errorText }: { errorText: string }) {
  return (
    <Text style={styles.errorText}>{errorText}</Text>
  );
}

const styles = StyleSheet.create({
  errorText: {
    color: COLORS.TEXT.ERROR,
    fontStyle: 'italic',
    fontSize: 12,
    marginTop: 5
  }
});