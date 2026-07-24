import { useAuthActions } from '@convex-dev/auth/react';
import { useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';

export default function HomeScreen() {
  const [loading, setLoading] = useState(false);
  const { signOut } = useAuthActions();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOut();
    } catch (e) {
      console.error('Logout failed:', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-light-secondary-200">
      <View className="items-center">
        <Text className="text-3xl font-bold text-gray-900">Home</Text>
        <Text className="mt-2 text-base text-gray-500">
          You are signed in successfully.
        </Text>
      </View>

      <Pressable
        onPress={handleLogout}
        disabled={loading}
        className="mt-8 w-full max-w-xs rounded-lg bg-red-600 px-6 py-4 items-center justify-center"
      >
        {loading ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <Text className="text-base font-semibold text-white">Logout</Text>
        )}
      </Pressable>
    </View>
  );
}
