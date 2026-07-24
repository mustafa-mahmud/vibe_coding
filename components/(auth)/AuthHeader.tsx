import { Text, View } from 'react-native';

interface AuthHeaderProps {
  title: string;
  subtitle: string;
  variant?: 'light' | 'dark';
  align?: 'left' | 'center';
}

export function AuthHeader({
  title,
  subtitle,
  variant = 'light',
  align = 'left',
}: AuthHeaderProps) {
  const isDark = variant === 'dark';
  const isCenter = align === 'center';

  return (
    <View className={`mb-8 ${isCenter ? 'items-center' : ''}`}>
      <Text
        style={{
          color: 'white',
        }}
        className={`text-[32px] font-bold`}
      >
        {title}
      </Text>
      <Text
        style={{
          color: 'white',
        }}
        className={`mt-2 text-base`}
      >
        {subtitle}
      </Text>
    </View>
  );
}
