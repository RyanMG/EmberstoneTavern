import { StyleSheet, Text } from 'react-native';
import Colors from '@constants/Colors';

export default function FormErrorText({ errorText }: { errorText: string }) {
  return (
    <Text style={styles.errorText}>{errorText}</Text>
  );
}

const styles = StyleSheet.create({
  errorText: {
    color: Colors.TEXT.ERROR,
    fontStyle: 'italic',
    fontSize: 12,
    marginTop: 5
  }
});