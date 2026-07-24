import { Pressable, Text } from 'react-native';

interface AuthButtonProps {
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  label: string;
  loadingLabel: string;
  variant?: 'default' | 'gradient';
}

export function AuthButton({
  onPress,
  disabled,
  loading,
  label,
  loadingLabel,
  variant = 'default',
}: AuthButtonProps) {
  return (
    <Pressable
      className={`items-center justify-center px-4 py-4 ${
        variant === 'gradient'
          ? 'rounded-full bg-[#7C3AED] active:bg-[#6D28D9]'
          : `rounded-lg bg-blue-600 ${loading ? 'opacity-50' : 'active:bg-blue-700'}`
      }`}
      onPress={onPress}
      disabled={disabled ?? loading}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <Text
        style={{
          color: 'white',
        }}
        className="text-sm font-semibold text-white"
      >
        {loading ? loadingLabel : label}
      </Text>
    </Pressable>
  );
}
