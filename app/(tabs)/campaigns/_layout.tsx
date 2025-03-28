import { useAuth } from '@/lib/context/AuthContext';
import { Redirect, Stack } from 'expo-router';
import { pageHeaderOptions } from '@/lib/expoConfig';

export default function Campaigns() {
  const { authState } = useAuth();

  if (!authState?.authenticated) return <Redirect href="/" />


  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }}/>
      <Stack.Screen name="[id]/index" options={{
        ...pageHeaderOptions,
        title: 'Campaign'
      }}/>
      <Stack.Screen name="[id]/edit" options={{
        ...pageHeaderOptions,
        title: 'Edit Campaign'
      }}/>
      <Stack.Screen name="new/index" options={{
        ...pageHeaderOptions,
        title: 'Create New Campaign'
      }}/>
      <Stack.Screen name="[id]/rosters/index" options={{
        ...pageHeaderOptions,
        title: 'All rosters for campaign'
      }}/>
      <Stack.Screen name="[id]/rosters/new" options={{
        ...pageHeaderOptions,
        title: 'Create New Roster'
      }}/>
      <Stack.Screen name="[id]/rosters/[rosterId]/index" options={{
        ...pageHeaderOptions,
        title: 'Roster Details Page'
      }}/>
      <Stack.Screen name="[id]/rosters/[rosterId]/edit" options={{
        ...pageHeaderOptions,
        title: 'Edit Roster Details'
      }}/>

      <Stack.Screen name="[id]/games/new" options={{
        ...pageHeaderOptions,
        title: 'Report Game'
      }}/>
      <Stack.Screen name="[id]/games/index" options={{
        ...pageHeaderOptions,
        title: 'Games Played'
      }}/>
      <Stack.Screen name="[id]/games/[gameId]/index" options={{
        ...pageHeaderOptions,
        title: 'Game Details'
      }}/>
      <Stack.Screen name="[id]/games/[gameId]/edit" options={{
        ...pageHeaderOptions,
        title: 'Edit Game Details'
      }}/>
    </Stack>
  );
}
