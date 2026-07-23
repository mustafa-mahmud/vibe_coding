import { View, Text, Pressable } from 'react-native';

interface AuthButtonProps {
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  label: string;
  loadingLabel: string;
}

export function AuthButton({
  onPress,
  disabled,
  loading,
  label,
  loadingLabel,
}: AuthButtonProps) {
  return (
    <Pressable
      className={`items-center justify-center rounded-lg bg-blue-600 px-4 py-3.5 ${loading ? 'opacity-50' : 'active:bg-blue-700'}`}
      onPress={onPress}
      disabled={disabled ?? loading}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <Text className="text-base font-semibold text-white">
        {loading ? loadingLabel : label}
      </Text>
    </Pressable>
  );
}
