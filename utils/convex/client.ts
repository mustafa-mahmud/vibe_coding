import { ConvexReactClient } from "convex/react";
import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";

export function getConvexClient() {
  const envUrl = process.env.EXPO_PUBLIC_CONVEX_URL;
  const manifestUrl =
    Constants?.expoConfig?.extra?.EXPO_PUBLIC_CONVEX_URL ??
    Constants?.manifest?.extra?.EXPO_PUBLIC_CONVEX_URL;
  const url = envUrl ?? manifestUrl;
  if (!url) {
    throw new Error(
      "Missing EXPO_PUBLIC_CONVEX_URL. Ensure it is set in .env.local or app.json extra.",
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
