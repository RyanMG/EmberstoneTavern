import PageContainer from '@components/common/PageContainers';
import PageTitle from '@components/common/PageTitle';
import PageLoading from '@components/common/PageLoading';

import {View, Text} from 'react-native';

import {
  useQuery,
} from '@tanstack/react-query'

import { useAuth } from '@/lib/context/AuthContext';
import { Redirect } from 'expo-router';

export default function Campaigns() {
  const { authState } = useAuth();

  if (!authState?.authenticated) return <Redirect href="/" />

  return (
    <PageContainer>
      <PageTitle
        text="Campaigns"
      />
      <PageLoading />
    </PageContainer>
  );
}
