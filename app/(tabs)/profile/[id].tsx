
import { useLocalSearchParams } from 'expo-router';

import PageContainer from '@components/common/PageContainers';
import PageTitle from '@components/common/PageTitle';
import CommonUserProfileDetails from '@components/profile/CommonUserProfileDetails';
import PageLoading from '@components/common/PageLoading';

import { TPerson } from '@definitions/person';
import { useQuery } from '@tanstack/react-query';
import { fetchPerson } from '@api/personApi';
import { useNotification } from '@context/NotificationContext';

export default function ProfilePage() {
  const {
    id,
    back
  }: {
    id: string,
    back?: '/campaigns' | '/campaigns/[id]'
  } = useLocalSearchParams();

  const { isPending, error, data } = useQuery<TPerson>({
    queryKey: ['person'],
    queryFn: () => fetchPerson(id!),
  })
  const { showNotification } = useNotification();

  if (isPending) return <PageLoading />
  if (error) {
    showNotification(error.message);
    return null;
  }

  return (
    <PageContainer>
      <PageTitle
        text="Profile"
        back={back}
      />
      <CommonUserProfileDetails user={data} />
    </PageContainer>
  );
}
