import { StyleSheet, Text } from 'react-native';
import PageContainer from '@components/common/PageContainers';

export default function Campaigns() {
  return (
    <PageContainer>
      <Text style={styles.title}>Campaigns</Text>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});
