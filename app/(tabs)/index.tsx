import PageContainer from '@components/common/PageContainers';
import PageTitle from '@components/common/PageTitle';
import { Text } from 'react-native';

const API_ROOT = process.env.EXPO_PUBLIC_API_ROOT_URL;

export default function Tavern() {
  return (
    <PageContainer>
      <PageTitle
        text="The Emberstone Tavern"
      />
      <Text>{API_ROOT}</Text>
    </PageContainer>
  );
}
