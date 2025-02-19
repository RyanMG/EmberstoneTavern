import {StyleSheet, View} from 'react-native';
import Colors from '@/constants/Colors';

export default function Divider() {
  return (
    <View style={styles.divider} />
  );
}

const styles = StyleSheet.create({
  divider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.BORDER.DARKEN,
    marginVertical: 20,
    width: '100%'
  }
})
