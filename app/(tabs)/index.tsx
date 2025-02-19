import { StyleSheet, Text, View } from 'react-native';
import PageContainer from '@components/common/PageContainers';

export default function Tavern() {
  return (
    <PageContainer>
      <Text style={styles.title}>Tavern</Text>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});
