import { ConvexProvider } from 'convex/react';
import { Stack } from 'expo-router';
import { getConvexClient } from '../convex/client';
import './../global.css';

const convex = getConvexClient();

export default function RootLayout() {
  return (
    <ConvexProvider client={convex}>
      <Stack />
    </ConvexProvider>
  );
}
