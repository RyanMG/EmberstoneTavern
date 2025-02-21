import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import AuthProvider, { useAuth } from '@context/AuthContext';
import NotificationProvider from '@context/NotificationContext';
import AppLoadingScreen from '@components/AppLoadingScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  QueryClientProvider,
  QueryClient
} from '@tanstack/react-query'
import { PaperProvider } from 'react-native-paper';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });
  const queryClient = new QueryClient()

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <PaperProvider>
        <QueryClientProvider client={queryClient}>
          <NotificationProvider>
            <AuthProvider>
              <RootLayoutNav />
            </AuthProvider>
          </NotificationProvider>
        </QueryClientProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

function RootLayoutNav() {
  const { loading } = useAuth();

  if (loading) return <AppLoadingScreen />;

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)/register" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
    </Stack>
  );
}
