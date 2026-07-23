import { ConvexReactClient } from "convex/react";
import * as SecureStore from "expo-secure-store";

export function getConvexClient() {
  const url = process.env.EXPO_PUBLIC_CONVEX_URL;
  if (!url) {
    throw new Error(
      "Missing EXPO_PUBLIC_CONVEX_URL. Run `npx convex dev` to start your backend."
    );
  }
  return new ConvexReactClient(url, {
    unsavedChangesWarning: false,
    auth: {
      storage: {
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
      },
    },
  });
}

export const convex = getConvexClient();
