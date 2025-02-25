import { useAuth } from '@/lib/context/AuthContext';
import { Redirect, Stack } from 'expo-router';

export default function Campaigns() {
  const { authState } = useAuth();

  if (!authState?.authenticated) return <Redirect href="/" />

  return (
    <Stack screenOptions={{ headerShown: false }} >
      <Stack.Screen name="index" />
    </Stack>
  );
}
