import { Text } from 'react-native';
import Colors from '@constants/Colors';

export default function SectionHeader({ text }: { text: string }) {
  return (
    <Text style={{fontSize: 18, color: Colors.TEXT.DARKEN50, fontWeight: 'bold', paddingTop: 3, paddingBottom: 10}}>{text}</Text>
  );
}
