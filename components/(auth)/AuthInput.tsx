import { View, Text, TextInput, type TextInputProps } from 'react-native';

interface AuthInputProps extends TextInputProps {
  label: string;
}

export function AuthInput({ label, ...textInputProps }: AuthInputProps) {
  return (
    <View className="mb-4">
      <Text className="mb-1.5 text-sm font-medium text-gray-700">{label}</Text>
      <TextInput
        className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-900"
        placeholderTextColor="#9CA3AF"
        accessibilityLabel={label}
        {...textInputProps}
      />
    </View>
  );
}
