import { View, Text } from 'react-native';

interface AuthErrorProps {
  message: string | null;
}

export function AuthError({ message }: AuthErrorProps) {
  if (!message) return null;
  return (
    <View className="mb-4 rounded-lg bg-red-50 px-4 py-3">
      <Text className="text-sm text-red-600">{message}</Text>
    </View>
  );
}
