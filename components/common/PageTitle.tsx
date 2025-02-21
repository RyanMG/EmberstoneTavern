import { StyleSheet, Text } from 'react-native';
import Colors from '@/lib/constants/Colors';

export default function PageTitle({ text }: { text: string }) {
  return (
    <Text style={styles.title}>{text}</Text>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'left',
    width: '100%',
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.TEXT.BASE,
    paddingBottom: 10,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER.BASE
  }
});
