import { StyleSheet, Text } from 'react-native';
import PageContainer from '@components/common/PageContainers';
import PageTitle from '@components/common/PageTitle';

export default function Campaigns() {
  return (
    <PageContainer>
      <PageTitle
        text="Campaigns"
      />
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});
