import { useAuth } from '@/lib/context/AuthContext';
import { Redirect, Stack, ScreenProps } from 'expo-router';
import Colors from '@/lib/constants/colors';

export default function Campaigns() {
  const { authState } = useAuth();

  if (!authState?.authenticated) return <Redirect href="/" />
  const pageHeaderOptions: ScreenProps['options'] = {
    headerStyle: {
      backgroundColor: Colors.BACKGROUND.BROWN,
      height: 45,
      borderBottomColor: Colors.BORDER.DARKEN50,
      borderBottomWidth: 1
    },
    headerTintColor: Colors.TEXT.BASE,
    headerTitleAlign: 'center',
    headerTitleStyle: {
      textAlign: 'center',
      fontWeight: 'bold',
      color: Colors.TEXT.DARKEN20
    },
  };

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
      <Stack.Screen name="[id]/rosters/[id]" options={{
        ...pageHeaderOptions,
        title: 'Roster details page'
      }}/>
    </Stack>
  );
}
