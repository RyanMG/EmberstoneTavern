import { View, StyleSheet } from 'react-native';
import Colors from '@constants/Colors';
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
    backgroundColor: Colors.BACKGROUND.BASE
  },
})