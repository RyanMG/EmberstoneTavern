import { View, StyleSheet } from 'react-native';
import BodyText from './common/BodyText';
import PageContainer from './common/PageContainers';

export default function AppLoadingScreen() {
  return (
    <PageContainer>
      <View style={styles.container}>
        <BodyText>Loading...</BodyText>
      </View>
    </PageContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})