import { View, StyleSheet } from 'react-native';
import BodyText from './common/BodyText';

export default function AppLoadingScreen() {
  return (
    <View style={styles.container}>
      <BodyText>Loading...</BodyText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})