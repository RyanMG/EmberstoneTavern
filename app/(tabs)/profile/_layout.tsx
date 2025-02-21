import { useAuth } from '@/lib/context/AuthContext';
import { Redirect, Stack } from 'expo-router';

export default function Profile() {
  const { authState } = useAuth();

  if (!authState?.authenticated) return <Redirect href="/" />

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }}/>
      <Stack.Screen name="[id]" options={{ headerShown: false }}/>
    </Stack>
  );
}
