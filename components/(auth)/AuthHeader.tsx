import { View, Text } from 'react-native';

interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

export function AuthHeader({ title, subtitle }: AuthHeaderProps) {
  return (
    <View className="mb-8">
      <Text className="text-3xl font-bold text-gray-900">{title}</Text>
      <Text className="mt-2 text-base text-gray-600">{subtitle}</Text>
    </View>
  );
}
