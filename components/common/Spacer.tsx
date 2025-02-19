import {StyleSheet, View} from 'react-native';
export default function Spacer({
  size = 'md'
}: {
  size?: 'sm' | 'md' | 'lg';
}) {
  return (
    <View style={[
      styles.spacer,
      styles[size as keyof typeof styles]
    ]} />
  );
}

const styles = StyleSheet.create({
  spacer: {
    width: '100%'
  },
  sm: {
    height: 10
  },
  md: {
    height: 20
  },
  lg: {
    height: 30
  }
})
