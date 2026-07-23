import { ConvexAuthProvider } from '@convex-dev/auth/react';
import { Stack } from 'expo-router';
import { getConvexClient } from '../convex/client';
import * as SecureStore from 'expo-secure-store';
import './../global.css';

const convex = getConvexClient();

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
      <Stack />
    </ConvexAuthProvider>
  );
}
