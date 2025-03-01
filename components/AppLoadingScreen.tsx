import { View, StyleSheet } from 'react-native';
import COLORS from '@constants/colors';
import PageLoading from './common/PageLoading';

export default function AppLoadingScreen() {
  return (
    <View style={styles.container}>
      <PageLoading />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    padding: 20,
    backgroundColor: COLORS.BACKGROUND.BASE
  },
})