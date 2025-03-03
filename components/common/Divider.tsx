import {StyleSheet, View} from 'react-native';
import COLORS from '@constants/colors';

export default function Divider() {
  return (
    <View style={styles.divider} />
  );
}

const styles = StyleSheet.create({
  divider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.BORDER.DARKEN,
    marginVertical: 10,
    width: '100%'
  }
})
