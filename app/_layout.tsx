import { useConvexAuth, ConvexAuthProvider } from '@convex-dev/auth/react';
import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { getConvexClient } from '../convex/client';
import * as SecureStore from 'expo-secure-store';
import { ActivityIndicator, View } from 'react-native';
import './../global.css';

const convex = getConvexClient();

function RootNavigator() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/sign-in');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <ConvexAuthProvider
      client={convex}
      storage={{
        getItem: async (key) => {
          const value = await SecureStore.getItemAsync(key);
          return value ?? null;
        },
        setItem: async (key, value) => {
          await SecureStore.setItemAsync(key, value);
        },
        removeItem: async (key) => {
          await SecureStore.deleteItemAsync(key);
        },
      }}
      replaceURL={() => {}}
    >
      <RootNavigator />
    </ConvexAuthProvider>
  );
}
