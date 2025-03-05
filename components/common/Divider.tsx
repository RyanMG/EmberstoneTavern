import {StyleSheet, View} from 'react-native';
import COLORS from '@constants/colors';

export default function Divider({
  size = 'md'
}: {
  size?: 'sm' | 'md' | 'lg';
}
) {
  return (
    <View style={[
      styles.divider,
      styles[size as keyof typeof styles]
    ]} />
  );
}

const styles = StyleSheet.create({
  divider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.BORDER.DARKEN,
    width: '100%'
  },
  sm: {
    marginVertical: 5
  },
  md: {
    marginVertical: 10
  },
  lg: {
    marginVertical: 15
  }
})
